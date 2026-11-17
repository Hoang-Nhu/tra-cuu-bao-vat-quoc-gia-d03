import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Load canonical tulieu.json once on startup for strict grounding
const tulieuPath = path.resolve(__dirname, 'src', 'data', 'tulieu.json');
const tulieuRaw = fs.readFileSync(tulieuPath, 'utf-8');

const SYSTEM_INSTRUCTION = `Bạn là Trợ lý Tra cứu Tư liệu Bảo tàng Số thuộc đề tài "D03: Bảo vật quốc gia theo thời kỳ lịch sử" (FPT Polytechnic x IMTA TECH).

NGUYÊN TẮC BẮT BUỘC (TUÂN THỦ 100%):
1. CHỈ được trả lời dựa hoàn toàn trên dữ liệu JSON trong tệp tulieu.json được cung cấp dưới đây. TUYỆT ĐỐI KHÔNG sử dụng kiến thức bên ngoài, không suy đoán, không bịa thêm chi tiết không có trong JSON.
2. Nếu câu hỏi đề cập tới bảo vật, sự kiện hoặc chi tiết KHÔNG có trong 15 bản ghi của tulieu.json, hãy trả lời rõ ràng: "Thông tin này không có trong bộ dữ liệu 15 bảo vật D03 (tulieu.json)." và chỉ gợi ý các bảo vật hiện có trong dữ liệu.
3. MỌI câu trả lời có nhắc đến hoặc trích xuất thông tin từ bảo vật nào BẮT BUỘC phải kèm theo định danh chuẩn xác theo đúng cấu trúc sau ở cuối câu hoặc đoạn tương ứng:
   [Mã bản ghi, Nơi lưu giữ hiện nay, Loại bản đang hiển thị]
   Ví dụ: [D03-00001, Bảo tàng Lịch sử Quốc gia, Quận Hoàn Kiếm, Thành phố Hà Nội, Bản số của bản gốc]
4. Trả lời bằng tiếng Việt chuẩn mực, rõ ràng, súc tích, đúng ngữ pháp và dấu thanh.

DỮ LIỆU GỐC tulieu.json (15 BẢN GHI):
${tulieuRaw}`;

const app = express();
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        'Chưa tìm thấy biến môi trường GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra cấu hình Secrets.',
    });
    return;
  }

  const { message, history } = req.body as {
    message?: string;
    history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  };

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Nội dung câu hỏi không được để trống.' });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const formattedHistory = Array.isArray(history)
      ? history
          .slice(-8)
          .filter((item) => item && typeof item.content === 'string')
          .map((item) => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.content }],
          }))
      : [];

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: [
        ...formattedHistory,
        {
          role: 'user',
          parts: [{ text: message.trim() }],
        },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const replyText = response.text?.trim();
    if (!replyText) {
      res.status(502).json({
        error: 'Mô hình AI không trả về nội dung phản hồi. Vui lòng thử lại.',
      });
      return;
    }

    res.json({ reply: replyText });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Lỗi không xác định khi gọi Gemini API.';
    console.error('Gemini API error:', errorMessage);
    res.status(500).json({
      error: `Không thể kết nối tới Gemini API: ${errorMessage}`,
    });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
