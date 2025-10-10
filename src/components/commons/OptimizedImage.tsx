import React from 'react';
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallback?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  fallback = '/img/placeholder.svg',
  className = '',
  width,
  height,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(fallback);

  useEffect(() => {
    const img = new window.Image();
    img.src = src as string;
    img.onload = () => {
      setImgSrc(src as string);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
  }, [src]);

  return (
    <div 
      className={`relative ${loading ? 'animate-pulse bg-gray-200 dark:bg-gray-700' : ''}`}
      style={{ width, height }}
    >
      <Image
        src={error ? fallback : imgSrc}
        alt={alt}
        width={width as number}
        height={height as number}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        {...props}
      />
    </div>
  );
};
