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
    <div className="mt-2 sm:mt-4 lg:mt-6 select-none">
      {ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-0.5 sm:gap-1 lg:gap-1.5 xl:gap-2 mb-0.5 sm:mb-1 lg:mb-1.5 xl:mb-2">
          {row.map((key) => (
            <span
              key={key}
              className={`inline-flex items-center justify-center w-7 h-7 text-xs sm:w-9 sm:h-9 sm:text-sm md:w-11 md:h-11 md:text-base lg:w-14 lg:h-14 lg:text-lg xl:w-16 xl:h-16 xl:text-xl font-mono font-bold rounded-md lg:rounded-lg border-b-2 sm:border-b-3 lg:border-b-4 transition-all duration-100 ${getKeyClass(key)}`}
            >
              {key}
            </span>
          ))}
        </div>
      ))}
      <div className="flex justify-center mt-0.5 sm:mt-1 lg:mt-1.5 xl:mt-2">
        <span
          className={`inline-flex items-center justify-center px-12 sm:px-16 md:px-20 lg:px-28 xl:px-36 h-7 sm:h-9 md:h-11 lg:h-14 xl:h-16 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-mono font-bold rounded-md lg:rounded-lg border-b-2 sm:border-b-3 lg:border-b-4 transition-all duration-100 ${getKeyClass(' ')}`}
        >
          SPACE
        </span>
      </div>
    </div>
  )
}
