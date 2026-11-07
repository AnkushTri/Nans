"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlaceholderImage } from "./PlaceholderImage";

type PhotoProps = { n: number; className?: string };

/** Shows public/nans/<n>.jpg, or a placeholder until that file exists. */
export function Photo({ n, className = "" }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <PlaceholderImage label={`IMAGE — public/nans/${n}.jpg`} className={className} />;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        ref={ref}
        src={`/nans/${n}.jpg`}
        alt={`Nans, photo ${n}`}
        fill
        sizes="(min-width: 768px) 44vw, 90vw"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
