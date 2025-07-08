import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { PLPColors } from '../constants/colors';

export function SplashScreen({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Delay before hiding splash screen
          setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
              onLoadingComplete();
            }
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center splash-screen">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: PLPColors.gradients.hero
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl animate-ping delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Logo container */}
        <div className="mb-8 animate-fade-in">
          <div className="relative inline-block">
            {/* Main PLP logo */}
            <div className="w-32 h-32 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
              <img 
                src="/assets/images/logos/PLP LOGO - HAND RAYS GOLD.png" 
                alt="Progressive Liberal Party Hand Rays Logo" 
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Animated ring */}
            <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-white/30 rounded-full animate-spin-slow"></div>
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-2 animate-slide-up delay-300">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Progressive Liberal Party
          </h1>
          <p className="text-xl text-white/90 font-medium">
            The Bahamas
          </p>
          <p className="text-lg text-white/75">
            Admin Control Panel
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-12 space-y-4 animate-fade-in delay-500">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 size={20} className="text-white/80 animate-spin" />
            <span className="text-white/80 text-sm font-medium">
              Loading your dashboard...
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-white/20 rounded-full h-1 backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-1 rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-white/60 text-xs mt-2">
              {Math.round(loadingProgress)}% Complete
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 animate-fade-in delay-700">
          <p className="text-white/50 text-xs">
            Secure Administrative Portal
          </p>
        </div>
      </div>
    </div>
  );
}

// CSS animations (to be added to index.css)
export const splashScreenStyles = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.splash-screen {
  animation: splash-fade-out 0.5s ease-out 3s forwards;
}

@keyframes splash-fade-out {
  to { opacity: 0; visibility: hidden; }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-700 {
  animation-delay: 0.7s;
}

.delay-1000 {
  animation-delay: 1s;
}
`;