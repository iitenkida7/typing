const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
]

export default function Keyboard({ targetChr }: { targetChr: string }) {
  return (
    <div className="mt-6 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-2 mb-2">
          {row.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center justify-center w-16 h-16 text-2xl font-mono font-bold rounded-lg border-b-4 ${
                targetChr === key
                  ? 'bg-red-500 text-white border-red-700'
                  : 'bg-gray-800 text-white border-gray-600'
              }`}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <span
          className={`inline-flex items-center justify-center px-32 h-16 text-2xl font-mono font-bold rounded-lg border-b-4 ${
            targetChr === ' '
              ? 'bg-red-500 text-white border-red-700'
              : 'bg-gray-800 text-white border-gray-600'
          }`}
        >
          SPACE
        </span>
      </div>
    </div>
  )
}
