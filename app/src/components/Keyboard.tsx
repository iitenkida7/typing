const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
]

export default function Keyboard({
  targetChr,
  lastPressedKey,
  shakeKey,
}: {
  targetChr: string
  lastPressedKey: string
  shakeKey: boolean
}) {
  const getKeyClass = (key: string) => {
    if (targetChr === key) {
      return 'bg-red-500 text-white border-red-700 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.6)]'
    }
    return 'bg-gray-800 text-white border-gray-600'
  }

  return (
    <div className="mt-4 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center justify-center w-11 h-11 text-base font-mono font-bold rounded-md border-b-3 transition-all duration-100 ${getKeyClass(key)}`}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-1">
        <span
          className={`inline-flex items-center justify-center px-20 h-11 text-base font-mono font-bold rounded-md border-b-3 transition-all duration-100 ${getKeyClass(' ')}`}
        >
          SPACE
        </span>
      </div>
    </div>
  )
}
