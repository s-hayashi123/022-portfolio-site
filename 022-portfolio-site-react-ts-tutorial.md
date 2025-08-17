# 【React & TypeScript】ポートフォリオサイト(SSG)で作る！ポートフォリオサイト開発チュートリアル (022)

## 導入 (The "Why")

こんにちは！このチュートリアルでは、Next.jsの静的サイト生成（SSG）機能を使って、モダンで超高速なポートフォリオサイトを構築します。これまでの学習の成果を世界に発信する、あなただけのオリジナルなショーケースを作り上げましょう！

**完成形のイメージ:**
(ここに完成したポートフォリオサイトのスクリーンショットやGIFアニメーションを挿入)

このチュートリアルを終える頃には、あなたはただのウェブサイトを作れるだけでなく、Next.jsのパワフルな機能（App Router, SSG, 画像最適化など）を使いこなし、パフォーマンスとメンテナンス性に優れたWebアプリケーションを設計・開発できるスキルが身についているはずです。

## 環境構築

このプロジェクトでは、以下の技術を使用します。

*   **Next.js (App Router)**
*   **TypeScript**
*   **Tailwind CSS**
*   **shadcn/ui (推奨)**

それぞれの公式サイトのドキュメントを参考に、あなたの開発環境をセットアップしてください。公式ドキュメントを読むことは、最新の情報をキャッチアップし、自走するエンジニアになるための重要なスキルです。

*   [Next.js](https://nextjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [shadcn/ui](https://ui.shadcn.com/)

## 【最重要】超詳細なステップバイステップ開発手順

### Step 1: このステップのゴールを明確に
Next.jsプロジェクトの初期セットアップを行います。

#### The How: 具体的なコードと手順
ターミナルで以下のコマンドを実行し、Next.jsプロジェクトを作成します。

```bash
npx create-next-app@latest 022-portfolio-site --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
`create-next-app`はNext.jsプロジェクトの雛形を自動で生成してくれる便利なCLIツールです。各オプションは以下の設定を有効にしています。
*   `--typescript`: TypeScriptを導入します。
*   `--eslint`: コードの品質を保つためのリンター、ESLintを導入します。
*   `--tailwind`: 人気のCSSフレームワーク、Tailwind CSSを導入します。
*   `--src-dir`: ソースコードを`src`ディレクトリにまとめる構成にします。
*   `--app`: 最新のApp Routerを採用します。
*   `--import-alias "@/*"`: `src`ディレクトリへのパスを`@/`というエイリアスで参照できるようにします。

### Step 2: プロジェクトデータの作成

#### Step 2: このステップのゴールを明確に
ポートフォリオサイトに掲載するプロジェクトのデータを管理するためのJSONファイルを作成します。

#### The How: 具体的なコードと手順
`data`ディレクトリを作成し、その中に`projects.json`という名前でファイルを作成します。

**`data/projects.json`**
```json
[
  {
    "title": "Markdown Previewer",
    "description": "MarkdownをリアルタイムでHTMLに変換するエディタです。",
    "imageUrl": "/images/project-markdown.png",
    "tags": ["React", "TypeScript", "Marked"],
    "demoUrl": "https://example.com/markdown-previewer",
    "githubUrl": "https://github.com/your-username/markdown-previewer"
  },
  {
    "title": "Blog with CMS",
    "description": "ヘッドレスCMSと連携したブログサイトです。",
    "imageUrl": "/images/project-blog.png",
    "tags": ["Next.js", "TypeScript", "microCMS"],
    "demoUrl": "https://example.com/blog-cms",
    "githubUrl": "https://github.com/your-username/blog-cms"
  }
]
```
また、`public`フォルダに`images`フォルダを作成し、プロジェクトのスクリーンショット画像を配置してください。

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
プロジェクトのデータをコードから分離することで、管理が容易になります。JSON形式は、JavaScriptでネイティブに扱うことができるため、特別なライブラリを導入することなく簡単にデータを読み込めます。

### Step 3: 共通レイアウトの作成

#### Step 3: このステップのゴールを明確に
サイト全体で共通して使用するヘッダーとフッターを含むレイアウトを作成します。

#### The How: 具体的なコードと手順
まず、ナビゲーションバーとフッターのコンポーネントを作成します。

**`src/components/Navbar.tsx`**
```tsx
import Link from 'next/link';

export const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-xl">My Portfolio</Link>
        <div className="space-x-4">
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
};
```

**`src/components/Footer.tsx`**
```tsx
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© 2025 Your Name. All Rights Reserved.</p>
    </footer>
  );
};
```

次に、`src/app/layout.tsx`を編集して、これらのコンポーネントを組み込みます。

**`src/app/layout.tsx`**
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A portfolio site created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
`app/layout.tsx`は、App Routerにおけるルートレイアウトです。ここに配置したコンポーネントは、全てのページで共通して表示されます。`children` propには、各ページコンポーネントがレンダリングされます。これにより、サイト全体のデザインの一貫性を保ちつつ、コードの重複を避けることができます。

### Step 4: 各ページの作成

#### Step 4: このステップのゴールを明確に
「ホーム」「制作物一覧」「私について」の基本的なページを作成します。

#### The How: 具体的なコードと手順
`src/app`ディレクトリに以下のファイルを作成します。

**`src/app/page.tsx` (ホーム)**
```tsx
export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p>こんにちは！これはNext.jsで作成したポートフォリオサイトです。</p>
    </div>
  );
}
```

**`src/app/projects/page.tsx` (制作物一覧)**
```tsx
export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      {/* ここにプロジェクト一覧を表示します */}
    </div>
  );
}
```

**`src/app/about/page.tsx` (私について)**
```tsx
export default function AboutPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">About Me</h1>
      <p>ここに自己紹介を記述します。</p>
    </div>
  );
}
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
Next.jsのApp Routerでは、`app`ディレクトリ内のフォルダ構成がそのままURLのパスに対応します。例えば、`app/projects/page.tsx`は`/projects`というURLでアクセスできます。`page.tsx`というファイル名が、そのルートのUIを定義する規約になっています。

