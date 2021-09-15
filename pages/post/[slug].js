import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

export default function Post() {
  const router = useRouter()
  const [slug, setSlug] = useState()
  useEffect(() => {
    setSlug(router.query.slug)
  }, [router])

  const GET_POST = gql`
    query GetPost {
      postBy(slug: "${slug}") {
        content(format: RENDERED)
        title(format: RENDERED)
      }
    }
  `
  const { loading, error, data } = useQuery(GET_POST)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>WP + GraphQL React Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data && (
        <main className={styles.main}>
          <h1 className={styles.title}>{data?.postBy?.title}</h1>
          <p dangerouslySetInnerHTML={{ __html: data?.postBy?.content }} />
        </main>
      )}

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}