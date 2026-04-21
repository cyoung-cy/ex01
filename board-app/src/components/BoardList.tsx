import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoards } from '../api/boardApi';
import type { Board } from '../types/board';
import { Plus } from 'lucide-react';

export default function BoardList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const data = await getBoards();
      setBoards(data);
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-8 h-8 border-3 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl text-center shadow-sm">
      <p className="text-[#f04452] font-semibold mb-2">오류가 발생했어요</p>
      <p className="text-[#4e5968] mb-6">{error}</p>
      <button onClick={fetchBoards} className="bg-[#3182f6] text-white px-6 py-3 rounded-xl font-bold">
        다시 시도하기
      </button>
    </div>
  );

  return (
    <div className="max-w-[700px] mx-auto px-5 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[26px] font-bold text-[#191f28]">게시판</h1>
        <Link 
          to="/write" 
          className="flex items-center gap-1 bg-[#3182f6] text-white px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} /> 글쓰기
        </Link>
      </div>
      
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f2f4f6]">
        {boards.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#8b95a1] text-lg">아직 게시글이 없어요.</p>
            <Link to="/write" className="text-[#3182f6] font-bold mt-2 inline-block">첫 글 쓰러 가기</Link>
          </div>
        ) : (
          <div className="divide-y divide-[#f2f4f6]">
            {boards.map((board) => (
              <Link 
                key={board.id} 
                to={`/board/${board.id}`} 
                className="block p-6 hover:bg-[#f9fafb] transition-colors group"
              >
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[19px] font-bold text-[#191f28] group-hover:text-[#3182f6] transition-colors leading-snug">
                    {board.title}
                  </h2>
                  <div className="flex items-center gap-3 text-[14px] text-[#8b95a1]">
                    <span className="font-semibold text-[#4e5968]">{board.author}</span>
                    <span className="w-1 h-1 bg-[#e5e8eb] rounded-full"></span>
                    <span>
                      {board.created_at ? new Date(board.created_at).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      }) : '-'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <p className="text-center text-[#8b95a1] text-sm mt-10">
        전체 {boards.length}개의 글이 있습니다.
      </p>
    </div>
  );
}