### Step 5: 制作物一覧ページの実装

#### Step 5: このステップのゴールを明確に
`projects.json`からデータを読み込み、制作物一覧ページに表示します。

#### The How: 具体的なコードと手順
まず、プロジェクトカードのコンポーネントを作成します。

**`src/components/ProjectCard.tsx`**
```tsx
import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
};

export const ProjectCard = ({ title, description, imageUrl, tags, demoUrl, githubUrl }: ProjectCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image src={imageUrl} alt={title} width={400} height={250} className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">{tag}</span>
          ))}
        </div>
        <div className="flex justify-between">
          <Link href={demoUrl} target="_blank" className="text-blue-500 hover:underline">Demo</Link>
          <Link href={githubUrl} target="_blank" className="text-gray-500 hover:underline">GitHub</Link>
        </div>
      </div>
    </div>
  );
};
```

次に、`src/app/projects/page.tsx`を更新して、JSONデータを読み込み、`ProjectCard`コンポーネントを使って表示します。

**`src/app/projects/page.tsx`**
```tsx
import { ProjectCard } from '@/components/ProjectCard';
import projects from '@/data/projects.json';

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
*   **サーバーコンポーネント:** `app/projects/page.tsx`はデフォルトでサーバーコンポーネントとして動作します。これにより、サーバーサイドで直接`projects.json`を読み込むことができます。クライアントにデータを送信する必要がないため、パフォーマンスが向上します。
*   **`<Image>`コンポーネント:** Next.jsの`<Image>`コンポーネントは、画像の自動最適化（WebP形式への変換、リサイズ）、遅延読み込み（lazy loading）などを行い、サイトの表示速度を大幅に改善します。`width`と`height`の指定が必須です。
*   **コンポーネント化:** `ProjectCard`のようにUIの部品をコンポーネントとして切り出すことで、再利用性が高まり、コードの見通しが良くなります。

### Step 6: ブログ機能の統合

#### Step 6: このステップのゴールを明確に
No.021で作成したブログ機能をこのポートフォリオサイトに統合します。

#### The How: 具体的なコードと手順
1.  No.021のプロジェクトから、ブログ記事のMarkdownファイルを管理しているディレクトリ（例: `_posts`）と、Markdownをパースするためのユーティリティ関数（例: `lib/posts.ts`）をこのプロジェクトにコピーします。
2.  `src/app/blog/page.tsx`を作成し、ブログ記事の一覧を表示するロジックを実装します。
3.  `src/app/blog/[slug]/page.tsx`を作成し、個別のブログ記事を表示する動的ルートを実装します。

この手順の詳細は、No.021のチュートリアルを参照してください。

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
既存の機能を新しいプロジェクトに統合することは、実務でもよくある作業です。コンポーネントやロジックを適切に移植することで、効率的に開発を進めることができます。

### Step 7: メタデータの設定

#### Step 7: このステップのゴールを明確に
各ページに適切なタイトルと説明を設定し、SEO（検索エンジン最適化）を強化します。

#### The How: 具体的なコードと手順
`generateMetadata`関数を使い、各`page.tsx`で動的にメタデータを生成します。

**`src/app/projects/page.tsx`**
```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: '制作物一覧 | My Portfolio',
  description: 'これまでに作成したプロジェクトの一覧です。',
};

