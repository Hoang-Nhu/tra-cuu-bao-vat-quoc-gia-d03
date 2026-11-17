import { ExternalLink } from 'lucide-react';
import { ARTIFACTS, REFERENCE_SOURCES } from '../data/artifacts';

export function SourcesView() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#E5E0D8] pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
          Tính xác thực & Bản quyền Di sản
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#0F1E36] sm:text-4xl">
          Nguồn Tư liệu Chính thống & Ghi nhận Quyền công bố
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#57534E]">
          Tổng hợp 07 nguồn tư liệu chuẩn hóa làm cơ sở biên soạn 15 bản ghi bảo vật quốc gia
          trong Đề tài D03, cùng xác nhận phạm vi sử dụng phục vụ học tập phi lợi nhuận của các bảo
          tàng và ban quản lý di tích.
        </p>
      </div>

      {/* 7 Official Reference Sources */}
      <div className="mt-8">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#0F1E36]">
            07 Nguồn Tư liệu Tham chiếu Chính thống
          </h2>
          <span className="font-mono text-xs tabular-nums text-[#78716C]">7 nguồn</span>
        </div>

        <div className="divide-y divide-[#E5E0D8] rounded-md border border-[#E5E0D8] bg-white">
          {REFERENCE_SOURCES.map((source) => (
            <article key={source.id} className="p-6">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
                    <span className="font-mono font-semibold tabular-nums text-[#9A6B2F]">
                      0{source.id}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{source.organization}</span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#0F1E36]">
                    {source.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57534E]">
                    {source.description}
                  </p>
                  <p className="mt-2.5 text-xs text-[#1C1917]">
                    <strong className="font-semibold text-[#0F1E36]">Phạm vi đối chiếu:</strong>{' '}
                    <span className="font-mono">{source.appliedRecords}</span>
                  </p>
                </div>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 self-start rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3.5 py-2 text-xs font-medium text-[#0F1E36] transition-colors hover:border-[#9A6B2F] hover:text-[#9A6B2F]"
                >
                  <span className="font-mono">{source.url.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Museum Publication Rights Ledger */}
      <div className="mt-12">
        <div className="pb-4">
          <h2 className="font-serif text-2xl font-semibold text-[#0F1E36]">
            Ghi nhận Quyền công bố & Phạm vi Sử dụng của Bảo tàng
          </h2>
          <p className="mt-1 text-sm text-[#57534E]">
            Bảng tổng hợp đơn vị chủ quản cho phép công bố và giới hạn khai thác phi lợi nhuận cho
            từng hồ sơ D03-00001 đến D03-00015.
          </p>
        </div>

        <div className="overflow-x-auto rounded-md border border-[#E5E0D8] bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="border-b border-[#E5E0D8] bg-[#F4EFE6] text-xs font-semibold uppercase tracking-wider text-[#57534E]">
              <tr>
                <th scope="col" className="px-4 py-3 font-mono">
                  Mã
                </th>
                <th scope="col" className="px-4 py-3">
                  Tên bảo vật
                </th>
                <th scope="col" className="px-4 py-3">
                  Đơn vị cho phép công bố
                </th>
                <th scope="col" className="px-4 py-3">
                  Phạm vi được phép
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8]">
              {ARTIFACTS.map((item) => (
                <tr key={item.mã_định_danh} className="align-top hover:bg-[#FBF9F5]">
                  <td className="px-4 py-3 font-mono text-xs tabular-nums text-[#9A6B2F] whitespace-nowrap">
                    {item.mã_định_danh}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0F1E36]">
                    {item.tên_rút_gọn}
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-[#1C1917]">
                    {item.người_cho_phép_công_bố}
                  </td>
                  <td className="px-4 py-3 text-xs leading-relaxed text-[#57534E]">
                    {item.phạm_vi_được_phép}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
