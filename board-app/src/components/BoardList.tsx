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

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">게시판</h1>
        <Link to="/write" className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          <PlusCircle size={20} /> 새 글 작성
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-700">번호</th>
              <th className="p-4 font-semibold text-slate-700">제목</th>
              <th className="p-4 font-semibold text-slate-700">작성자</th>
              <th className="p-4 font-semibold text-slate-700">작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">게시글이 없습니다.</td>
              </tr>
            ) : (
              boards.map((board) => (
                <tr key={board.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{board.id}</td>
                  <td className="p-4">
                    <Link to={`/board/${board.id}`} className="text-blue-500 hover:underline font-medium">
                      {board.title}
                    </Link>
                  </td>
                  <td className="p-4 text-slate-600">{board.author}</td>
                  <td className="p-4 text-slate-500 text-sm">
                    {board.created_at ? new Date(board.created_at).toLocaleDateString() : '-'}
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
