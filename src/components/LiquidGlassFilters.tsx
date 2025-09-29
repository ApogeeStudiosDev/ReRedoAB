const LiquidGlassFilters = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        {/* Main Liquid Glass Filter */}
        <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.1"
            numOctaves="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="8" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Light Glass Filter */}
        <filter id="liquid-glass-light" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.08"
            numOctaves="2"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="6" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Medium Glass Filter */}
        <filter id="liquid-glass-medium" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.09"
            numOctaves="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="7" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Strong Glass Filter */}
        <filter id="liquid-glass-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.12"
            numOctaves="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="10" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Heavy Glass Filter */}
        <filter id="liquid-glass-heavy" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03 0.15"
            numOctaves="5"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="12" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Hover Glass Filter */}
        <filter id="liquid-glass-hover" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.2"
            numOctaves="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="15" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Liquid Distortion for refraction effects */}
        <filter id="liquid-distortion" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05 0.1"
            numOctaves="2"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="5" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilters;