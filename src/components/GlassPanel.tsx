import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  gradient?: boolean;
  shadow?: boolean;
  border?: boolean;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  style,
  gradient = true,
  shadow = true,
  border = true,
  ...props
}) => {
  const base =
    "backdrop-blur-xl bg-white/10 rounded-glass" +
    (gradient ? " bg-gradient-to-b from-white/30 to-[#6E6E6E]/30" : "") +
    (shadow ? " shadow-glass" : "") +
    (border ? " border border-white/30" : "");
  return (
    <div className={`${base} ${className}`} style={style} {...props}>
      {children}
    </div>
  );
};

export default GlassPanel; 