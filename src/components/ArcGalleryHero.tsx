import { useEffect, useState } from 'react';

type GameItem = {
  icon: string;
  title: string;
  url: string;
};

type ArcGalleryHeroProps = {
  games: GameItem[];
  title?: string;
  subtitle?: string;
  logoText?: string;
  logoImage?: string;
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
};

const ArcGalleryHero = ({
  games,
  title = '',
  subtitle = '',
  logoText = '',
  logoImage = '',
  startAngle = -110,
  endAngle = 110,
  radiusLg = 340,
  radiusMd = 280,
  radiusSm = 200,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = '',
}: ArcGalleryHeroProps) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let desiredRadius: number;
      let cardSize: number;

      if (width < 640) {
        desiredRadius = radiusSm;
        cardSize = cardSizeSm;
        setIsMobile(true);
      } else if (width < 1024) {
        desiredRadius = radiusMd;
        cardSize = cardSizeMd;
        setIsMobile(false);
      } else {
        desiredRadius = radiusLg;
        cardSize = cardSizeLg;
        setIsMobile(false);
      }

      const maxCos = Math.max(
        Math.abs(Math.cos((startAngle * Math.PI) / 180)),
        Math.abs(Math.cos((endAngle * Math.PI) / 180))
      );
      const maxFit = (width / 2 - cardSize / 2 - 12) / Math.max(maxCos, 0.01);
      const radius = Math.min(desiredRadius, maxFit);

      setDimensions({ radius, cardSize });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm, startAngle, endAngle]);

  const filledGames = games.filter((g) => g.icon);
  const count = Math.max(games.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  const renderMobile = () => (
    <section className={`relative overflow-hidden min-h-screen flex flex-col items-center ${className}`}>
      <div className="absolute inset-0 static-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {(logoImage || logoText) && (
        <div className="relative z-20 flex flex-col items-center pt-10 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {logoImage && (
            <img src={logoImage} alt={logoText} className="relative h-16 w-auto animate-shadow-drift" draggable={false} />
          )}
          {logoText && (
            <span className="relative mt-3 text-2xl font-bold tracking-tight text-white animate-shadow-drift-text">
              {logoText}
            </span>
          )}
        </div>
      )}

      <div className="relative z-20 flex-1 flex flex-wrap items-center justify-center gap-5 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        {filledGames.map((game, i) => {
          const size = Math.round(cardSizeSm * 1.5);
          const hasLink = game.url && game.url !== '#' && game.url !== '';
          const Wrapper = hasLink ? 'a' : 'div';
          const wrapperProps = hasLink
            ? { href: game.url, target: '_blank' as const, rel: 'noopener noreferrer', title: game.title }
            : {};

          return (
            <Wrapper key={i} {...wrapperProps} className={`group ${hasLink ? 'cursor-pointer' : ''}`}>
              <div
                className={`rounded-[22%] shadow-xl overflow-hidden ring-1 ring-white/20 transition-all duration-300 ${hasLink ? 'active:scale-95' : ''}`}
                style={{ width: size, height: size }}
              >
                <img src={game.icon} alt={game.title} className="block w-full h-full object-cover" draggable={false} />
              </div>
              {game.title && (
                <div className="mt-2 text-center text-xs text-white/70 font-medium">{game.title}</div>
              )}
            </Wrapper>
          );
        })}
      </div>

      <div className="relative z-10 text-center max-w-sm px-6 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <h1 className="text-3xl font-bold tracking-tight text-white animate-shadow-drift-text">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-lg text-white/70">{subtitle}</p>}
      </div>
    </section>
  );

  const renderDesktop = () => (
    <section className={`relative overflow-hidden min-h-screen flex flex-col ${className}`}>
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {(logoImage || logoText) && (
        <div className="relative z-20 flex flex-col items-center pt-4 sm:pt-5 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {logoImage && (
            <div className="relative">
              <img src={logoImage} alt={logoText} className="relative h-16 sm:h-20 w-auto animate-shadow-drift" draggable={false} />
            </div>
          )}
          {logoText && (
            <span className="relative mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white animate-shadow-drift-text">
              {logoText}
            </span>
          )}
        </div>
      )}

      <div
        className="relative mx-auto"
        style={{ width: '100%', height: dimensions.radius * 1.2 }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {filledGames.map((game, i) => {
            const filledCount = Math.max(filledGames.length, 1);
            const angle = filledCount === 1
              ? (startAngle + endAngle) / 2
              : startAngle + ((endAngle - startAngle) / (filledCount - 1)) * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            const hasLink = game.url && game.url !== '#' && game.url !== '';
            const Wrapper = hasLink ? 'a' : 'div';
            const wrapperProps = hasLink
              ? { href: game.url, target: '_blank' as const, rel: 'noopener noreferrer', title: game.title }
              : {};

            return (
              <Wrapper
                key={i}
                {...wrapperProps}
                className={`absolute opacity-0 animate-fade-in-up group ${hasLink ? 'cursor-pointer' : 'cursor-default'}`}
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: filledCount - i,
                }}
              >
                <div
                  className={`rounded-[22%] shadow-xl overflow-hidden ring-1 ring-white/20 bg-black/30 backdrop-blur-sm transition-all duration-300 w-full h-full ${hasLink ? 'hover:scale-110 hover:shadow-2xl hover:ring-white/50' : ''}`}
                >
                  <img src={game.icon} alt={game.title} className="block w-full h-full object-cover" draggable={false} />
                </div>
                {game.title && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-white/80 font-medium pointer-events-none">
                    {game.title}
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div className="text-center max-w-2xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-shadow-drift-text">
            {title}
          </h1>
          {subtitle && <p className="mt-4 text-lg text-white/70">{subtitle}</p>}
        </div>
      </div>
    </section>
  );

  return isMobile ? renderMobile() : renderDesktop();
};

export default ArcGalleryHero;