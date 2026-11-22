
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VideosRecentes() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const historico = JSON.parse(
        localStorage.getItem("videos_recentes") || "[]"
      );
      setVideos(Array.isArray(historico) ? historico : []);
    } catch {
      setVideos([]);
    }
  }, []);

  const abrirVideo = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF6FF] p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/canais")}
          className="text-pink-600 font-semibold hover:underline mb-6"
        >
          ← Voltar para Canais
        </button>

        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Vídeos recentes
        </h1>

        <p className="text-gray-600 mb-8">
          Aqui estão os últimos cinco vídeos que você acessou.
        </p>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
              const thumbnail =
                video._thumbRaw ||
                video.thumbnail ||
                video.thumbnailPath ||
                video.thumbnailUrl ||
                video.thumb;

              const imagem = !thumbnail
                ? null
                : thumbnail.startsWith("http") ||
                  thumbnail.startsWith("data:")
                  ? thumbnail
                  : `http://localhost:8080/${thumbnail.replace(/^\/+/, "")}`;

              return (
                <article
                  key={video.id}
                  className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden"
                >
                  {imagem ? (
                    <img
                      src={imagem}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-pink-50 flex items-center justify-center text-gray-400">
                      Prévia do vídeo
                    </div>
                  )}

                  <div className="p-5">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">
                      {video.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {video.desc}
                    </p>

                    <button
                      onClick={() => abrirVideo(video.url)}
                      className="bg-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-pink-600 transition-all"
                    >
                      Assistir novamente
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow border border-pink-100">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum vídeo recente
            </h2>

            <p className="text-gray-500 mb-5">
              Quando você assistir a algum vídeo, ele aparecerá aqui.
            </p>

            <button
              onClick={() => navigate("/canais")}
              className="bg-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-pink-600"
            >
              Explorar canais
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
