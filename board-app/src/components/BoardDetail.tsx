import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoardById, deleteBoard } from '../api/boardApi';
import type { Board } from '../types/board';
import { ChevronLeft, Edit2 } from 'lucide-react';

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
    if (window.confirm('정말로 이 글을 삭제할까요?')) {
      try {
        await deleteBoard(Number(id));
        navigate('/');
      } catch (err) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-8 h-8 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error || !board) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl text-center shadow-sm">
      <p className="text-[#f04452] font-semibold mb-2">글을 찾을 수 없어요</p>
      <Link to="/" className="text-[#3182f6] font-bold mt-4 inline-block">목록으로 돌아가기</Link>
    </div>
  );

  return (
    <div className="max-w-[700px] mx-auto px-5 py-8">
      {/* 상단 네비바 */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/')}
          className="p-2 -ml-2 text-[#4e5968] hover:bg-[#e5e8eb] rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <Link 
          to={`/edit/${board.id}`}
          className="flex items-center gap-1.5 text-[#3182f6] font-bold px-4 py-2 hover:bg-blue-50 rounded-xl transition-colors"
        >
          <Edit2 size={18} /> 수정
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 border border-[#f2f4f6]">
        <div className="p-8 md:p-12">
          <header className="mb-10">
            <h1 className="text-[28px] md:text-[34px] font-bold text-[#191f28] leading-tight mb-6">
              {board.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#8b95a1] font-bold">
                {board.author[0]}
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#4e5968]">{board.author}</p>
                <p className="text-[14px] text-[#8b95a1]">
                  {board.created_at && new Date(board.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </header>
          
          <div className="text-[18px] md:text-[20px] text-[#333d4b] leading-[1.6] whitespace-pre-wrap min-h-[250px]">
            {board.content}
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="flex flex-col gap-3 mt-6">
        <button 
          onClick={handleDelete}
          className="w-full bg-white text-[#f04452] py-4 rounded-xl font-bold text-center border border-[#f2f4f6] hover:bg-[#fff0f0] transition-colors"
        >
          이 글 삭제하기
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#f2f4f6] text-[#4e5968] py-4 rounded-xl font-bold transition-all active:scale-95"
        >
          목록으로 돌아가기
        </button>
      </div>
    </div>
  );
}
