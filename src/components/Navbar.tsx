import { useState, useRef, useEffect } from 'react';
import { Menu, X, Download, ChevronDown } from 'lucide-react';
import type { ScreenId } from '../types/artifact';

interface NavbarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onExportJSON: () => void;
  onExportCSV: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'catalog', label: 'Danh sách & Bộ lọc' },
  { id: 'detail', label: 'Chi tiết bảo vật' },
  { id: 'chat', label: 'Hỏi đáp AI' },
  { id: 'sources', label: 'Nguồn & Ghi nhận' },
  { id: 'about', label: 'Giới thiệu' },
];

export function Navbar({
  activeScreen,
  onNavigate,
  onExportJSON,
  onExportCSV,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectScreen = (id: ScreenId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E0D8] bg-[#FBF9F5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zone 1: Single-line Wordmark */}
        <button
          type="button"
          onClick={() => handleSelectScreen('home')}
          className="cursor-pointer font-serif text-lg font-bold tracking-tight text-[#0F1E36] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A6B2F] sm:text-xl"
        >
          Bảo vật Quốc gia · D03
        </button>

        {/* Zone 2: Desktop 6-screen Navigation */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectScreen(item.id)}
                className={`relative cursor-pointer py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A6B2F] ${
                  isActive
                    ? 'text-[#0F1E36] font-semibold'
                    : 'text-[#57534E] hover:text-[#0F1E36]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#9A6B2F]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Export Action + Mobile Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setExportMenuOpen((prev) => !prev)}
              aria-expanded={exportMenuOpen}
              aria-haspopup="menu"
              className="inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-md bg-[#0F1E36] px-3.5 py-2 text-xs font-medium text-[#FBF9F5] transition-colors hover:bg-[#182C4E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B2F]"
            >
              <Download className="h-3.5 w-3.5 text-[#E7D5B8]" aria-hidden="true" />
              <span>Xuất dữ liệu</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
            </button>

            {exportMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-52 rounded-md border border-[#E5E0D8] bg-white py-1.5 shadow-lg"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onExportJSON();
                    setExportMenuOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#F4EFE6]"
                >
                  <span>Tải xuống JSON</span>
                  <span className="font-mono text-[11px] text-[#78716C]">.json</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onExportCSV();
                    setExportMenuOpen(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-xs font-medium text-[#1C1917] transition-colors hover:bg-[#F4EFE6]"
                >
                  <span>Tải xuống CSV (Excel)</span>
                  <span className="font-mono text-[11px] text-[#78716C]">.csv</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            aria-expanded={mobileOpen}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-[#E5E0D8] bg-white text-[#0F1E36] transition-colors hover:bg-[#F4EFE6] lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B2F]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menu di động"
          className="border-t border-[#E5E0D8] bg-[#FBF9F5] px-4 py-3 lg:hidden"
        >
          <div className="flex flex-col divide-y divide-[#E5E0D8]/60">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectScreen(item.id)}
                  className={`flex min-h-[44px] w-full cursor-pointer items-center justify-between py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-[#0F1E36]'
                      : 'font-medium text-[#57534E] hover:text-[#0F1E36]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-medium text-[#9A6B2F]">Đang xem</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
