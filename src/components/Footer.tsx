import { Download } from 'lucide-react';
import type { ScreenId } from '../types/artifact';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
}

export function Footer({ onNavigate, onExportJSON, onExportCSV }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-[#E5E0D8] bg-[#0F1E36] text-[#FBF9F5]">
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-white">
              Bảo vật Quốc gia theo Thời kỳ Lịch sử
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#CBD5E1]">
              Sản phẩm học tập phi lợi nhuận thuộc Đề tài D03 — Chương trình Thực tập sinh Đợt 15
              (FPT Polytechnic × IMTA TECH). Dữ liệu được chuẩn hóa từ 15 hồ sơ tư liệu chính thống.
            </p>
            <p className="mt-4 text-xs text-[#E7D5B8]">
              Thực tập sinh: Nguyễn Văn Hoàng · MSV: PH64335 · Nhóm 2 · Đợt 15
            </p>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#E7D5B8]">
              Chuyên mục
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-[#CBD5E1]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Danh sách & Bộ lọc
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('detail')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Chi tiết bảo vật
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('chat')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Hỏi đáp AI (Gemini)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sources')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Nguồn & Ghi nhận
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Giới thiệu
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#E7D5B8]">
              Tải xuống Tư liệu
            </h3>
            <div className="mt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={onExportJSON}
                className="inline-flex min-h-[40px] cursor-pointer items-center justify-between rounded border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="h-3.5 w-3.5 text-[#E7D5B8]" aria-hidden="true" />
                  Xuất dữ liệu JSON
                </span>
                <span className="font-mono text-[#E7D5B8]">.json</span>
              </button>
              <button
                type="button"
                onClick={onExportCSV}
                className="inline-flex min-h-[40px] cursor-pointer items-center justify-between rounded border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-white/10"
              >
                <span className="inline-flex items-center gap-2">
                  <Download className="h-3.5 w-3.5 text-[#E7D5B8]" aria-hidden="true" />
                  Xuất dữ liệu CSV
                </span>
                <span className="font-mono text-[#E7D5B8]">.csv</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Cổng Tư liệu Số Đề tài D03 · Phục vụ học tập phi lợi nhuận.</span>
          <span>Dữ liệu kiểm chứng từ dsvh.gov.vn & hệ thống Bảo tàng Việt Nam.</span>
        </div>
      </div>
    </footer>
  );
}
