import { useState, useEffect } from 'react';
import { useIsMobile, useBreakpoint } from './use-responsive';

type ImageSet = {
  mobile: string;
  tablet?: string;
  desktop: string;
};

// Hook to load the appropriate image based on device size
export function useResponsiveImage(images: ImageSet) {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const isMobile = !useBreakpoint('sm');
  const isTablet = useBreakpoint('sm') && !useBreakpoint('lg');
  const isDesktop = useBreakpoint('lg');

  useEffect(() => {
    if (isDesktop) {
      setCurrentSrc(images.desktop);
    } else if (isTablet && images.tablet) {
      setCurrentSrc(images.tablet);
    } else {
      setCurrentSrc(images.mobile);
    }
  }, [isMobile, isTablet, isDesktop, images]);

  return currentSrc;
}

// Component for responsive image
export function ResponsiveImage({
  sources,
  alt,
  className,
  ...props
}: {
  sources: ImageSet;
  alt: string;
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const imageSrc = useResponsiveImage(sources);
  
  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      className={className}
      loading="lazy" // Enable lazy loading by default
      {...props}
    />
  );
}

// Create a component that provides all responsive information to children
export function ResponsivePicture({
  sources,
  alt,
  className,
  imgClassName,
}: {
  sources: {
    mobile: string;
    tablet?: string;
    desktop: string;
    formats?: {
      webp?: {
        mobile: string;
        tablet?: string;
        desktop: string;
      };
      avif?: {
        mobile: string;
        tablet?: string;
        desktop: string;
      };
    };
  };
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <picture className={className}>
      {/* AVIF Format - Best compression, newer browsers */}
      {sources.formats?.avif && (
        <>
          <source
            srcSet={sources.formats.avif.desktop}
            media="(min-width: 1024px)"
            type="image/avif"
          />
          {sources.formats.avif.tablet && (
            <source
              srcSet={sources.formats.avif.tablet}
              media="(min-width: 640px)"
              type="image/avif"
            />
          )}
          <source
            srcSet={sources.formats.avif.mobile}
            type="image/avif"
          />
        </>
      )}
      
      {/* WebP Format - Good compression, wide support */}
      {sources.formats?.webp && (
        <>
          <source
            srcSet={sources.formats.webp.desktop}
            media="(min-width: 1024px)"
            type="image/webp"
          />
          {sources.formats.webp.tablet && (
            <source
              srcSet={sources.formats.webp.tablet}
              media="(min-width: 640px)"
              type="image/webp"
            />
          )}
          <source
            srcSet={sources.formats.webp.mobile}
            type="image/webp"
          />
        </>
      )}
      
      {/* Original Format (JPEG/PNG) - Fallback for older browsers */}
      <source
        srcSet={sources.desktop}
        media="(min-width: 1024px)"
      />
      {sources.tablet && (
        <source
          srcSet={sources.tablet}
          media="(min-width: 640px)"
        />
      )}
      <img
        src={sources.mobile}
        alt={alt}
        className={imgClassName}
        loading="lazy"
      />
    </picture>
  );
}