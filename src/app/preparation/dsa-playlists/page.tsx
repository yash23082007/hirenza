"use client";

import { dsaPlaylists } from "@/data";
import { Play, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

function PlaylistsContent() {
  const searchParams = useSearchParams();
  const playlistParam = searchParams.get("playlist");

  const filteredPlaylists = useMemo(() => {
    if (!playlistParam) return dsaPlaylists;
    const match = dsaPlaylists.filter(p => 
      p.id.toLowerCase().includes(playlistParam.toLowerCase()) || 
      p.title.toLowerCase().includes(playlistParam.toLowerCase()) ||
      (p.author && p.author.toLowerCase().includes(playlistParam.toLowerCase()))
    );
    return match.length > 0 ? match : dsaPlaylists;
  }, [playlistParam]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">DSA Video Playlists</h1>
        <p className="text-secondary">Comprehensive, free video courses from top educators to master algorithms with visual intuition.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map(playlist => (
          <a 
            key={playlist.id} 
            href={playlist.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group card overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-1"
          >
            <div>
              {/* Graphical Playlist Cover Art */}
              <div className={`aspect-video rounded-xl bg-gradient-to-br ${playlist.gradient || "from-purple-900 to-indigo-950"} p-5 flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/10">
                    {playlist.tag || "Course"}
                  </span>
                  <span className="text-[11px] font-bold bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md text-white/90">
                    {playlist.videos} Lectures
                  </span>
                </div>

                <div className="z-10">
                  <span className="text-xs text-white/80 font-medium block mb-0.5">{playlist.author}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug drop-shadow-sm">
                    {playlist.title}
                  </h3>
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {playlist.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 flex items-center justify-between border-t border-border-soft mt-2 text-xs">
              <span className="text-muted flex items-center gap-1 font-medium">
                <Play size={14} className="text-red-500" /> Watch Playlist
              </span>
              <span className="text-purple-1 font-bold group-hover:underline inline-flex items-center gap-1">
                Open Course <ExternalLink size={11} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function PlaylistsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-muted">Loading DSA Playlists...</div>}>
      <PlaylistsContent />
    </Suspense>
  );
}
