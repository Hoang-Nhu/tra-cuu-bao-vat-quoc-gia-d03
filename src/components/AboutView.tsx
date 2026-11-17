export function AboutView() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#E5E0D8] pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
          Hồ sơ Đề tài Thực tập · Đợt 15
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#0F1E36] sm:text-4xl">
          Giới thiệu Dự án & Tác giả Thực hiện
        </h1>
      </div>

      {/* Prominent Author & Program Dossier Card */}
      <div className="mt-8 rounded-md border border-[#E5E0D8] bg-[#0F1E36] p-6 text-[#FBF9F5] sm:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-[#E7D5B8]">
          Thông tin Thực tập sinh
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-white sm:text-3xl">
          Thực tập sinh: Nguyễn Văn Hoàng - MSV: PH64335 - Nhóm 2 - Đợt 15
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/15 pt-5 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs text-[#94A3B8]">Đề tài thực hiện</p>
            <p className="mt-1 font-medium text-white">
              D03: Bảo vật quốc gia theo thời kỳ lịch sử
            </p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8]">Đơn vị đào tạo & Hướng dẫn</p>
            <p className="mt-1 font-medium text-white">FPT Polytechnic × IMTA TECH</p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8]">Mục đích sử dụng</p>
            <p className="mt-1 font-medium text-[#E7D5B8]">
              Sản phẩm học tập & Nghiên cứu phi lợi nhuận
            </p>
          </div>
        </div>
      </div>

      {/* Scope & Limitations Two-Column Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <article className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#0F1E36]">
            01. Phạm vi Đề tài
          </h2>
          <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#1C1917]">
            <p>
              Ứng dụng web dạng Single Page Application (SPA) được xây dựng nhằm số hóa, chuẩn hóa
              và trình bày trực quan bộ dữ liệu{' '}
              <span className="font-mono text-xs text-[#0F1E36]">tulieu.json</span> gồm{' '}
              <strong className="font-semibold">15 Bảo vật Quốc gia</strong> tiêu biểu trải dài qua
              05 giai đoạn lịch sử: Văn hóa Đông Sơn, Thời Lý, Thời Trần, Thời Lê và Thời Nguyễn.
            </p>
            <p>Các chức năng cốt lõi đã hoàn thiện trong phạm vi đề tài:</p>
            <ul className="list-disc space-y-2 pl-5 text-[#57534E]">
              <li>
                Chuẩn hóa cấu trúc dữ liệu di sản với đầy đủ 23 trường thông tin mô tả từ mã định
                danh, niên đại, tình trạng bản gốc tới quyền công bố của từng bảo tàng.
              </li>
              <li>
                Bộ lọc đa tiêu chí theo thời kỳ lịch sử, loại hình hiện vật và tìm kiếm từ khóa trực
                tiếp theo thời gian thực.
              </li>
              <li>
                Tích hợp công cụ xuất tệp dữ liệu chuẩn UTF-8 ở cả hai định dạng{' '}
                <span className="font-mono text-xs">.json</span> và{' '}
                <span className="font-mono text-xs">.csv</span> phục vụ lưu trữ và học tập.
              </li>
              <li>
                Tích hợp trợ lý Hỏi đáp AI (Gemini) được ràng buộc chỉ phản hồi từ 15 hồ sơ gốc và
                bắt buộc trích dẫn định danh chuẩn{' '}
                <span className="font-mono text-xs">
                  [Mã bản ghi, Nơi lưu giữ hiện nay, Loại bản]
                </span>
                .
              </li>
            </ul>
          </div>
        </article>

        <article className="rounded-md border border-[#E5E0D8] bg-white p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#0F1E36]">
            02. Những phần chưa làm được & Hướng phát triển
          </h2>
          <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#1C1917]">
            <p>
              Trong khuôn khổ thời gian thực tập Đợt 15 và nguyên tắc tuân thủ bản quyền hình ảnh
              bảo tàng, hệ thống vẫn còn một số hạng mục chưa triển khai trọn vẹn:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-[#57534E]">
              <li>
                <strong className="text-[#1C1917]">Kho ảnh vật lý độ phân giải cao:</strong> Đường
                dẫn ảnh tham chiếu dạng{' '}
                <span className="font-mono text-xs">images/baovat-01.jpg</span> đến{' '}
                <span className="font-mono text-xs">baovat-15.jpg</span> cần bổ sung tệp ảnh gốc
                đã xin phép từ từng bảo tàng; hiện giao diện hiển thị khung tư liệu dự phòng chuẩn
                mực khi chưa có tệp ảnh cục bộ.
              </li>
              <li>
                <strong className="text-[#1C1917]">Quy mô dữ liệu:</strong> Mới chuẩn hóa 15 bảo
                vật đại diện cho 5 thời kỳ, chưa bao phủ toàn bộ hơn 290 Bảo vật Quốc gia đã được
                Thủ tướng Chính phủ công nhận.
              </li>
              <li>
                <strong className="text-[#1C1917]">Trình xem 3D & Bản đồ di tích:</strong> Chưa
                tích hợp mô hình quét 3D hiện vật hình khối (Trống đồng, Thạp đồng, Cửu đỉnh) và
                bản đồ định vị tọa độ nơi lưu giữ hiện nay.
              </li>
              <li>
                <strong className="text-[#1C1917]">Hệ quản trị CMS đa vai trò:</strong> Chưa xây
                dựng giao diện biên tập viên để cán bộ bảo tàng cập nhật hoặc phê duyệt bổ sung hồ
                sơ mới trực tiếp trên trình duyệt.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
