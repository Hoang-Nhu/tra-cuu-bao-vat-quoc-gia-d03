import { ArrowLeft, ChevronLeft, ChevronRight, MessageSquareText } from 'lucide-react';
import { ARTIFACTS, get23DetailFields } from '../data/artifacts';
import { ArchivalImage } from './ArchivalImage';

interface DetailViewProps {
  artifactId: string;
  onSelectArtifact: (id: string) => void;
  onBackToCatalog: () => void;
  onAskAiAboutArtifact: (artifactTitle: string, artifactId: string) => void;
}

export function DetailView({
  artifactId,
  onSelectArtifact,
  onBackToCatalog,
  onAskAiAboutArtifact,
}: DetailViewProps) {
  const currentIndex = Math.max(
    0,
    ARTIFACTS.findIndex((item) => item.mã_định_danh === artifactId)
  );
  const artifact = ARTIFACTS[currentIndex] || ARTIFACTS[0];
  const fields23 = get23DetailFields(artifact);

  const prevArtifact =
    ARTIFACTS[(currentIndex - 1 + ARTIFACTS.length) % ARTIFACTS.length];
  const nextArtifact = ARTIFACTS[(currentIndex + 1) % ARTIFACTS.length];

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Top Operational Toolbar */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-5 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 self-start rounded-md border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-medium text-[#0F1E36] transition-colors hover:border-[#0F1E36]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Quay lại danh sách</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="artifact-switcher" className="sr-only">
            Chọn bảo vật để xem hồ sơ
          </label>
          <select
            id="artifact-switcher"
            value={artifact.mã_định_danh}
            onChange={(e) => onSelectArtifact(e.target.value)}
            className="h-10 max-w-[260px] cursor-pointer rounded-md border border-[#E5E0D8] bg-white px-3 text-xs font-medium text-[#0F1E36] focus:border-[#0F1E36] focus:outline-none sm:max-w-[320px]"
          >
            {ARTIFACTS.map((item) => (
              <option key={item.mã_định_danh} value={item.mã_định_danh}>
                {item.mã_định_danh} — {item.tên_rút_gọn}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelectArtifact(prevArtifact.mã_định_danh)}
              aria-label={`Xem bảo vật trước: ${prevArtifact.nhan_đề}`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#0F1E36] transition-colors hover:bg-[#F4EFE6]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onSelectArtifact(nextArtifact.mã_định_danh)}
              aria-label={`Xem bảo vật tiếp theo: ${nextArtifact.nhan_đề}`}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#0F1E36] transition-colors hover:bg-[#F4EFE6]"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Museum Accession Detail Layout */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Visual Plate + Mandatory Caption & Official Source Attribution */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 space-y-5">
            <figure className="overflow-hidden rounded-md border border-[#E5E0D8] bg-white p-3">
              <ArchivalImage
                artifact={artifact}
                aspectClass="aspect-[4/3]"
                variant="detail"
                className="rounded-sm"
              />
              <figcaption className="mt-3.5 border-t border-[#E5E0D8] pt-3 text-xs leading-relaxed text-[#57534E]">
                <p className="font-serif text-sm italic text-[#1C1917]">
                  Hình tư liệu {artifact.mã_định_danh}: {artifact.nhan_đề} ({artifact.niên_đại}).
                </p>
                <p className="mt-1.5">
                  <strong className="font-semibold text-[#0F1E36]">Đường dẫn tệp:</strong>{' '}
                  <span className="font-mono text-[11px]">{artifact.tệp_đính_kèm}</span>
                </p>
                <p className="mt-1">
                  <strong className="font-semibold text-[#0F1E36]">Nguồn chính thống:</strong>{' '}
                  {artifact.nguồn_tư_liệu}
                </p>
                <p className="mt-1">
                  <strong className="font-semibold text-[#0F1E36]">Quyền công bố:</strong>{' '}
                  {artifact.người_cho_phép_công_bố} —{' '}
                  <span className="italic">{artifact.phạm_vi_được_phép}</span>.
                </p>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() =>
                onAskAiAboutArtifact(artifact.nhan_đề, artifact.mã_định_danh)
              }
              className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#0F1E36] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#182C4E]"
            >
              <MessageSquareText className="h-4 w-4 text-[#E7D5B8]" aria-hidden="true" />
              <span>Hỏi AI Gemini về bảo vật này</span>
            </button>
          </div>
        </div>

        {/* Right Column: Curatorial Summary + Complete 23-Field Specification Table */}
        <div className="lg:col-span-7">
          <div className="border-b border-[#E5E0D8] pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span className="font-mono font-semibold tabular-nums text-[#9A6B2F]">
                {artifact.mã_định_danh}
              </span>
              <span aria-hidden="true">·</span>
              <span>{artifact.thời_kỳ}</span>
              <span aria-hidden="true">·</span>
              <span>Số ĐK: {artifact.số_đăng_ký}</span>
              <span aria-hidden="true">·</span>
              <span>{artifact.mức_kiểm_chứng}</span>
            </div>

            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#0F1E36] sm:text-4xl">
              {artifact.nhan_đề}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#1C1917]">
              {artifact.mô_tả}
            </p>
          </div>

          {/* 23-Field Archival Metadata Table */}
          <div className="mt-6">
            <div className="flex items-center justify-between pb-3">
              <h2 className="font-serif text-xl font-semibold text-[#0F1E36]">
                Bảng Hồ sơ Chi tiết (23 trường thông tin chuẩn hóa)
              </h2>
              <span className="font-mono text-xs tabular-nums text-[#78716C]">
                23 / 23 trường
              </span>
            </div>

            <div className="overflow-hidden rounded-md border border-[#E5E0D8] bg-white">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="border-b border-[#E5E0D8] bg-[#F4EFE6] text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  <tr>
                    <th scope="col" className="w-12 px-4 py-3 font-mono">
                      STT
                    </th>
                    <th scope="col" className="w-1/3 px-4 py-3">
                      Trường thông tin
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Nội dung tư liệu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]">
                  {fields23.map((row) => (
                    <tr key={row.index} className="align-top transition-colors hover:bg-[#FBF9F5]">
                      <td className="px-4 py-3 font-mono text-xs tabular-nums text-[#9A6B2F]">
                        {row.index}
                      </td>
                      <th
                        scope="row"
                        className="px-4 py-3 text-xs font-semibold text-[#0F1E36] sm:text-sm"
                      >
                        <div>{row.label}</div>
                        <div className="mt-0.5 font-mono text-[11px] font-normal text-[#78716C]">
                          {row.keyName}
                        </div>
                      </th>
                      <td className="px-4 py-3 text-sm leading-relaxed text-[#1C1917]">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
