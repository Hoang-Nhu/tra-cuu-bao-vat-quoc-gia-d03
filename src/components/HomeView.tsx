import { ArrowRight, MessageSquareText } from 'lucide-react';
import { ARTIFACTS, HISTORICAL_PERIODS } from '../data/artifacts';
import type { HistoricalPeriod, ScreenId } from '../types/artifact';
import { ArchivalImage } from './ArchivalImage';

interface HomeViewProps {
  onExploreCatalog: (period?: HistoricalPeriod) => void;
  onSelectArtifact: (id: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

const FEATURED_IDS = ['D03-00001', 'D03-00003', 'D03-00007'];

export function HomeView({
  onExploreCatalog,
  onSelectArtifact,
  onNavigate,
}: HomeViewProps) {
  const periodCounts = HISTORICAL_PERIODS.filter((p) => p.id !== 'Tất cả').map((period) => ({
    ...period,
    count: ARTIFACTS.filter((a) => a.thời_kỳ === period.id).length,
  }));

  const featuredArtifacts = ARTIFACTS.filter((a) =>
    FEATURED_IDS.includes(a.mã_định_danh)
  );

  return (
    <div className="space-y-16 pb-8">
      {/* Exhibition Marquee Hero */}
      <section className="bg-[#0F1E36] text-[#FBF9F5]">
        <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-[#E7D5B8]">
                  Đề tài D03 · Chương trình Thực tập sinh Đợt 15 · FPT Polytechnic × IMTA TECH
                </p>
                <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-[54px]">
                  Bảo vật Quốc gia Việt Nam theo Thời kỳ Lịch sử
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-[#CBD5E1]">
                  Không gian lưu trữ và tra cứu bảo tàng số chuẩn hóa 15 hồ sơ Bảo vật Quốc gia
                  tiêu biểu từ thời đại văn hóa Đông Sơn đến triều Nguyễn, đối chiếu 23 trường
                  thông tin di sản và hỗ trợ hỏi đáp AI bám sát 100% tư liệu gốc.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onExploreCatalog('Tất cả')}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-md bg-[#B6823E] px-6 py-3 text-sm font-semibold text-[#091324] transition-colors hover:bg-[#cca05f] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md border border-white/25 bg-transparent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7D5B8]"
                >
                  <MessageSquareText className="h-4 w-4 text-[#E7D5B8]" aria-hidden="true" />
                  <span>Hỏi đáp AI Gemini</span>
                </button>
              </div>
            </div>

            {/* Right Column: Curatorial Period Ledger */}
            <div className="flex flex-col justify-between rounded-lg border border-white/15 bg-[#152847]/70 p-6 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="font-serif text-lg font-medium text-white">
                    Mục lục Thời kỳ Lịch sử
                  </span>
                  <span className="font-mono text-xs tabular-nums text-[#E7D5B8]">
                    15 hồ sơ
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-white/10">
                  {periodCounts.map((period, idx) => (
                    <li key={period.id}>
                      <button
                        type="button"
                        onClick={() => onExploreCatalog(period.id)}
                        className="group flex w-full cursor-pointer items-center justify-between py-3 text-left transition-colors hover:text-[#E7D5B8]"
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs tabular-nums text-[#E7D5B8]/80">
                              0{idx + 1}
                            </span>
                            <span className="text-sm font-medium text-white group-hover:text-[#E7D5B8]">
                              {period.label}
                            </span>
                          </div>
                          <p className="pl-7 text-xs text-[#94A3B8]">{period.span}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs tabular-nums text-[#CBD5E1]">
                            {String(period.count).padStart(2, '0')} hiện vật
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-[#E7D5B8] opacity-70 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 border-t border-white/15 pt-3 text-xs text-[#94A3B8]">
                Nguồn kiểm chứng chính thống: Cục Di sản văn hóa (dsvh.gov.vn) & Hệ thống Bảo tàng Quốc gia.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Overview Strip */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-y divide-[#E5E0D8] border border-[#E5E0D8] bg-white sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          <div className="p-6">
            <p className="font-serif text-3xl font-semibold tabular-nums text-[#0F1E36] sm:text-4xl">
              15
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#1C1917]">Bảo vật Quốc gia</p>
            <p className="mt-0.5 text-xs text-[#57534E]">Mã định danh D03-00001 đến D03-00015</p>
          </div>
          <div className="p-6">
            <p className="font-serif text-3xl font-semibold tabular-nums text-[#0F1E36] sm:text-4xl">
              05
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#1C1917]">Mốc thời kỳ lịch sử</p>
            <p className="mt-0.5 text-xs text-[#57534E]">Đông Sơn, Lý, Trần, Lê, Nguyễn</p>
          </div>
          <div className="p-6">
            <p className="font-serif text-3xl font-semibold tabular-nums text-[#0F1E36] sm:text-4xl">
              23
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#1C1917]">Trường mô tả chuẩn</p>
            <p className="mt-0.5 text-xs text-[#57534E]">Từ niên đại, lưu giữ đến quyền công bố</p>
          </div>
          <div className="p-6">
            <p className="font-serif text-3xl font-semibold tabular-nums text-[#9A6B2F] sm:text-4xl">
              100%
            </p>
            <p className="mt-1.5 text-sm font-medium text-[#1C1917]">Đã kiểm chứng</p>
            <p className="mt-0.5 text-xs text-[#57534E]">Đối chiếu hồ sơ bảo tàng & Cục Di sản</p>
          </div>
        </div>
      </section>

      {/* Historical Period Cards */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
              Phân kỳ Lịch sử
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#0F1E36] sm:text-3xl">
              Dòng chảy Di sản qua các Triều đại
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onExploreCatalog('Tất cả')}
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-[#0F1E36] hover:text-[#9A6B2F] transition-colors whitespace-nowrap"
          >
            <span>Xem toàn bộ 15 bảo vật</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {periodCounts.map((period, index) => (
            <button
              key={period.id}
              type="button"
              onClick={() => onExploreCatalog(period.id)}
              className="group flex cursor-pointer flex-col justify-between rounded-md border border-[#E5E0D8] bg-white p-5 text-left transition-colors hover:border-[#9A6B2F]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <span className="font-mono tabular-nums text-[#9A6B2F]">0{index + 1}</span>
                  <span className="font-mono tabular-nums">{period.count} bảo vật</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[#0F1E36] group-hover:text-[#9A6B2F] transition-colors">
                  {period.label}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-[#78716C]">{period.span}</p>
                <p className="mt-3 text-xs leading-relaxed text-[#57534E]">
                  {period.summary}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-medium text-[#0F1E36] group-hover:text-[#9A6B2F]">
                <span>Lọc theo thời kỳ</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Artifacts */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
              Hiện vật Tiêu biểu
            </p>
            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#0F1E36] sm:text-3xl">
              Điểm nhấn Trưng bày trong Bộ sưu tập
            </h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredArtifacts.map((item) => (
            <article
              key={item.mã_định_danh}
              className="group flex flex-col justify-between overflow-hidden rounded-md border border-[#E5E0D8] bg-white"
            >
              <div>
                <ArchivalImage artifact={item} />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#57534E]">
                    <span className="font-mono tabular-nums text-[#9A6B2F]">
                      {item.mã_định_danh}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.thời_kỳ}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.số_đăng_ký}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-[#0F1E36]">
                    {item.nhan_đề}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#57534E]">
                    {item.mô_tả}
                  </p>
                </div>
              </div>
              <div className="border-t border-[#E5E0D8] px-5 py-3.5">
                <button
                  type="button"
                  onClick={() => onSelectArtifact(item.mã_định_danh)}
                  className="inline-flex w-full cursor-pointer items-center justify-between text-sm font-medium text-[#0F1E36] transition-colors hover:text-[#9A6B2F]"
                >
                  <span>Xem hồ sơ 23 trường</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
