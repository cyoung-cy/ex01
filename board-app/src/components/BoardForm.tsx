import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createBoard, getBoardById, updateBoard } from '../api/boardApi';
import { ChevronLeft } from 'lucide-react';

export default function BoardForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchBoard(Number(id));
    }
  }, [isEdit, id]);

  const fetchBoard = async (boardId: number) => {
    try {
      const data = await getBoardById(boardId);
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    } catch (err) {
      alert('게시글을 불러오는데 실패했습니다.');
      navigate('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !title.trim() || !content.trim() || !author.trim()) return;

    setIsSubmitting(true);
    try {
      if (isEdit && id) {
        await updateBoard(Number(id), { title, content, author });
      } else {
        await createBoard({ title, content, author });
      }
      navigate('/');
    } catch (err) {
      alert('저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[700px] mx-auto px-5 py-8">
      {/* 상단 네비바 */}
      <div className="flex items-center mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-[#4e5968] hover:bg-[#e5e8eb] rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-[18px] font-bold text-[#191f28] -ml-8">
          {isEdit ? '글 수정하기' : '새 글 쓰기'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#f2f4f6] space-y-10">
          {/* 작성자 입력 */}
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#8b95a1] ml-1">작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-[20px] font-bold text-[#191f28] placeholder:text-[#adb5bd] border-none focus:ring-0 p-0"
              placeholder="이름을 입력해 주세요"
              required
              disabled={isEdit}
            />
            <div className="h-[1px] bg-[#f2f4f6]"></div>
          </div>

          {/* 제목 입력 */}
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#8b95a1] ml-1">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-[24px] font-bold text-[#191f28] placeholder:text-[#adb5bd] border-none focus:ring-0 p-0"
              placeholder="제목을 입력해 주세요"
              required
            />
            <div className="h-[1px] bg-[#f2f4f6]"></div>
          </div>

          {/* 내용 입력 */}
          <div className="space-y-3">
            <label className="text-[14px] font-bold text-[#8b95a1] ml-1">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-[18px] text-[#333d4b] placeholder:text-[#adb5bd] border-none focus:ring-0 p-0 min-h-[300px] resize-none leading-relaxed"
              placeholder="내용을 입력해 주세요"
              required
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#3182f6] disabled:bg-[#d1d6db] text-white py-5 rounded-xl text-[18px] font-bold shadow-lg shadow-blue-50 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? '저장 중...' : (isEdit ? '수정 완료' : '등록하기')}
          </button>
          <Link 
            to="/" 
            className="w-full bg-transparent text-[#8b95a1] py-4 rounded-xl text-[16px] font-bold text-center"
          >
            취소하기
          </Link>
        </div>
      </form>
    </div>
  );
}
