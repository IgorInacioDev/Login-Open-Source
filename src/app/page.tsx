'use client'

import { useState } from 'react';
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { MdCircle } from "react-icons/md";

export default function Home() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {isRegisterMode ? <RegisterForm /> : <LoginForm />}
        <div className="text-white text-center flex items-center justify-center mt-4">
          <span 
            className="cursor-pointer hover:text-zinc-300 transition-colors"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
          >
            {isRegisterMode ? 'Fazer Login' : 'Criar Conta'}
          </span> 
          <MdCircle size={12} className="mx-2"/> 
          <span className="cursor-pointer hover:text-zinc-300 transition-colors">Esqueci a Senha</span>
        </div>
      </div>
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <iframe 
          width="200%" 
          height="200%" 
          src="https://www.youtube.com/embed/MuNyfqxAO6Y?si=RaDkwG6JcVxjHrHa&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;mute=1&amp;start=35&amp;disablekb=1&amp;loop=1&amp;playlist=MuNyfqxAO6Y&amp;modestbranding=1&amp;iv_load_policy=3&amp;cc_load_policy=0&amp;fs=0" 
          title="Background video" 
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '150%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto'
          }}
        ></iframe>
      </div>
    </div>
  );
}
