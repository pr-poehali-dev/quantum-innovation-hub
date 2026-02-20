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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  const count = Math.max(games.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section className={`relative overflow-hidden min-h-screen flex flex-col ${className}`}>
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {(logoImage || logoText) && (
        <div className="relative z-20 flex flex-col items-center pt-8 sm:pt-10 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
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
        style={{
          width: '100%',
          height: dimensions.radius * 1.2,
        }}
      >
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {games.map((game, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            return (
              <a
                key={i}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute opacity-0 animate-fade-in-up group"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'forwards',
                  zIndex: count - i,
                }}
                title={game.title}
              >
                <div
                  className="rounded-[22%] shadow-xl overflow-hidden ring-1 ring-white/20 bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:ring-white/50 hover:bg-black/40 w-full h-full cursor-pointer"
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-white/80 font-medium pointer-events-none">
                  {game.title}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div className="text-center max-w-2xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-shadow-drift-text">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-white/70">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArcGalleryHero;