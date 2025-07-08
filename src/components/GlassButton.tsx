import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
  gradient?: boolean;
  shadow?: boolean;
  border?: boolean;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  style,
  variant = "secondary",
  gradient = true,
  shadow = true,
  border = true,
  ...props
}) => {
  const baseClasses = `
    px-6 py-1 h-[23px] rounded-full 
    font-urbanist font-semibold text-[10px] 
    transition-all duration-300 
    focus:outline-none
    backdrop-blur-lg
    hover:scale-[1.02]
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-glassGreen/80 text-white 
      hover:bg-glassGreen/90
      ${gradient ? "bg-glass-button-gradient" : ""}
      ${shadow ? "shadow-glass-button" : ""}
      ${border ? "border border-white/30" : ""}
    `,
    secondary: `
      bg-white/[0.15] text-black 
      hover:bg-white/[0.25]
      ${gradient ? "bg-glass-button-gradient" : ""}
      ${shadow ? "shadow-glass-button" : ""}
      ${border ? "border border-white/[0.25]" : ""}
    `,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      style={{
        ...style,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton; 