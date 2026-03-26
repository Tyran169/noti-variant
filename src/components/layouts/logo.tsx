/** biome-ignore-all lint/performance/noImgElement: already preload the whole image */

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className, width, height }: LogoProps) {
  return (
    <img
      src="/logos/logo.webp"
      alt="Logo"
      className={className}
      width={width}
      height={height}
      fetchPriority="high"
      loading="eager"
    />
  );
}
