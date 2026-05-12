export default function Word({ ja, word }: { ja: string; word: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-semibold text-gray-800">
        {ja}
      </p>
      <p className="text-lg text-gray-500">
        {word}
      </p>
    </div>
  )
}