export default function ProjectsPage() {
  // ... (既存のコード)
}
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
Next.jsのMetadata APIを使うと、サーバーサイドで`<title>`タグや`<meta name="description">`タグを生成できます。これにより、検索エンジンがページの内容を正しく理解し、検索結果に適切に表示されるようになります。SSGの大きな利点の一つです。

### Step 8: スタイリングとレスポンシブ対応

#### Step 8: このステップのゴールを明確に
Tailwind CSSを使ってサイト全体のデザインを整え、スマートフォンでも見やすいようにレスポンシブ対応を行います。

#### The How: 具体的なコードと手順
Tailwind CSSのユーティリティクラス（例: `md:grid-cols-2`, `lg:grid-cols-3`）を使って、画面サイズに応じたレイアウトの変更を適用します。

**`src/app/projects/page.tsx` のグリッド部分**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* ... */}
</div>
```

#### The Why: なぜ、それが必要なのか？（コードの逐条解説）
Tailwind CSSのレスポンシブプレフィックス（`sm:`, `md:`, `lg:`など）を使うと、メディアクエリを直接書くことなく、直感的にレスポンシブデザインを実装できます。`grid-cols-1`はデフォルト（モバイル）、`md:grid-cols-2`は中サイズ以上の画面、`lg:grid-cols-3`は大きい画面で適用されるカラム数を指定しています。

## 深掘りコラム (Deep Dive)

*   **なぜSSGなのか？(Why SSG?)**: SSGはビルド時にHTMLを生成しておくため、サーバーへのリクエスト時に動的にページを生成するSSR（サーバーサイドレンダリング）に比べて、非常に高速にページを表示できます。ブログやポートフォリオサイトのように、内容の更新頻度がそれほど高くないサイトに最適です。
*   **`shadcn/ui`の活用**: `shadcn/ui`は、コピー＆ペーストで使えるUIコンポーネント集です。デザインシステムが統一されており、カスタマイズ性も高いため、効率的に美しいUIを構築できます。`npx shadcn-ui@latest add button`のようにして、必要なコンポーネントをプロジェクトに追加してみましょう。

## 挑戦課題 (Challenges)

*   **Easy:** ライトモードとダークモードの切り替え機能を追加してみましょう。
*   **Medium:** プロジェクト一覧ページに、タグによる絞り込み機能を追加してみましょう。
*   **Hard:** ブログ記事に「いいね」機能（`localStorage`を使った簡易的なものでOK）を実装してみましょう。
*   **エラー修正課題:** 以下のコードには意図的なバグが含まれています。`Image`コンポーネントの`src`が間違っているため、画像が表示されません。正しく修正してください。
    ```tsx
    // わざと間違ったコード
    <Image src="../public/images/screenshot.png" alt="bug" width={400} height={250} />
    ```

## メモ (Memo)

ここに、学習中に気づいたことや疑問に思ったことを自由に書き留めてください。

---

## 結論

お疲れ様でした！このチュートリアルを通して、Next.jsを使った静的なポートフォリオサイトの構築方法を学びました。SSG、コンポーネント設計、画像最適化、SEO対策など、モダンなフロントエンド開発に欠かせない多くの知識とスキルを身につけることができたはずです。

次のステップとして、作成したサイトをVercelやNetlifyにデプロイして世界に公開したり、CMSと連携してコンテンツ管理をより柔軟にしたりすることに挑戦してみてください。
