import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, BookOpen, AlertCircle } from 'lucide-react';
import type { ChatMessage } from '../types/artifact';
import { ARTIFACTS } from '../data/artifacts';

interface AiChatViewProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
  onSelectArtifact: (id: string) => void;
}

const SUGGESTED_QUESTIONS = [
  'Những bảo vật nào hiện đang được lưu giữ tại Thành phố Hà Nội?',
  'So sánh niên đại và chất liệu của Trống đồng Ngọc Lũ và Thạp đồng Đào Đặng.',
  'Trong 15 bảo vật, những di sản nào được UNESCO công nhận là Di sản tư liệu?',
  'Tình trạng bản gốc và nguồn tư liệu của Bia Sùng Thiên Diên Linh hiện nay ra sao?',
];

export function AiChatView({
  initialPrompt,
  onClearInitialPrompt,
  onSelectArtifact,
}: AiChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      content:
        'Xin chào. Tôi là Trợ lý Tra cứu Tư liệu Đề tài D03. Mọi câu trả lời đều bám sát 100% dữ liệu từ 15 bản ghi trong tulieu.json và luôn đính kèm định danh chuẩn [Mã bản ghi, Nơi lưu giữ hiện nay, Loại bản]. Bạn muốn tìm hiểu về bảo vật hay thời kỳ lịch sử nào?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      setInput(initialPrompt);
      onClearInitialPrompt?.();
    }
  }, [initialPrompt, onClearInitialPrompt]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = updatedMessages
        .filter((m) => m.id !== 'welcome' && !m.isError)
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload.slice(0, -1),
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Không nhận được phản hồi hợp lệ từ máy chủ.');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error
          ? err.message
          : 'Đã xảy ra lỗi kết nối tới dịch vụ Gemini AI.';
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: errMsg,
          timestamp: new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        content:
          'Đã làm mới phiên tra cứu. Vui lòng đặt câu hỏi về 15 Bảo vật Quốc gia trong tệp tulieu.json.',
      },
    ]);
  };

  const extractReferencedIds = (content: string): string[] => {
    const matches = content.match(/D03-\d{5}/g);
    if (!matches) return [];
    const validIds = new Set(ARTIFACTS.map((a) => a.mã_định_danh));
    return Array.from(new Set(matches)).filter((id) => validIds.has(id));
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[#E5E0D8] pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-[#9A6B2F]">
          Trợ lý Tư liệu Bảo tàng · Gemini AI
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-[#0F1E36] sm:text-4xl">
          Hỏi đáp AI bám sát Tư liệu Gốc (tulieu.json)
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#57534E]">
          Kết nối máy chủ Gemini được cấu hình sẵn. Hệ thống bị ràng buộc chỉ trả lời dựa 100%
          trên 15 hồ sơ chuẩn hóa và luôn xuất kèm định danh{' '}
          <span className="font-mono text-xs text-[#0F1E36]">
            [Mã bản ghi, Nơi lưu giữ hiện nay, Loại bản]
          </span>
          .
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Sidebar: Grounding Spec & Suggestions */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-md border border-[#E5E0D8] bg-white p-5">
            <h2 className="font-serif text-lg font-semibold text-[#0F1E36]">
              Quy chuẩn Trả lời & Trích dẫn
            </h2>
            <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#57534E]">
              <li>
                <strong className="text-[#0F1E36]">Nguồn dữ liệu duy nhất:</strong> 15 bản ghi
                trong tệp <span className="font-mono">tulieu.json</span>.
              </li>
              <li>
                <strong className="text-[#0F1E36]">Cấu trúc định danh bắt buộc:</strong>{' '}
                <span className="font-mono text-[#9A6B2F]">
                  [Mã bản ghi, Nơi lưu giữ hiện nay, Loại bản]
                </span>
              </li>
              <li>
                <strong className="text-[#0F1E36]">Kết nối API:</strong> Được cấu hình sẵn trên
                máy chủ qua tuyến <span className="font-mono">/api/chat</span>.
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-[#E5E0D8] bg-white p-5">
            <h2 className="font-serif text-lg font-semibold text-[#0F1E36]">
              Câu hỏi Gợi ý
            </h2>
            <div className="mt-3 flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isLoading}
                  onClick={() => sendMessage(q)}
                  className="cursor-pointer rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-3.5 py-2.5 text-left text-xs leading-relaxed text-[#1C1917] transition-colors hover:border-[#9A6B2F] hover:bg-white disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Chat Area */}
        <div className="flex h-[600px] flex-col overflow-hidden rounded-md border border-[#E5E0D8] bg-white lg:col-span-8">
          <div className="flex items-center justify-between border-b border-[#E5E0D8] bg-[#F4EFE6] px-5 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#0F1E36]">
              <BookOpen className="h-4 w-4 text-[#9A6B2F]" aria-hidden="true" />
              <span>Phiên tra cứu 15 Bảo vật Quốc gia (D03)</span>
            </div>
            <button
              type="button"
              onClick={handleClearChat}
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#57534E] transition-colors hover:text-[#0F1E36]"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Làm mới</span>
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((msg) => {
              const referencedIds =
                msg.role === 'assistant' && !msg.isError
                  ? extractReferencedIds(msg.content)
                  : [];

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#0F1E36] text-white'
                        : msg.isError
                        ? 'border border-red-200 bg-red-50 text-red-900'
                        : 'border border-[#E5E0D8] bg-[#FBF9F5] text-[#1C1917]'
                    }`}
                  >
                    {msg.isError && (
                      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-800">
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Thông báo kết nối</span>
                      </div>
                    )}
                    {msg.content}

                    {referencedIds.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#E5E0D8] pt-2.5 text-xs">
                        <span className="text-[#57534E]">Mở hồ sơ chi tiết:</span>
                        {referencedIds.map((id) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => onSelectArtifact(id)}
                            className="cursor-pointer font-mono font-semibold text-[#0F1E36] underline decoration-[#9A6B2F] underline-offset-4 hover:text-[#9A6B2F]"
                          >
                            {id}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="mt-1 font-mono text-[11px] text-[#78716C]">
                    {msg.role === 'user' ? 'Bạn' : 'Gemini AI'} · {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start">
                <div className="rounded-md border border-[#E5E0D8] bg-[#FBF9F5] px-4 py-3 text-xs text-[#57534E]">
                  Đang đối chiếu 15 hồ sơ tư liệu trong tulieu.json...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="border-t border-[#E5E0D8] bg-[#FBF9F5] p-3.5"
          >
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Nhập câu hỏi về niên đại, nơi lưu giữ, tình trạng bảo vật..."
                aria-label="Nhập câu hỏi cho trợ lý AI"
                className="h-11 flex-1 rounded-md border border-[#E5E0D8] bg-white px-4 text-sm text-[#1C1917] placeholder:text-[#78716C] focus:border-[#0F1E36] focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-md bg-[#0F1E36] px-5 text-sm font-medium text-white transition-colors hover:bg-[#182C4E] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                <Send className="h-4 w-4 text-[#E7D5B8]" aria-hidden="true" />
                <span>Gửi</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
