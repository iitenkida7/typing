interface StartScreenProps {
  lessonObj?: {
    description: string
    words: Array<{ word: string; ja: string }>
  }
  onStart: () => void
}

export default function StartScreen({ lessonObj, onStart }: StartScreenProps) {
  return (
    <div className="text-center mt-16">
      <div className="mb-8">
        <p className="text-xl text-gray-600 mb-2">
          {lessonObj ? `「${lessonObj.description}」` : ''}
        </p>
        <p className="text-gray-400">
          {lessonObj ? `${lessonObj.words.length} ワード` : ''}
        </p>
      </div>
      <button
        onClick={onStart}
        className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-3xl px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-bounce"
      >
        スタート！
      </button>
      <p className="mt-4 text-gray-400 text-sm">Space または Enter でスタート</p>
    </div>
  )
}
