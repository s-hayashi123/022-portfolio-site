import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
};

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  tags,
  demoUrl,
  githubUrl,
}: ProjectCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={250}
        className="w-full object-cover"
      ></Image>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href={demoUrl}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Demo
          </Link>
          <Link
            href={githubUrl}
            target="_blank"
            className="text-gray-500 hover:underline"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
};
