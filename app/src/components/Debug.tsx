export default function Debug({
  pressKey,
  keyCode,
  missCnt,
}: {
  pressKey: string
  keyCode: number
  missCnt: number
}) {
  return (
    <div className="mt-8 text-sm text-gray-400 text-center">
      pressKey: {pressKey} / keyCode: {keyCode} / miss: {missCnt}
    </div>
  )
}
