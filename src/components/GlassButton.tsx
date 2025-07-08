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
  const base =
    "px-6 py-1 h-[23px] rounded-pill font-urbanist font-semibold text-[10px] transition-all duration-200 focus:outline-none" +
    (gradient ? " bg-gradient-to-b from-white/20 to-glassGreen/30" : "") +
    (shadow ? " shadow-glass" : "") +
    (border ? " border border-white/20" : "");
  const variants = {
    primary:
      "bg-glassGreen text-white hover:bg-glassGreen/80",
    secondary:
      "bg-white/10 text-black backdrop-blur-sm hover:bg-white/20",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton; 