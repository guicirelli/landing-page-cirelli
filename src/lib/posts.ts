import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  author: string;
  public: boolean;
  content: string; // Alterar de contentHtml para content
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    const data = matterResult.data as { title: string; date: Date | string; author: string; public: boolean };
    const dateString = data.date instanceof Date ? data.date.toISOString() : data.date;

    return {
      slug,
      ...data,
      date: dateString,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const data = matterResult.data as { title: string; date: Date | string; author: string; public: boolean };
  const dateString = data.date instanceof Date ? data.date.toISOString() : data.date;

  // Não converter mais para HTML aqui, retornar o conteúdo Markdown bruto

  // Combine the data with the id and contentHtml
  return {
    slug,
    ...data,
    date: dateString,
    content: matterResult.content, // Retornar conteúdo bruto
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
