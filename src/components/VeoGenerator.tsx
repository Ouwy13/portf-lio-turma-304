import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Film, Loader2, Play, AlertCircle, CheckCircle2, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Estendendo a interface Window para incluir as funções do AI Studio
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function VeoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assumimos sucesso conforme diretrizes
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVideoUrl(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!image) return;
    
    setIsGenerating(true);
    setError(null);
    setStatus('Iniciando geração com Veo...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Animate this image with cinematic camera movement and subtle life-like motion',
        image: {
          imageBytes: base64Data,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling
      let attempts = 0;
      const maxAttempts = 60; // 10 minutos aprox (10s cada)
      
      while (!operation.done && attempts < maxAttempts) {
        setStatus(`Processando vídeo... (${attempts * 10}s)`);
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        attempts++;
      }

      if (operation.done && operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        
        // Buscar o vídeo com a chave da API
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY || '',
          },
        });

        if (!response.ok) throw new Error('Falha ao baixar o vídeo gerado');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('Vídeo gerado com sucesso!');
      } else {
        throw new Error('A geração demorou demais ou falhou.');
      }
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("Chave de API expirada ou inválida. Por favor, selecione novamente.");
      } else {
        setError(err.message || 'Ocorreu um erro na geração do vídeo.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] uppercase tracking-widest text-purple-400 mb-4 border border-purple-500/20">
            <Film className="w-3 h-3" />
            <span>Novo: IA Video Generation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-gradient">
            Anime suas Fotos com Veo
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light">
            Transforme imagens estáticas em vídeos cinematográficos usando a tecnologia mais avançada do Google DeepMind.
          </p>
        </motion.div>

        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-3xl bg-black/40">
          {!hasKey ? (
            <div className="text-center py-12">
              <Key className="w-12 h-12 text-purple-500 mx-auto mb-6 opacity-50" />
              <h3 className="text-xl font-medium mb-4">Chave de API Necessária</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Para usar a geração de vídeo Veo, você precisa selecionar uma chave de API de um projeto Google Cloud com faturamento ativado.
              </p>
              <button
                onClick={handleOpenKeySelector}
                className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Selecionar Chave de API
              </button>
              <p className="mt-4 text-xs text-gray-500">
                Consulte <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">ai.google.dev/gemini-api/docs/billing</a> para mais informações.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Upload Area */}
              <div className="space-y-6">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-dashed border-white/20 flex items-center justify-center group cursor-pointer">
                  {image ? (
                    <img src={image} className="w-full h-full object-cover" alt="Upload preview" />
                  ) : (
                    <div className="text-center p-8">
                      <Upload className="w-10 h-10 text-gray-500 mx-auto mb-4 group-hover:text-purple-400 transition-colors" />
                      <p className="text-sm text-gray-400">Clique para subir uma foto</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                <button
                  onClick={generateVideo}
                  disabled={!image || isGenerating}
                  className={`w-full py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition-all ${
                    !image || isGenerating
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Gerando...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Gerar Vídeo</span>
                    </>
                  )}
                </button>
              </div>

              {/* Result Area */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 bg-black/60 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {videoUrl ? (
                    <motion.video
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={videoUrl}
                      controls
                      autoPlay
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8"
                    >
                      <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-6" />
                      <p className="text-purple-300 font-medium mb-2">{status}</p>
                      <p className="text-xs text-gray-500">Isso pode levar alguns minutos. Por favor, aguarde.</p>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center p-8 text-red-400"
                    >
                      <AlertCircle className="w-10 h-10 mx-auto mb-4" />
                      <p className="text-sm">{error}</p>
                    </motion.div>
                  ) : (
                    <div className="text-center p-8 text-gray-500">
                      <Film className="w-10 h-10 mx-auto mb-4 opacity-20" />
                      <p className="text-sm">O vídeo gerado aparecerá aqui</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
