import Head from "next/head"
import Link from "next/link"
import { getAllWorksData } from '../lib/api'

const Home = ({ allWorksData }) => {
  return (
    <div>
       {allWorksData.map(({ slug, frontmatter: { title, description, date } }) => (
        <article key={title}>
          <header>
            <h3><Link href='/works/[slug]' as={`/works/${slug}`}><a>{title}</a></Link></h3>
            <span>{date}</span>
          </header>
          <section>
            <p>{description}</p>
          </section>
        </article>
      ))}
    </div>
  )
}
export default Home

export async function getStaticProps() {
  const allWorksData = getAllWorksData()
  return {
    props: {
      allWorksData
    }
  }
}
