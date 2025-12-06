import React, { useEffect, useRef } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './SafeIcon';

const { FiExternalLink, FiImage, FiVideo } = FiIcons;

const SocialEmbed = ({ url, html, type, title, thumbnail }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to recursively check for the Instagram script and process embeds
    const processEmbeds = () => {
      // Instagram processing
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (html) {
      // Attempt to process immediately
      processEmbeds();
      
      // Retry checks to handle async script loading or dynamic content updates
      const timeout1 = setTimeout(processEmbeds, 500);
      const timeout2 = setTimeout(processEmbeds, 1500);
      const timeout3 = setTimeout(processEmbeds, 3000);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
      };
    }
  }, [html]);

  // Helper to extract YouTube ID from various URL formats including Shorts
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 1. YouTube Player
  if (type === 'youtube' && url) {
    const videoId = getYouTubeID(url);
    if (videoId) {
      return (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg group">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
            title={title || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>
      );
    }
  }

  // 2. HTML Embed Player (Instagram, TikTok, custom iframes)
  if (html) {
    return (
      <div 
        ref={containerRef} 
        className="w-full flex justify-center bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        {/* Container for the embed code. 
            Instagram scripts look for the 'instagram-media' class inside this div 
            and replace the blockquote with an interactive iframe. */}
        <div 
          className="w-full flex justify-center items-center social-embed-container"
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
    );
  }

  // 3. Fallback / Static Preview (When only a URL is provided for non-video platforms)
  return (
    <div className="relative aspect-video bg-slate-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
      {thumbnail ? (
        <img src={thumbnail} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 dark:bg-slate-700">
          <SafeIcon icon={type === 'youtube' ? FiVideo : FiImage} className="w-12 h-12 opacity-50" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold flex items-center space-x-2 hover:bg-purple-50 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-300"
        >
          <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
          <span>View on {type}</span>
        </a>
      </div>
      
      {/* Platform Badge */}
      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-bold text-white capitalize flex items-center space-x-1 shadow-sm">
        <SafeIcon icon={type === 'youtube' ? FiVideo : FiImage} className="w-3 h-3" />
        <span>{type}</span>
      </div>
    </div>
  );
};

export default SocialEmbed;