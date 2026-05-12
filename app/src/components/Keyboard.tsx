const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'],
]

export default function Keyboard({ targetChr }: { targetChr: string }) {
  return (
    <div className="mt-6 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {row.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center justify-center w-10 h-10 text-base font-mono font-bold rounded border-b-4 ${
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
      <div className="flex justify-center mt-1">
        <span
          className={`inline-flex items-center justify-center px-16 h-10 text-base font-mono font-bold rounded border-b-4 ${
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
