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
  cardSizeLg = 120,
  cardSizeSm = 80,
  className = '',
}: ArcGalleryHeroProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filledGames = games.filter((g) => g.icon);
  const iconSize = isMobile ? Math.round(cardSizeSm * 1.5) : Math.round(cardSizeLg * 1.5);

  return (
    <section className={`relative overflow-hidden min-h-screen flex flex-col items-center ${className}`}>
      <div className={`absolute inset-0 ${isMobile ? 'static-gradient-blur' : 'animated-gradient'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {(logoImage || logoText) && (
        <div className="relative z-20 flex flex-col items-center pt-10 sm:pt-12 opacity-0 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          {logoImage && (
            <img src={logoImage} alt={logoText} className="relative h-16 sm:h-20 w-auto animate-shadow-drift" draggable={false} />
          )}
          {logoText && (
            <span className="relative mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white animate-shadow-drift-text">
              {logoText}
            </span>
          )}
        </div>
      )}

      <div className="relative z-20 flex-1 flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        {filledGames.map((game, i) => {
          const hasLink = game.url && game.url !== '#' && game.url !== '';
          const Wrapper = hasLink ? 'a' : 'div';
          const wrapperProps = hasLink
            ? { href: game.url, target: '_blank' as const, rel: 'noopener noreferrer', title: game.title }
            : {};

          return (
            <Wrapper key={i} {...wrapperProps} className={`group ${hasLink ? 'cursor-pointer' : ''}`}>
              <div
                className={`rounded-[22%] shadow-xl overflow-hidden ring-1 ring-white/20 transition-all duration-300 ${hasLink ? 'hover:scale-110 hover:shadow-2xl hover:ring-white/50 active:scale-95' : ''}`}
                style={{ width: iconSize, height: iconSize }}
              >
                <img src={game.icon} alt={game.title} className="block w-full h-full object-cover" draggable={false} />
              </div>
              {game.title && (
                <div className="mt-2 text-center text-sm text-white/70 font-medium sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                  {game.title}
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6 pb-16 sm:pb-20 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white animate-shadow-drift-text">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-lg text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
};

export default ArcGalleryHero;
