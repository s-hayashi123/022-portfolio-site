import Link from "next/link";
import { getSortedPostsData } from "../../../lib/posts";

export default function BlogPage() {
  const allPostsData = getSortedPostsData();
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="">
        <ul className="space-y-4">
          {allPostsData.map(({ slug, date, title }) => (
            <li key={slug} className="border p-4 rounded-md hover:bg-gray-100">
              <Link
                href={`/blog/${slug}`}
                className="text-xl text-blue-600 hover:underline"
              >
                {title}
              </Link>
              <br />
              <small className="text-gray-500">{date}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
