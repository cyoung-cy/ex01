import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoards } from '../api/boardApi';
import type { Board } from '../types/board';
import { PlusCircle } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium">소중한 글들을 불러오는 중...</p>
    </div>
  );
  
  if (error) return (
    <div className="max-w-md mx-auto mt-20 p-8 glass rounded-3xl text-center shadow-xl border-red-100">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">오류가 발생했습니다</h2>
      <p className="text-slate-600 mb-6">{error}</p>
      <button onClick={fetchBoards} className="bg-slate-800 text-white px-6 py-2 rounded-xl hover:bg-slate-900 transition-colors">
        다시 시도하기
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3">커뮤니티</h1>
          <p className="text-slate-500 text-lg">생각을 나누고 함께 성장하는 공간입니다.</p>
        </div>
        <Link 
          to="/write" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1 active:scale-95"
        >
          <PlusCircle size={22} /> 새 글 작성
        </Link>
      </div>
      
      <div className="glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/50">
              <th className="p-6 font-bold text-slate-400 text-xs uppercase tracking-[0.2em]">No.</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider">제목</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider text-center">작성자</th>
              <th className="p-6 font-bold text-slate-800 text-sm uppercase tracking-wider text-right">작성일</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {boards.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-24 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100">
                      <PlusCircle size={32} className="text-slate-300" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-slate-800">아직 게시글이 없습니다</p>
                      <p className="text-slate-400">첫 번째 이야기를 들려주세요!</p>
                    </div>
                    <Link to="/write" className="mt-4 text-indigo-600 font-bold hover:underline">글 쓰러 가기 &rarr;</Link>
                  </div>
                </td>
              </tr>
            ) : (
              boards.map((board) => (
                <tr key={board.id} className="hover:bg-indigo-50/40 transition-all group">
                  <td className="p-6 text-slate-300 font-mono text-sm">{board.id}</td>
                  <td className="p-6">
                    <Link to={`/board/${board.id}`} className="text-slate-800 group-hover:text-indigo-600 font-bold text-xl transition-colors block">
                      {board.title}
                    </Link>
                  </td>
                  <td className="p-6 text-center">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl bg-slate-100/80 text-slate-600 text-sm font-semibold group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                      {board.author}
                    </span>
                  </td>
                  <td className="p-6 text-right text-slate-400 text-sm font-medium">
                    {board.created_at ? new Date(board.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
