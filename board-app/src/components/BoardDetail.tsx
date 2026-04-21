import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoardById, deleteBoard } from '../api/boardApi';
import type { Board } from '../types/board';
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react';

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchBoard(Number(id));
    }
  }, [id]);

  const fetchBoard = async (boardId: number) => {
    try {
      const data = await getBoardById(boardId);
      setBoard(data);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await deleteBoard(Number(id));
        navigate('/');
      } catch (err) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium">게시글을 불러오는 중...</p>
    </div>
  );

  if (error || !board) return (
    <div className="max-w-md mx-auto mt-20 p-8 glass rounded-3xl text-center shadow-xl">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">게시글이 없습니다</h2>
      <p className="text-slate-600 mb-6">{error || '요청하신 게시글을 찾을 수 없습니다.'}</p>
      <Link to="/" className="inline-block bg-slate-800 text-white px-6 py-2 rounded-xl hover:bg-slate-900 transition-colors">
        목록으로 돌아가기
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-20 px-4">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
          <ArrowLeft size={18} />
        </div>
        목록으로 돌아가기
      </Link>

      <article className="glass rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden">
        <header className="p-10 md:p-14 bg-white/40 border-b border-white/40">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
            {board.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl shadow-sm">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User size={16} />
              </div>
              <span className="font-bold text-slate-700">{board.author}</span>
            </div>
            
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-2xl shadow-sm">
              <Calendar size={18} className="text-slate-400" />
              <span className="font-medium">
                {board.created_at && new Date(board.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </header>
        
        <div className="p-10 md:p-14 text-slate-700 text-xl leading-relaxed whitespace-pre-wrap min-h-[300px]">
          {board.content}
        </div>

        <footer className="p-10 md:p-14 bg-slate-50/30 flex justify-end gap-4 border-t border-white/40">
          <Link 
            to={`/edit/${board.id}`} 
            className="flex items-center gap-2 px-8 py-4 bg-white hover:bg-indigo-50 text-slate-700 font-bold rounded-2xl shadow-sm border border-slate-100 transition-all hover:-translate-y-1"
          >
            <Edit size={20} className="text-indigo-500" /> 수정하기
          </Link>
          <button 
            onClick={handleDelete} 
            className="flex items-center gap-2 px-8 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl shadow-sm border border-red-100 transition-all hover:-translate-y-1"
          >
            <Trash2 size={20} /> 삭제하기
          </button>
        </footer>
      </article>
    </div>
  );
}
