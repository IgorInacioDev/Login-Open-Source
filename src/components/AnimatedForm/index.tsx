'use client'

import GlassSurface from "../GlassSurface";
import AnimatedContent from '../AnimatedContent';

interface InputField {
  name: string;
  title: string;
  placeholder: string;
  type: string;
  value: string;
  error?: string;
  animationProps?: AnimationProps;
}

interface AnimationProps {
  distance?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
}

interface AnimatedFormProps {
  fields: InputField[];
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  isSubmitting?: boolean;
  animationProps?: AnimationProps;
}

export default function AnimatedForm({
  fields,
  onInputChange,
  onSubmit,
  submitText,
  isSubmitting = false,
  animationProps = {
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
  }
}: AnimatedFormProps) {

  return (
    <div>
      <AnimatedContent
        distance={animationProps.distance}
        direction={animationProps.direction}
        reverse={animationProps.reverse}
        duration={animationProps.duration}
        ease={animationProps.ease}
        initialOpacity={animationProps.initialOpacity}
        animateOpacity={animationProps.animateOpacity}
        scale={animationProps.scale}
        threshold={animationProps.threshold}
        delay={animationProps.delay}
      >
        <form onSubmit={onSubmit} className="w-full grid items-center justify-center gap-2 my-6 text-white">
          {fields.map((field, index) => (
            <AnimatedContent
              key={field.name}
              distance={field.animationProps?.distance ?? animationProps.distance}
              direction={field.animationProps?.direction ?? animationProps.direction}
              reverse={field.animationProps?.reverse ?? animationProps.reverse}
              duration={field.animationProps?.duration ?? animationProps.duration}
              ease={field.animationProps?.ease ?? animationProps.ease}
              initialOpacity={field.animationProps?.initialOpacity ?? animationProps.initialOpacity}
              animateOpacity={field.animationProps?.animateOpacity ?? animationProps.animateOpacity}
              scale={field.animationProps?.scale ?? animationProps.scale}
              threshold={field.animationProps?.threshold ?? animationProps.threshold}
              delay={field.animationProps?.delay ?? animationProps.delay}
            >
              <div className={index === 0 ? "w-[400px]" : "w-full"}>
                <p>{field.title}</p>
                <input 
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => onInputChange(field.name, e.target.value)}
                  className={`cursor-pointer w-full py-3 px-6 rounded-md text-main bg-zinc-400/10 backdrop-blur-xs ${
                    field.error ? 'border-2 border-red-500' : ''
                  }`}
                />
                {field.error && (
                  <p className="text-red-400 text-sm mt-1 px-2">{field.error}</p>
                )}
              </div>
            </AnimatedContent>
          ))}
        </form>
        <div>
          <GlassSurface
            width={400} 
            height={50}
            borderRadius={24}
            className="relative items-center justify-center bg-zinc-600/70"
          >
            <button 
              type="submit"
              disabled={isSubmitting}
              onClick={onSubmit}
              className={`w-full h-full flex items-center justify-center text-center cursor-pointer text-white font-bold ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{submitText}</span>
            </button>
          </GlassSurface>
        </div>
      </AnimatedContent>
    </div>
  );
}