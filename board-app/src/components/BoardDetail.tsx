import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoardById, deleteBoard } from '../api/boardApi';
import type { Board } from '../types/board';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

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

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error || !board) return <div className="text-center py-10 text-red-500">{error || '게시글이 없습니다.'}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800">{board.title}</h1>
        <div className="text-sm text-slate-500 text-right">
          <p>작성자: <span className="font-medium text-slate-700">{board.author}</span></p>
          <p>{board.created_at && new Date(board.created_at).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="min-h-[200px] text-slate-700 whitespace-pre-wrap leading-relaxed mb-8">
        {board.content}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} /> 목록으로
        </Link>
        <div className="flex gap-3">
          <Link to={`/edit/${board.id}`} className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Edit size={18} /> 수정
          </Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
            <Trash2 size={18} /> 삭제
          </button>
        </div>
      </div>
    </div>
  );
}
