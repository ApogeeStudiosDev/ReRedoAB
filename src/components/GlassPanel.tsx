import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "navbar";
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  style,
  variant = "default",
  ...props
}) => {
  const baseClasses = "backdrop-blur-xl";
  
  const variantClasses = {
    default: `
      bg-white/[0.15] 
      rounded-2xl
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
    `,
    navbar: `
      bg-white/[0.20] 
      rounded-full
      shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
    `,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <div 
      className={combinedClasses} 
      style={{
        ...style,
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel; 