import { usePrismicDocumentsByType } from '@prismicio/react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { getPrismicClient } from '../services/prismic'
import styles from './home.module.scss'
import Post from './post/[slug]'

interface Post {
    uid?: string
    first_publication_date: string | null
    data: {
        title: string
        subtitle: string
        author: string
    }
}

interface PostPagination {
    next_page: string
    results: Post[]
}

interface HomeProps {
    postsPagination: PostPagination
}

export default function Home({ posts }) {
    const [publications, setPublications] = useState(posts)
    const [pagination, setPagination] = useState(1)
    const [documents, { state, error }] = usePrismicDocumentsByType('posts', {
        page: pagination,
        pageSize: 2,
    })

    const loadMore = useCallback(() => {
        if (documents?.results && pagination != 1) {
            setPublications([...publications, ...documents.results])
        }
    }, [pagination, documents])

    useEffect(() => {
        if (state === 'loaded') {
            loadMore()
        }
    }, [documents, state])

    const formatDate = (date) => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: ptBR })
    }
    return (
        <main className={styles.allPage}>
            {publications?.map(({ data, first_publication_date, uid }) => (
                <Link href={`/post/${uid}`}>
                    <div className={styles.cardPost}>
                        <strong className={styles.title}>{data.title}</strong>
                        <p>{data.subtitle}</p>
                        <span>
                            <time>
                                <img src="/calendar.svg" alt="calendario" />
                                {formatDate(first_publication_date)}
                            </time>
                            <img src="/user.svg" alt="usuario" />
                            <p>{data.author}</p>
                        </span>
                    </div>
                </Link>
            ))}
            <button
                className={styles.buttonLoadMore}
                onClick={() => setPagination(pagination + 1)}
                disabled={pagination >= documents?.total_pages}
            >
                Carregar mais posts
            </button>
        </main>
    )
}

export const getStaticProps = async ({ params }) => {
    console.log(params)
    const prismic = getPrismicClient()
    const posts = await prismic.getByType('posts', {
        pageSize: 2,
    })

    return {
        props: { posts: posts.results },
    }
}
