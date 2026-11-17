export type ScreenId =
  | 'home'
  | 'catalog'
  | 'detail'
  | 'chat'
  | 'sources'
  | 'about';

export type HistoricalPeriod =
  | 'Tất cả'
  | 'Đông Sơn'
  | 'Thời Lý'
  | 'Thời Trần'
  | 'Thời Lê'
  | 'Thời Nguyễn';

export interface ArtifactRecord {
  mã_định_danh: string;
  nhan_đề: string;
  loại: string;
  người_tạo_ra: string;
  niên_đại: string;
  mô_tả: string;
  ngôn_ngữ: string;
  nơi_lưu_giữ_hiện_nay: string;
  nơi_lưu_giữ_tại_thời_điểm_tư_liệu: string;
  số_đăng_ký: string;
  loại_bản_đang_hiển_thị: string;
  tình_trạng_bản_gốc: string;
  tệp_đính_kèm: string;
  phiên_âm_dịch_nghĩa: string;
  quan_hệ: string;
  người_cho_phép_công_bố: string;
  phạm_vi_được_phép: string;
  phần_không_công_bố: string;
  nguồn_tư_liệu: string;
  mức_kiểm_chứng: string;
  điểm_chưa_rõ: string;
}

export interface EnrichedArtifact extends ArtifactRecord {
  thời_kỳ: Exclude<HistoricalPeriod, 'Tất cả'>;
  tên_rút_gọn: string;
  ảnh_hiển_thị: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface ReferenceSource {
  id: number;
  title: string;
  organization: string;
  url: string;
  description: string;
  appliedRecords: string;
}
