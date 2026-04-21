import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBoard, getBoardById, updateBoard } from '../api/boardApi';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    if (isSubmitting) return;

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
    <div className="max-w-4xl mx-auto mt-12 mb-20 px-4">
      <Link 
        to={isEdit ? `/board/${id}` : "/"} 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
          <ArrowLeft size={18} />
        </div>
        취소하고 돌아가기
      </Link>

      <div className="glass rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden">
        <header className="p-10 md:p-14 bg-white/40 border-b border-white/40">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {isEdit ? '게시글 수정하기' : '새로운 이야기 작성'}
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            {isEdit ? '수정하고 싶은 내용을 입력해 주세요.' : '멋진 소식을 커뮤니티에 공유해 보세요.'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-8">
          <div className="space-y-3">
            <label htmlFor="author" className="block text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">
              작성자
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-lg font-semibold text-slate-800 placeholder:text-slate-300"
              placeholder="당신의 이름을 입력해 주세요"
              required
              disabled={isEdit}
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="title" className="block text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-xl font-bold text-slate-800 placeholder:text-slate-300"
              placeholder="전달하고 싶은 핵심 제목을 적어주세요"
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="content" className="block text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-6 py-4 bg-white/60 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-lg min-h-[350px] text-slate-700 placeholder:text-slate-300 resize-none leading-relaxed"
              placeholder="공유하고 싶은 상세한 내용을 자유롭게 작성해 보세요..."
              required
            />
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isEdit ? <CheckCircle size={24} /> : <Send size={24} />}
                  {isEdit ? '수정 완료' : '게시하기'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
