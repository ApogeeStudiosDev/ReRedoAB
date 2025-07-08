import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "navbar";
  gradient?: boolean;
  shadow?: boolean;
  border?: boolean;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  style,
  variant = "default",
  gradient = true,
  shadow = true,
  border = true,
  ...props
}) => {
  const baseClasses = "backdrop-blur-xl";
  
  const variantClasses = {
    default: `
      bg-white/[0.08] 
      ${gradient ? "bg-glass-gradient" : ""}
      ${shadow ? "shadow-glass" : ""}
      ${border ? "border border-white/[0.18]" : ""}
      rounded-glass
    `,
    navbar: `
      bg-white/[0.12] 
      ${gradient ? "bg-glass-navbar-gradient" : ""}
      ${shadow ? "shadow-glass-navbar" : ""}
      ${border ? "border border-white/[0.25]" : ""}
      rounded-full
    `,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <div 
      className={combinedClasses} 
      style={{
        ...style,
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
      }} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel; 