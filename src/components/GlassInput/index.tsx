import dynamic from 'next/dynamic'

const GlassSurface = dynamic(() => import("../GlassSurface"), {
  ssr: false
})
export default function GlassInput({ type, placeholder, className }: { type?: string, placeholder?: string, className?: string }) {
  return (
    <div>
      <GlassSurface 
        width={400} 
        height={50}
        borderRadius={24}
        className="relative items-center justify-center bg-zinc-600/70"
      >
        <div className="w-full h-full">
          <input type={type} placeholder={placeholder} className={className} />
        </div>
      </GlassSurface >
    </div>
    
  );
}