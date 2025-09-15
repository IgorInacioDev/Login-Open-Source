'use client'

import { useState } from 'react';
import TextPressure from "../TextPressure";
import { RegisterFormData } from '@/lib/validations/auth';
import AnimatedContent from '../AnimatedContent';
import AnimatedForm from '../AnimatedForm';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    const field = name as keyof RegisterFormData;
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
      name: 'name',
      title: 'Nome',
      placeholder: 'Nome completo',
      type: 'text',
      value: formData.name,
      error: errors.name,
      animationProps: {
        ...baseAnimationProps,
        duration: 0.5,
        delay: 0.2
      }
    },
    {
      name: 'email',
      title: 'Email',
      placeholder: 'example@example.com',
      type: 'email',
      value: formData.email,
      error: errors.email,
      animationProps: {
        ...baseAnimationProps,
        duration: 1.0,
        delay: 0.6
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
        duration: 1.5,
        delay: 1
      }
    },
    {
      name: 'confirmPassword',
      title: 'Confirmar Senha',
      placeholder: 'Confirmar senha',
      type: 'password',
      value: formData.confirmPassword,
      error: errors.confirmPassword,
      animationProps: {
        ...baseAnimationProps,
        duration: 2,
        delay: 1.4
      }
    }
  ];

  async function handleSubmit(formData: RegisterFormData) {
    setIsSubmitting(true);
    
    try {
      const {  } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: '/dashboard'
      }, {
        onSuccess: (res) => {
          console.log(res);
          router.push('/dashboard');
        },
        onError: (error) => {
          console.error('Registration error:', error);
          setErrors({ email: 'Erro ao criar conta. Tente novamente.' });
        }
      })
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
          submitText={isSubmitting ? 'Registrando...' : 'Criar Conta'}
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