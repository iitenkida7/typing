import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lesson from './pages/Lesson'
import History from './pages/History'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="text-center mt-16">
      <p className="text-6xl mb-4">😵</p>
      <p className="text-2xl font-bold text-gray-700 mb-2">ページがみつかりません</p>
      <p className="text-gray-400 mb-8">おさがしのページはありません</p>
      <button
        onClick={() => navigate('/')}
        className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        ホームにもどる
      </button>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
