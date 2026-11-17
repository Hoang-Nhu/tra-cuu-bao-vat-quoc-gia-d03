import { useMemo, useState } from 'react';
import { Search, X, ArrowRight, Download } from 'lucide-react';
import { ARTIFACTS, HISTORICAL_PERIODS } from '../data/artifacts';
import type { HistoricalPeriod } from '../types/artifact';
import { ArchivalImage } from './ArchivalImage';

interface CatalogViewProps {
  selectedPeriod: HistoricalPeriod;
  onPeriodChange: (period: HistoricalPeriod) => void;
  onSelectArtifact: (id: string) => void;
  onExportJSON: (records?: typeof ARTIFACTS) => void;
  onExportCSV: (records?: typeof ARTIFACTS) => void;
}

export function CatalogView({
  selectedPeriod,
  onPeriodChange,
  onSelectArtifact,
  onExportJSON,
  onExportCSV,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(ARTIFACTS.map((item) => item.loại)));
    return ['Tất cả', ...unique];
  }, []);

  const filteredArtifacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ARTIFACTS.filter((item) => {
      const matchPeriod =
        selectedPeriod === 'Tất cả' || item.thời_kỳ === selectedPeriod;
      const matchCategory =
        selectedCategory === 'Tất cả' || item.loại === selectedCategory;
      if (!matchPeriod || !matchCategory) return false;

      if (!query) return true;
      return (
        item.mã_định_danh.toLowerCase().includes(query) ||
        item.nhan_đề.toLowerCase().includes(query) ||
        item.nơi_lưu_giữ_hiện_nay.toLowerCase().includes(query) ||
        item.người_tạo_ra.toLowerCase().includes(query) ||
        item.niên_đại.toLowerCase().includes(query) ||
        item.mô_tả.toLowerCase().includes(query) ||
        item.loại.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedPeriod, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tất cả');
    onPeriodChange('Tất cả');
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#E5E0D8] pb-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
            Danh mục Lưu trữ Số · Bộ sưu tập D03
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold text-[#0F1E36] sm:text-4xl">
            Danh sách & Bộ lọc Bảo vật Quốc gia
          </h1>
          <p className="mt-2 text-sm text-[#57534E]">
            Hiển thị{' '}
            <span className="font-mono font-semibold tabular-nums text-[#0F1E36]">
              {filteredArtifacts.length}
            </span>{' '}
            / <span className="font-mono tabular-nums">15</span> hồ sơ đã kiểm chứng.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onExportJSON(filteredArtifacts)}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-white px-3.5 py-2 text-xs font-medium text-[#0F1E36] transition-colors hover:border-[#0F1E36] whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 text-[#9A6B2F]" aria-hidden="true" />
            <span>Xuất JSON ({filteredArtifacts.length})</span>
          </button>
          <button
            type="button"
            onClick={() => onExportCSV(filteredArtifacts)}
            className="inline-flex min-h-[40px] cursor-pointer items-center gap-1.5 rounded-md border border-[#E5E0D8] bg-white px-3.5 py-2 text-xs font-medium text-[#0F1E36] transition-colors hover:border-[#0F1E36] whitespace-nowrap"
          >
            <Download className="h-3.5 w-3.5 text-[#9A6B2F]" aria-hidden="true" />
            <span>Xuất CSV ({filteredArtifacts.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Keyword Search */}
          <div className="relative md:col-span-8">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716C]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên bảo vật, mã D03, nơi lưu giữ, niên đại..."
              aria-label="Tìm kiếm bảo vật theo từ khóa"
              className="h-11 w-full rounded-md border border-[#E5E0D8] bg-white pl-10 pr-10 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#0F1E36] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-[#78716C] hover:text-[#0F1E36]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Type Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Lọc theo loại hình hiện vật"
              className="h-11 w-full cursor-pointer rounded-md border border-[#E5E0D8] bg-white px-3.5 text-sm text-[#1C1917] focus:border-[#0F1E36] focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'Tất cả' ? 'Loại hình: Tất cả' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Period Filter Segmented Bar */}
        <div
          role="tablist"
          aria-label="Bộ lọc thời kỳ lịch sử"
          className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E5E0D8] bg-[#F4EFE6] p-1.5"
        >
          {HISTORICAL_PERIODS.map((period) => {
            const count =
              period.id === 'Tất cả'
                ? ARTIFACTS.length
                : ARTIFACTS.filter((a) => a.thời_kỳ === period.id).length;
            const isActive = selectedPeriod === period.id;

            return (
              <button
                key={period.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onPeriodChange(period.id)}
                className={`inline-flex min-h-[38px] cursor-pointer items-center gap-2 rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'text-[#57534E] hover:bg-white/70 hover:text-[#0F1E36]'
                }`}
              >
                <span>{period.label}</span>
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    isActive ? 'text-[#E7D5B8]' : 'text-[#78716C]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Grid */}
      {filteredArtifacts.length === 0 ? (
        <div className="mt-10 rounded-md border border-[#E5E0D8] bg-white px-6 py-16 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#0F1E36]">
            Không tìm thấy bảo vật phù hợp
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#57534E]">
            Không có bản ghi nào khớp với từ khóa hoặc bộ lọc thời kỳ hiện tại. Vui lòng thử lại
            với từ khóa khác hoặc đặt lại bộ lọc.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-6 inline-flex min-h-[42px] cursor-pointer items-center rounded-md bg-[#0F1E36] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#182C4E]"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtifacts.map((item) => (
            <article
              key={item.mã_định_danh}
              className="group flex flex-col justify-between overflow-hidden rounded-md border border-[#E5E0D8] bg-white transition-colors hover:border-[#9A6B2F]"
            >
              <div>
                <ArchivalImage artifact={item} />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#57534E]">
                    <span className="font-mono font-medium tabular-nums text-[#9A6B2F]">
                      {item.mã_định_danh}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.thời_kỳ}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.mức_kiểm_chứng}</span>
                  </div>

                  <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-[#0F1E36]">
                    {item.nhan_đề}
                  </h2>

                  <dl className="mt-4 space-y-2 border-t border-[#E5E0D8]/70 pt-3 text-xs">
                    <div>
                      <dt className="text-[#78716C]">Niên đại</dt>
                      <dd className="mt-0.5 font-medium text-[#1C1917]">{item.niên_đại}</dd>
                    </div>
                    <div>
                      <dt className="text-[#78716C]">Nơi lưu giữ hiện nay</dt>
                      <dd className="mt-0.5 line-clamp-2 text-[#1C1917]">
                        {item.nơi_lưu_giữ_hiện_nay}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="border-t border-[#E5E0D8] bg-[#FBF9F5] px-5 py-3">
                <button
                  type="button"
                  onClick={() => onSelectArtifact(item.mã_định_danh)}
                  className="inline-flex min-h-[38px] w-full cursor-pointer items-center justify-between text-sm font-semibold text-[#0F1E36] transition-colors hover:text-[#9A6B2F]"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
