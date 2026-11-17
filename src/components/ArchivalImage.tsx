import { useEffect, useState } from 'react';
import type { EnrichedArtifact } from '../types/artifact';

interface ArchivalImageProps {
  artifact: EnrichedArtifact;
  className?: string;
  aspectClass?: string;
  variant?: 'card' | 'detail';
}

function getMotifSvg(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes('khảo cổ') || normalized.includes('đúc đồng')) {
    // Bronze drum / concentric star motif
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-20 h-20 text-[#B6823E]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="48" opacity="0.35" />
        <circle cx="60" cy="60" r="36" opacity="0.55" />
        <circle cx="60" cy="60" r="22" opacity="0.8" />
        <polygon
          points="60,42 64,54 76,50 67,59 77,67 65,67 67,79 60,69 53,79 55,67 43,67 53,59 44,50 56,54"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (normalized.includes('tượng') || normalized.includes('điêu khắc')) {
    // Lotus pedestal / sculptural arch motif
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-20 h-20 text-[#B6823E]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M60 20 C44 36 40 54 60 70 C80 54 76 36 60 20 Z" />
        <path d="M42 42 C28 50 28 66 48 74" opacity="0.65" />
        <path d="M78 42 C92 50 92 66 72 74" opacity="0.65" />
        <path d="M28 82 H92" opacity="0.7" />
        <path d="M36 90 H84" opacity="0.45" />
        <circle cx="60" cy="46" r="8" opacity="0.7" />
      </svg>
    );
  }
  if (normalized.includes('gốm')) {
    // Ceramic vase silhouette
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-20 h-20 text-[#B6823E]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M48 22 H72 L68 34 C82 44 86 66 76 92 H44 C34 66 38 44 52 34 Z" />
        <path d="M44 58 C54 52 66 64 76 58" opacity="0.65" />
        <path d="M45 72 C55 66 65 78 75 72" opacity="0.45" />
      </svg>
    );
  }
  // Stele / documentary woodblock motif
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-20 h-20 text-[#B6823E]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path d="M34 94 V38 C34 26 44 20 60 20 C76 20 86 26 86 38 V94 Z" />
      <line x1="46" y1="42" x2="74" y2="42" opacity="0.7" />
      <line x1="46" y1="54" x2="74" y2="54" opacity="0.7" />
      <line x1="46" y1="66" x2="74" y2="66" opacity="0.7" />
      <line x1="46" y1="78" x2="66" y2="78" opacity="0.5" />
      <line x1="26" y1="94" x2="94" y2="94" />
    </svg>
  );
}

export function ArchivalImage({
  artifact,
  className = '',
  aspectClass = 'aspect-[4/3]',
  variant = 'card',
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);
  const imgSrc = artifact.ảnh_hiển_thị || artifact.tệp_đính_kèm;

  useEffect(() => {
    setHasError(false);
  }, [imgSrc]);

  return (
    <div
      className={`relative overflow-hidden ${
        hasError ? 'bg-[#0F1E36]' : 'bg-[#EFECE4]'
      } ${aspectClass} ${className}`}
    >
      {!hasError && (
        <img
          src={imgSrc}
          alt={artifact.nhan_đề}
          referrerPolicy="no-referrer"
          loading={variant === 'card' ? 'lazy' : 'eager'}
          onError={() => setHasError(true)}
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}

      {hasError && (
        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-[#0F1E36] via-[#152847] to-[#0A1426] p-5 text-[#FBF9F5]">
          <div className="flex items-center justify-between border-b border-white/15 pb-3 text-[11px] font-mono tracking-wider text-[#E7D5B8]">
            <span className="tabular-nums">{artifact.mã_định_danh}</span>
            <span className="tabular-nums">{artifact.số_đăng_ký}</span>
          </div>

          <div className="my-auto flex flex-col items-center justify-center py-3 text-center">
            {getMotifSvg(artifact.loại)}
            <p className="mt-2 font-serif text-base font-medium tracking-wide text-[#FBF9F5]/90 line-clamp-2 max-w-[240px]">
              {artifact.tên_rút_gọn}
            </p>
            <p className="mt-1 text-[11px] text-[#CBD5E1]/80">
              {artifact.thời_kỳ} · {artifact.loại}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 pt-2.5 text-[11px] text-[#CBD5E1]/85">
            <span className="font-mono truncate max-w-[65%]" title={artifact.tệp_đính_kèm}>
              {artifact.tệp_đính_kèm}
            </span>
            <span className="shrink-0 text-[#E7D5B8]">Tư liệu ảnh lưu trữ</span>
          </div>
        </div>
      )}
    </div>
  );
}
