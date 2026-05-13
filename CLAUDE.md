# CLAUDE.md

## プロジェクト概要

小学生向け英語タイピング練習Webアプリ。英語のスペルをタイピングしながら英語表現を学ぶサービス。

- 本番URL: https://typing.iitenkida7.workers.dev/
- リポジトリ: https://github.com/iitenkida7/typing

## 技術スタック

- **ランタイム**: Bun (Docker経由で使用)
- **フレームワーク**: React 19 + TypeScript 5
- **ビルドツール**: Vite 8
- **スタイリング**: Tailwind CSS v4
- **ルーティング**: React Router DOM v7
- **テスト**: Vitest 3 + Testing Library 16 + jsdom
- **デプロイ**: Cloudflare Workers (Wrangler)
- **CI/CD**: GitHub Actions (test.yml / deploy.yml)
- **API/サーバー**: Hono (Cloudflare Workers上)

## 開発環境

### Docker必須

開発は必ずDockerを経由して行うこと。直接ホストマシンでbunやnpmコマンドを実行しない。

```bash
make install   # 依存関係インストール
make up        # 開発サーバー起動 (バックグラウンド)
make dev       # 開発サーバー起動 (フォアグラウンド)
make down      # コンテナ停止
make test      # テスト実行
make build     # ビルド
make logs      # ログ確認
```

### Docker構成

- `docker-compose.yml`: bunサービス定義
- `docker/node/Dockerfile`: `oven/bun:latest` ベースイメージ
- ポート: 5173
- ボリューム: `./app:/app`

## ディレクトリ構成

```
typing/
  CLAUDE.md
  Makefile              # Docker経由のコマンド集
  docker-compose.yml
  docker/node/Dockerfile
  app/
    package.json
    bun.lock
    vite.config.ts
    vitest.config.ts     # テスト設定 (vite.configとは分離)
    tsconfig.json
    wrangler.toml        # Cloudflare Workers設定
    src/
      main.tsx           # エントリーポイント
      App.tsx            # ルーティング定義
      index.css          # グローバルCSS (Tailwind)
      worker.ts          # Cloudflare Workersエントリー (Hono)
      env.d.ts
      pages/
        Home.tsx         # ホーム (レッスン一覧)
        Lesson.tsx       # レッスン画面
        History.tsx      # 履歴画面
        lesson/
          StartScreen.tsx
          PlayingScreen.tsx
          ResultScreen.tsx
      components/
        Layout.tsx, Header.tsx, Footer.tsx
        LessonCard.tsx, Char.tsx, Word.tsx
        Keyboard.tsx, Images.tsx, Debug.tsx
      hooks/
        useLessonReducer.ts   # レッスン状態管理 (useReducer)
      lib/
        scores.ts        # スコア計算ロジック
      data/
        lesson.json      # レッスンデータ
      test/
        setup.ts
```

## コーディング規約

- 言語: TypeScript (strict)
- パッケージマネージャー: Bun (package-lock.jsonは使わない、bun.lockを使用)
- コンポーネント: 関数コンポーネント + Hooks
- 状態管理: useReducer パターン (useLessonReducer)
- テストファイル: `*.test.ts` / `*.test.tsx` (同一ディレクトリに配置)
- コミットメッセージ: 英語、Conventional Commits形式 (feat/fix/chore/refactor等)
