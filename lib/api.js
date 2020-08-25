import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllWorksData() {
  const files = fs.readdirSync(`${process.cwd()}/content/works`);

  const worksData = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/works/${filename}`)
      .toString()

    const { data } = matter(markdownWithMetadata)

    // Convert post date to format: Month day, Year
    const date = data.date.toString()

    const frontmatter = {
      ...data,
      date
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  // Sort posts by date
  return worksData
}

export function getAllWorksSlugs() {
  const files = fs.readdirSync("content/works")

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }))

  return paths
}

export function getWorkData(slug) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/works", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  const date = data.date.toString()

  const frontmatter = {
    ...data,
    date
  };

  // Combine the data with the id
  return {
    content,
    frontmatter
  }
}
