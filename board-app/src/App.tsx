import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './components/BoardList';
import BoardDetail from './components/BoardDetail';
import BoardForm from './components/BoardForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">AI 게시판 프로젝트</h1>
            <p className="text-slate-500 mt-2">Vite + React + Tailwind CSS</p>
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<BoardList />} />
              <Route path="/board/:id" element={<BoardDetail />} />
              <Route path="/write" element={<BoardForm />} />
              <Route path="/edit/:id" element={<BoardForm />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
