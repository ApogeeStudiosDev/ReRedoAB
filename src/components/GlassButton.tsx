import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary";
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className = "",
  style,
  variant = "secondary",
  ...props
}) => {
  const baseClasses = `
    px-6 py-1 h-[23px] rounded-full 
    font-urbanist font-semibold text-[10px] 
    transition-all duration-300 
    focus:outline-none
    hover:scale-[1.02]
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-glassGreen text-white 
      hover:bg-glassGreen/90
      shadow-[0_4px_16px_0_rgba(0,0,0,0.25)]
    `,
    secondary: `
      bg-white/[0.20] text-black 
      hover:bg-white/[0.30]
      shadow-[0_4px_16px_0_rgba(0,0,0,0.15)]
    `,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button
      className={combinedClasses}
      style={{
        ...style,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: variant === 'secondary' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton; 