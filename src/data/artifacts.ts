import rawData from './tulieu.json';
import type {
  ArtifactRecord,
  EnrichedArtifact,
  HistoricalPeriod,
  ReferenceSource,
} from '../types/artifact';

const PERIOD_MAP: Record<string, Exclude<HistoricalPeriod, 'Tất cả'>> = {
  'D03-00001': 'Đông Sơn',
  'D03-00002': 'Đông Sơn',
  'D03-00003': 'Thời Lê',
  'D03-00004': 'Thời Lý',
  'D03-00005': 'Thời Lý',
  'D03-00006': 'Thời Trần',
  'D03-00007': 'Thời Nguyễn',
  'D03-00008': 'Thời Nguyễn',
  'D03-00009': 'Thời Lê',
  'D03-00010': 'Thời Lê',
  'D03-00011': 'Thời Nguyễn',
  'D03-00012': 'Đông Sơn',
  'D03-00013': 'Thời Lý',
  'D03-00014': 'Thời Lê',
  'D03-00015': 'Thời Lê',
};

export const HISTORICAL_PERIODS: {
  id: HistoricalPeriod;
  label: string;
  span: string;
  summary: string;
}[] = [
  {
    id: 'Tất cả',
    label: 'Tất cả thời kỳ',
    span: '2.500 năm trước – 1945',
    summary: 'Toàn bộ 15 bảo vật quốc gia tiêu biểu trong bộ tư liệu D03.',
  },
  {
    id: 'Đông Sơn',
    label: 'Văn hóa Đông Sơn',
    span: 'Thế kỷ VII TCN – I CN',
    summary: 'Đỉnh cao kỹ thuật đúc đồng thau và nghệ thuật tạo hình cổ đại.',
  },
  {
    id: 'Thời Lý',
    label: 'Thời Lý',
    span: '1009 – 1225',
    summary: 'Nghệ thuật điêu khắc đá Phật giáo và văn bia kinh điển Đại Việt.',
  },
  {
    id: 'Thời Trần',
    label: 'Thời Trần',
    span: '1225 – 1400',
    summary: 'Dòng gốm hoa nâu men ngọc mang bản sắc hào khí Đông A.',
  },
  {
    id: 'Thời Lê',
    label: 'Thời Lê',
    span: '1428 – 1789',
    summary: 'Từ điêu khắc hoàng cung Thăng Long, bia Tiến sĩ đến gốm Chu Đậu.',
  },
  {
    id: 'Thời Nguyễn',
    label: 'Thời Nguyễn',
    span: '1802 – 1945',
    summary: 'Di sản tư liệu thế giới Mộc bản, Châu bản và Cửu đỉnh Cố đô Huế.',
  },
];

const IMAGE_MAP: Record<string, string> = {
  'D03-00001': '/assets/aistudio/baovat-01_39f29be6.png',
  'D03-00002': '/assets/aistudio/baovat-02_e74a595a.jpg',
  'D03-00003': '/assets/aistudio/baovat-03_0ae8459f.jpg',
  'D03-00004': '/assets/aistudio/baovat-04_10de0973.jpg',
  'D03-00005': '/assets/aistudio/baovat-05_1e447804.jpg',
  'D03-00006': '/assets/aistudio/baovat-06_29619429.jpg',
  'D03-00007': '/assets/aistudio/baovat-07_225dab6d.jpg',
  'D03-00008': '/assets/aistudio/baovat-08_579ee812.jpg',
  'D03-00009': '/assets/aistudio/baovat-09_37cbeede.jpg',
  'D03-00010': '/assets/aistudio/baovat-10_2ca1ebc6.jpg',
  'D03-00011': '/assets/aistudio/baovat-11_2e6c64ec.jpg',
  'D03-00012': '/assets/aistudio/baovat-12_f24e5c6b.jpg',
  'D03-00013': '/assets/aistudio/baovat-13_87ee3ec0.jpg',
  'D03-00014': '/assets/aistudio/baovat-14_3fa09469.jpg',
  'D03-00015': '/assets/aistudio/baovat-15_c67fec3d.jpg',
};

export const ARTIFACTS: EnrichedArtifact[] = (rawData as ArtifactRecord[]).map((item) => ({
  ...item,
  thời_kỳ: PERIOD_MAP[item.mã_định_danh] || 'Thời Lê',
  tên_rút_gọn: item.nhan_đề.replace(/\s*\(.*?\)\s*/g, '').trim(),
  ảnh_hiển_thị: IMAGE_MAP[item.mã_định_danh] || item.tệp_đính_kèm,
}));

export interface DetailFieldRow {
  index: string;
  label: string;
  keyName: string;
  value: string;
}

