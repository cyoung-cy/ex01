import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createBoard, getBoardById, updateBoard } from '../api/boardApi';
import type { Board } from '../types/board';
import { Save, X } from 'lucide-react';

export default function BoardForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<Board>({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchBoard(Number(id));
    }
  }, [id]);

  const fetchBoard = async (boardId: number) => {
    try {
      const data = await getBoardById(boardId);
      setFormData(data);
    } catch (err) {
      alert('게시글을 불러오는데 실패했습니다.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateBoard(Number(id), formData);
        navigate(`/board/${id}`);
      } else {
        await createBoard(formData);
        navigate('/');
      }
    } catch (err) {
      alert('저장에 실패했습니다.');
    }
  };

  if (loading) return <div className="text-center py-10">로딩 중...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">{isEditMode ? '게시글 수정' : '새 게시글 작성'}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="제목을 입력하세요"
          />
        </div>
        
        {!isEditMode && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">작성자</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="이름을 입력하세요"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link to={isEditMode ? `/board/${id}` : '/'} className="flex items-center gap-2 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium">
            <X size={18} /> 취소
          </Link>
          <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-sm">
            <Save size={18} /> {isEditMode ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
