import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import Link from 'next/link'
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
    const formatDate = (date) => {
        return format(new Date(date), 'dd MMM yyyy', { locale: ptBR })
    }

    return (
        <main className={styles.allPage}>
            {posts?.map(({ data, last_publication_date, uid }) => (
                <Link href={`/post/${uid}`}>
                    <div className={styles.cardPost}>
                        <strong className={styles.title}>{data.title}</strong>
                        <p>{data.subtitle}</p>
                        <span>
                            <time>
                                <img src="/calendar.svg" alt="calendario" />
                                {formatDate(last_publication_date)}
                            </time>
                            <img src="/user.svg" alt="usuario" />
                            <p>{data.author}</p>
                        </span>
                    </div>
                </Link>
            ))}
            <button className={styles.buttonLoadMore}>
                Carregar mais posts
            </button>
        </main>
    )
}

export const getStaticProps = async () => {
    const prismic = getPrismicClient()
    const posts = await prismic.getByType('posts')

    return {
        props: { posts: posts.results },
    }
}
