export default function Char({ remains }: { remains: string }) {
  return (
    <div className="text-center mt-6">
      <p className="text-8xl font-mono tracking-widest text-gray-900">
        {remains.replace(' ', '␣')}
      </p>
    </div>
  )
}
