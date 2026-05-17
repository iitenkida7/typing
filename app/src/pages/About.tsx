import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">
        保護者・先生の方へ
      </h2>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-blue-600 mb-3">コンセプト</h3>
        <p className="text-gray-700 leading-relaxed">
          「えいごタイピング練習」は、小学生のお子さまが<strong>英語のスペルを指で覚える</strong>ことを目的としたWebアプリです。
          キーボードで英単語をタイピングすることで、目・耳・指の3つの感覚を使いながら自然に英語が身につきます。
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-blue-600 mb-3">大切にしていること</h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="text-2xl shrink-0">1.</span>
            <div>
              <p className="font-bold text-gray-800">まず「楽しい」から始める</p>
              <p className="text-gray-600 text-sm mt-1">
                難しい文法や長文ではなく、身近な英単語からスタート。「できた！」の積み重ねが学ぶ意欲につながります。
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-2xl shrink-0">2.</span>
            <div>
              <p className="font-bold text-gray-800">タイピングと英語を同時に学ぶ</p>
              <p className="text-gray-600 text-sm mt-1">
                これからの時代、キーボード操作は必須スキルです。英語学習とタイピング練習を組み合わせることで、限られた時間を有効に使えます。
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-2xl shrink-0">3.</span>
            <div>
              <p className="font-bold text-gray-800">くり返しで定着させる</p>
              <p className="text-gray-600 text-sm mt-1">
                レッスンは何度でもチャレンジできます。パーフェクトを目指す過程で、スペルが自然と記憶に残ります。
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-2xl shrink-0">4.</span>
            <div>
              <p className="font-bold text-gray-800">安心・安全に使える</p>
              <p className="text-gray-600 text-sm mt-1">
                アカウント登録は不要で、完全無料です。広告もありません。お子さまだけでも安心してお使いいただけます。
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-bold text-blue-600 mb-3">こんな場面で使えます</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-bold text-gray-800 text-sm">家庭学習に</p>
            <p className="text-gray-600 text-xs mt-1">宿題の合間や休日のちょっとした時間に。1レッスン数分で取り組めます。</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-bold text-gray-800 text-sm">授業の導入に</p>
            <p className="text-gray-600 text-xs mt-1">英語の授業やPC授業のウォーミングアップとしてもお使いいただけます。</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-bold text-gray-800 text-sm">タイピング練習に</p>
            <p className="text-gray-600 text-xs mt-1">ローマ字入力の前段階として、アルファベットの配置を覚えるのに最適です。</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="font-bold text-gray-800 text-sm">英検・テスト対策に</p>
            <p className="text-gray-600 text-xs mt-1">スペルを正確に覚えることで、ライティングの基礎力が身につきます。</p>
          </div>
        </div>
      </section>

      <div className="text-center mt-12 mb-8">
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow transition-colors"
        >
          レッスンをはじめる
        </Link>
      </div>
    </div>
  )
}
