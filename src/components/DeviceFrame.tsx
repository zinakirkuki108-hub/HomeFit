import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  theme: 'dark' | 'light';
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, theme }) => {
  const [isMobileWidth, setIsMobileWidth] = useState(true);

  return (
    <div
      className={`min-h-screen w-full ${
        theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      } flex flex-col items-center justify-start transition-colors duration-200`}
    >
      {/* Desktop Responsive Toolbar (Visible on tablet/desktop md+) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-2xl px-4 py-2 border-b border-slate-800/80 text-xs text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-200">HomeFit</span>
          <span>·</span>
          <span>Mobile Fitness App</span>
        </div>

        <button
          onClick={() => setIsMobileWidth(!isMobileWidth)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
          title="Toggle view width"
        >
          {isMobileWidth ? (
            <>
              <Monitor className="w-3.5 h-3.5" />
              <span>Wide View</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone View</span>
            </>
          )}
        </button>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full min-h-screen transition-all duration-200 flex flex-col ${
          isMobileWidth ? 'max-w-md' : 'max-w-2xl'
        } ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'} shadow-2xl relative md:border-x md:border-slate-800/60`}
      >
        <div className="flex-1 w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
};