export function get23DetailFields(artifact: EnrichedArtifact): DetailFieldRow[] {
  return [
    { index: '01', label: 'Mã định danh', keyName: 'mã_định_danh', value: artifact.mã_định_danh },
    { index: '02', label: 'Nhan đề bảo vật', keyName: 'nhan_đề', value: artifact.nhan_đề },
    { index: '03', label: 'Loại hình hiện vật', keyName: 'loại', value: artifact.loại },
    { index: '04', label: 'Thời kỳ lịch sử', keyName: 'thời_kỳ', value: artifact.thời_kỳ },
    { index: '05', label: 'Người / Chủ thể tạo ra', keyName: 'người_tạo_ra', value: artifact.người_tạo_ra },
    { index: '06', label: 'Niên đại', keyName: 'niên_đại', value: artifact.niên_đại },
    { index: '07', label: 'Mô tả đặc trưng', keyName: 'mô_tả', value: artifact.mô_tả },
    { index: '08', label: 'Ngôn ngữ văn tự', keyName: 'ngôn_ngữ', value: artifact.ngôn_ngữ },
    { index: '09', label: 'Nơi lưu giữ hiện nay', keyName: 'nơi_lưu_giữ_hiện_nay', value: artifact.nơi_lưu_giữ_hiện_nay },
    {
      index: '10',
      label: 'Nơi lưu giữ tại thời điểm tư liệu',
      keyName: 'nơi_lưu_giữ_tại_thời_điểm_tư_liệu',
      value: artifact.nơi_lưu_giữ_tại_thời_điểm_tư_liệu,
    },
    { index: '11', label: 'Số đăng ký bảo tàng', keyName: 'số_đăng_ký', value: artifact.số_đăng_ký },
    { index: '12', label: 'Loại bản đang hiển thị', keyName: 'loại_bản_đang_hiển_thị', value: artifact.loại_bản_đang_hiển_thị },
    { index: '13', label: 'Tình trạng bản gốc', keyName: 'tình_trạng_bản_gốc', value: artifact.tình_trạng_bản_gốc },
    { index: '14', label: 'Tệp đính kèm', keyName: 'tệp_đính_kèm', value: artifact.tệp_đính_kèm },
    { index: '15', label: 'Phiên âm & dịch nghĩa', keyName: 'phiên_âm_dịch_nghĩa', value: artifact.phiên_âm_dịch_nghĩa },
    { index: '16', label: 'Quan hệ sưu tập / di sản', keyName: 'quan_hệ', value: artifact.quan_hệ },
    { index: '17', label: 'Người / Đơn vị cho phép công bố', keyName: 'người_cho_phép_công_bố', value: artifact.người_cho_phép_công_bố },
    { index: '18', label: 'Phạm vi được phép sử dụng', keyName: 'phạm_vi_được_phép', value: artifact.phạm_vi_được_phép },
    { index: '19', label: 'Phần không công bố', keyName: 'phần_không_công_bố', value: artifact.phần_không_công_bố },
    { index: '20', label: 'Nguồn tư liệu chính thống', keyName: 'nguồn_tư_liệu', value: artifact.nguồn_tư_liệu },
    { index: '21', label: 'Mức độ kiểm chứng', keyName: 'mức_kiểm_chứng', value: artifact.mức_kiểm_chứng },
    { index: '22', label: 'Điểm chưa rõ / Lưu ý', keyName: 'điểm_chưa_rõ', value: artifact.điểm_chưa_rõ },
    {
      index: '23',
      label: 'Định danh trích dẫn chuẩn',
      keyName: 'định_danh_trích_dẫn',
      value: `[${artifact.mã_định_danh}, ${artifact.nơi_lưu_giữ_hiện_nay}, ${artifact.loại_bản_đang_hiển_thị}]`,
    },
  ];
}

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 1,
    title: 'Cổng thông tin Cục Di sản văn hóa — Danh mục Bảo vật Quốc gia',
    organization: 'Cục Di sản văn hóa (Bộ Văn hóa, Thể thao và Du lịch)',
    url: 'https://dsvh.gov.vn',
    description:
      'Nguồn pháp lý và hồ sơ gốc công nhận Bảo vật Quốc gia Việt Nam qua các đợt, dùng để đối chiếu tên gọi, niên đại và trạng thái bảo tồn.',
    appliedRecords: 'D03-00001 đến D03-00015 (Toàn bộ 15 hồ sơ)',
  },
  {
    id: 2,
    title: 'Hệ thống tư liệu trưng bày Bảo tàng Lịch sử Quốc gia',
    organization: 'Bảo tàng Lịch sử Quốc gia Việt Nam (baotanglichsu.vn)',
    url: 'https://baotanglichsu.vn',
    description:
      'Cung cấp thông số kích thước, chất liệu, hoa văn và quyền công bố cho sưu tập trống đồng Đông Sơn và gốm hoa nâu thời Trần.',
    appliedRecords: 'D03-00001, D03-00006, D03-00012',
  },
  {
    id: 3,
    title: 'Cổng thông tin Cục Văn thư và Lưu trữ Nhà nước & Di sản UNESCO',
    organization: 'Cục Văn thư và Lưu trữ Nhà nước (archives.gov.vn / TTLQG I & IV)',
    url: 'https://archives.gov.vn',
    description:
      'Nguồn chuẩn hóa về Mộc bản triều Nguyễn, Châu bản triều Nguyễn, hồ sơ UNESCO Memory of the World và bản dịch nghĩa tiêu biểu.',
    appliedRecords: 'D03-00007, D03-00008',
  },
  {
    id: 4,
    title: 'Kho tư liệu Văn khắc Hán Nôm và Văn bia Lý - Trần - Lê',
    organization: 'Viện Nghiên cứu Hán Nôm & Trung tâm Hoạt động VHKH Văn Miếu - Quốc Tử Giám',
    url: 'https://hannom.vass.gov.vn',
    description:
      'Đối chiếu nguyên văn chữ Hán, phiên âm và dịch nghĩa cho Bia Sùng Thiên Diên Linh, Cột kinh Phật và 82 Bia Tiến sĩ.',
    appliedRecords: 'D03-00004, D03-00005, D03-00009',
  },
  {
    id: 5,
    title: 'Tư liệu Di sản Thế giới Hoàng thành Thăng Long & Cố đô Huế',
    organization: 'Trung tâm Bảo tồn Di sản Thăng Long - Hà Nội & Trung tâm BTDT Cố đô Huế',
    url: 'https://hoangthanhthanglong.vn',
    description:
      'Hồ sơ hiện vật đá điêu khắc điện Kính Thiên và chín đỉnh đồng thời Minh Mạng (Di sản tư liệu UNESCO khu vực Châu Á - Thái Bình Dương 2024).',
    appliedRecords: 'D03-00011, D03-00014',
  },
  {
    id: 6,
    title: 'Thư viện Quốc gia Việt Nam & Dòng họ Nguyễn Huy Trường Lưu',
    organization: 'Thư viện Quốc gia Việt Nam (nlv.gov.vn) & Sở VHTTDL Hà Tĩnh',
    url: 'https://nlv.gov.vn',
    description:
      'Tư liệu lưu trữ bản số tập bản đồ vẽ tay Hoàng Hoa sứ trình đồ (thế kỷ XVIII) và chú thích phiên âm các trạm dừng chân.',
    appliedRecords: 'D03-00010',
  },
  {
    id: 7,
    title: 'Hệ thống Bảo tàng & Ban quản lý Di tích các tỉnh đồng bằng Bắc Bộ',
    organization: 'Bảo tàng Hưng Yên, Bảo tàng Hải Dương, Sở VHTTDL Bắc Ninh, Hà Nam, Ninh Bình',
    url: 'https://dsvh.gov.vn',
    description:
      'Cung cấp số đăng ký địa phương, hiện trạng bảo quản định kỳ và xác nhận cho phép công bố hình ảnh phục vụ học tập phi lợi nhuận.',
    appliedRecords: 'D03-00002, D03-00003, D03-00004, D03-00005, D03-00013, D03-00015',
  },
];

