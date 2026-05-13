interface StartScreenProps {
  lessonObj?: {
    description: string
    words: Array<{ word: string; ja: string }>
  }
  onStart: () => void
}

export default function StartScreen({ lessonObj, onStart }: StartScreenProps) {
  return (
    <div className="text-center mt-8 sm:mt-16 lg:mt-20">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-2">
          {lessonObj ? `「${lessonObj.description}」` : ''}
        </p>
        <p className="text-gray-400">
          {lessonObj ? `${lessonObj.words.length} ワード` : ''}
        </p>
      </div>
      <button
        onClick={onStart}
        className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl px-10 py-4 sm:px-14 sm:py-5 md:px-16 md:py-6 lg:px-20 lg:py-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-bounce"
      >
        スタート！
      </button>
      <p className="mt-4 text-gray-400 text-sm lg:text-base">Space または Enter でスタート</p>
    </div>
  )
}
