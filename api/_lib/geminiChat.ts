import { GoogleGenAI } from '@google/genai';
import tulieuData from '../../src/data/tulieu.json' with { type: 'json' };

const tulieuRaw = JSON.stringify(tulieuData, null, 2);

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

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatHandlerResult {
  status: number;
  body: { reply?: string; error?: string };
}

function resolveGeminiApiKeys(): string[] {
  const candidates = [process.env.GEMINI_API_KEY, process.env.API_KEY_CHATBOT]
    .map((val) => (val || '').trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
  return Array.from(new Set(candidates));
}

function extractUpstreamStatus(err: unknown): number {
  if (err && typeof err === 'object') {
    const record = err as Record<string, unknown>;
    if (typeof record.status === 'number' && record.status >= 400 && record.status < 600) {
      return record.status;
    }
  }
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes('"code":401') || msg.includes('UNAUTHENTICATED')) return 401;
  if (msg.includes('"code":403') || msg.includes('PERMISSION_DENIED')) return 403;
  if (msg.includes('"code":404') || msg.includes('NOT_FOUND')) return 404;
  if (msg.includes('"code":429') || msg.includes('RESOURCE_EXHAUSTED')) return 429;
  if (msg.includes('"code":503') || msg.includes('UNAVAILABLE')) return 503;
  return 500;
}

export async function handleGeminiChat(payload: {
  message?: unknown;
  history?: unknown;
}): Promise<ChatHandlerResult> {
  const apiKeys = resolveGeminiApiKeys();
  if (apiKeys.length === 0) {
    return {
      status: 500,
      body: {
        error:
          'Chưa tìm thấy biến môi trường GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra cấu hình Secrets (AI Studio) hoặc Environment Variables (Vercel).',
      },
    };
  }

  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  if (!message) {
    return {
      status: 400,
      body: { error: 'Nội dung câu hỏi không được để trống.' },
    };
  }

  const historyInput = Array.isArray(payload.history)
    ? (payload.history as ChatHistoryItem[])
    : [];

  const formattedHistory = historyInput
    .slice(-8)
    .filter((item) => item && typeof item.content === 'string')
    .map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.content }],
    }));

  const modelCandidates = Array.from(
    new Set(
      [
        process.env.GEMINI_MODEL?.trim(),
        'gemini-4-hydrogen',
        'gemini-3.1-flash-lite',
      ].filter((m): m is string => Boolean(m))
    )
  );
  let lastError: unknown = null;

  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let authFailed = false;
    for (let mIdx = 0; mIdx < modelCandidates.length; mIdx++) {
      const modelName = modelCandidates[mIdx];
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            ...formattedHistory,
            {
              role: 'user',
              parts: [{ text: message }],
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });

        const replyText = response.text?.trim();
        if (!replyText) {
          return {
            status: 502,
            body: {
              error: 'Mô hình AI không trả về nội dung phản hồi. Vui lòng thử lại.',
            },
          };
        }

        return {
          status: 200,
          body: { reply: replyText },
        };
      } catch (err: unknown) {
        lastError = err;
        const status = extractUpstreamStatus(err);
        if (status === 401 || status === 403) {
          authFailed = true;
          break;
        }
        const hasNextModel = mIdx < modelCandidates.length - 1;
        if ((status === 404 || status === 503 || status === 429) && hasNextModel) {
          continue;
        }
        break;
      }
    }

    if (authFailed && i < apiKeys.length - 1) {
      continue;
    }
    break;
  }

  const errorMessage =
    lastError instanceof Error ? lastError.message : 'Lỗi không xác định khi gọi Gemini API.';
  const status = extractUpstreamStatus(lastError);
  console.error('Gemini API error:', errorMessage);

  if (status === 401 || errorMessage.includes('ACCESS_TOKEN_TYPE_UNSUPPORTED')) {
    return {
      status: 401,
      body: {
        error:
          'GEMINI_API_KEY hiện tại không hợp lệ hoặc bị giới hạn API trên Google Cloud (401 ACCESS_TOKEN_TYPE_UNSUPPORTED). Vui lòng kiểm tra khóa trong Settings > Secrets (AI Studio) hoặc Environment Variables (Vercel) và đảm bảo khóa được bật quyền Generative Language API.',
      },
    };
  }

  if (status === 403) {
    return {
      status: 403,
      body: {
        error:
          'GEMINI_API_KEY không có quyền truy cập dịch vụ Generative Language API (403 PERMISSION_DENIED). Vui lòng kiểm tra quyền API key trên Google Cloud / AI Studio.',
      },
    };
  }

  return {
    status,
    body: {
      error: `Không thể kết nối tới Gemini API: ${errorMessage}`,
    },
  };
}
