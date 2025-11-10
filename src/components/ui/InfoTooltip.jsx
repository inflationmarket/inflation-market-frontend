import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function InfoTooltip({ content, title }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors ml-1"
        aria-label="More information"
      >
        <HelpCircle className="w-3 h-3" />
      </button>

      {show && (
        <div className="absolute z-50 w-72 p-4 bg-gray-900 border border-blue-500/30 rounded-lg shadow-xl left-1/2 -translate-x-1/2 bottom-full mb-2">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 border-r border-b border-blue-500/30 rotate-45" />
          {title && (
            <div className="text-sm font-semibold text-blue-300 mb-2">{title}</div>
          )}
          <div className="text-xs text-gray-300 leading-relaxed">{content}</div>
        </div>
      )}
    </div>
  );
}
