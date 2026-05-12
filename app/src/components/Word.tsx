export default function Word({ ja, word }: { ja: string; word: string }) {
  return (
    <div className="text-center mt-4">
      <p className="text-4xl font-semibold text-gray-800">
        {ja} / {word}
      </p>
    </div>
  )
}
