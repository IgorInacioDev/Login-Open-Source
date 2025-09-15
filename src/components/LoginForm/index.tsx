'use client'

import { useState } from 'react';
import TextPressure from "../TextPressure";
import { LoginFormData } from '@/lib/validations/auth';
import AnimatedContent from '../AnimatedContent';
import AnimatedForm from '../AnimatedForm';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    const field = name as keyof LoginFormData;
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const baseAnimationProps = {
    distance: 150,
    direction: 'horizontal' as const,
    reverse: false,
    ease: 'power3.out',
    initialOpacity: 0,
    animateOpacity: true,
    scale: 1.5,
    threshold: 0.2
  };

  const fields = [
    {
      name: 'email',
      title: 'Email',
      placeholder: 'example@example.com',
      type: 'email',
      value: formData.email,
      error: errors.email,
      animationProps: {
        ...baseAnimationProps,
        duration: 0.5,
        delay: 0.2
      }
    },
    {
      name: 'password',
      title: 'Senha',
      placeholder: 'Senha',
      type: 'password',
      value: formData.password,
      error: errors.password,
      animationProps: {
        ...baseAnimationProps,
        duration: 1,
        delay: 0.6
      }
    }
  ];

  async function handleSubmit(formData: LoginFormData) {
    setIsSubmitting(true);
    
    try {
      const {  } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password
      }, {
        onSuccess: (res) => {
          console.log(res);
          router.replace('/dashboard');
        },
        onError: (error) => {
          console.error('Erro no login:', error);
          setErrors({ email: 'Credenciais inválidas' });
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ email: 'Erro ao fazer login' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
      <div>
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
          <TextPressure
            text="Future!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={42}
          />
        </AnimatedContent>

        <AnimatedForm
          fields={fields}
          onInputChange={handleInputChange}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
          submitText={isSubmitting ? 'Entrando...' : 'Entrar'}
          isSubmitting={isSubmitting}
          animationProps={{
            distance: 150,
            direction: 'horizontal',
            reverse: false,
            duration: 1.2,
            ease: 'power3.out',
            initialOpacity: 0,
            animateOpacity: true,
            scale: 1.5,
            threshold: 0.2,
            delay: 0.5
          }}
        />
         
      </div>
  );
}