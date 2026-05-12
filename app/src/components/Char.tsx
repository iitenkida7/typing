export default function Char({
  word,
  remains,
}: {
  word: string
  remains: string
}) {
  const typedLength = word.length - remains.length

  return (
    <div className="text-center mt-3">
      <p className="text-6xl font-mono tracking-widest">
        {word.split('').map((char, i) => {
          const display = char === ' ' ? '\u2423' : char
          if (i < typedLength) {
            return (
              <span key={i} className="text-green-400 opacity-50">
                {display}
              </span>
            )
          }
          if (i === typedLength) {
            return (
              <span
                key={i}
                className="text-yellow-400 animate-pulse inline-block scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)]"
              >
                {display}
              </span>
            )
          }
          return (
            <span key={i} className="text-gray-400">
              {display}
            </span>
          )
        })}
      </p>
    </div>
  )
}
