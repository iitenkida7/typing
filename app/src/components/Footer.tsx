import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t text-center py-2 z-50">
      <div className="flex items-center justify-center gap-3">
        <p className="text-gray-600 text-sm">Typing</p>
        <Link to="/about" className="text-gray-400 hover:text-blue-500 text-xs transition-colors">
          保護者・先生の方へ
        </Link>
      </div>
    </footer>
  )
}
