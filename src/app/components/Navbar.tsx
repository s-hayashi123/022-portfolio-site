import Link from "next/link";

export const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/">My Portforio</Link>
        <div>
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  );
};
