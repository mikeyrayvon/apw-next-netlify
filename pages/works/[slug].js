import Head from "next/head"
import { getAllWorksSlugs, getWorkData } from '../../lib/api'
import remark from 'remark'
import html from 'remark-html'

const Work = ({ frontmatter, contentHtml }) => {
  return (
    <>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: contentHtml}} />
    </>
  )
}
export default Work

export async function getStaticPaths() {
  const paths = getAllWorksSlugs()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: {slug} }) {
  const workData = getWorkData(slug)

  const processedContent = await remark()
    .use(html)
    .process(workData.content)
  const contentHtml = processedContent.toString()

  return {
    props: {
      frontmatter: workData.frontmatter,
      contentHtml
    }
  }
}