export function exportAsJSON(records: EnrichedArtifact[] = ARTIFACTS) {
  const cleanPayload = records.map(
    ({ thời_kỳ: _tk, tên_rút_gọn: _trg, ảnh_hiển_thị: _img, ...rest }) => rest
  );
  const blob = new Blob([JSON.stringify(cleanPayload, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  triggerDownload(blob, 'tulieu-d03-baovat-quoc-gia.json');
}

export function exportAsCSV(records: EnrichedArtifact[] = ARTIFACTS) {
  const headers: (keyof EnrichedArtifact)[] = [
    'mã_định_danh',
    'nhan_đề',
    'loại',
    'thời_kỳ',
    'người_tạo_ra',
    'niên_đại',
    'mô_tả',
    'ngôn_ngữ',
    'nơi_lưu_giữ_hiện_nay',
    'nơi_lưu_giữ_tại_thời_điểm_tư_liệu',
    'số_đăng_ký',
    'loại_bản_đang_hiển_thị',
    'tình_trạng_bản_gốc',
    'tệp_đính_kèm',
    'phiên_âm_dịch_nghĩa',
    'quan_hệ',
    'người_cho_phép_công_bố',
    'phạm_vi_được_phép',
    'phần_không_công_bố',
    'nguồn_tư_liệu',
    'mức_kiểm_chứng',
    'điểm_chưa_rõ',
  ];

  const escapeCsvCell = (val: string) => {
    const str = String(val ?? '');
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = [
    headers.join(','),
    ...records.map((item) => headers.map((h) => escapeCsvCell(item[h])).join(',')),
  ];

  // Include UTF-8 BOM so Microsoft Excel preserves Vietnamese diacritics
  const blob = new Blob(['\uFEFF' + rows.join('\r\n')], {
    type: 'text/csv;charset=utf-8',
  });
  triggerDownload(blob, 'tulieu-d03-baovat-quoc-gia.csv');
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
