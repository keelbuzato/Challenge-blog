import { getPrismicClient } from '../../services/prismic'
import style from '../../pages/post/post.module.scss'
import { RichText } from 'prismic-dom'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'
import { GetStaticPaths } from 'next'
interface Post {
    first_publication_date: string | null
    title: string
    banner: {
        url: string
    }
    author: string
    content: {
        heading: string
        body: {
            text: string
        }[]
    }[]
}

interface PostProps {
    post: Post
}

export default function Post({ post }: PostProps) {
    console.log(post)
    return (
        <>
            <div className={style.container}>
                <img
                    src={post.banner}
                    alt="img"
                    layout="fill"
                    className={style.img}
                />
                <div className={style.teste}>
                    <div>
                        <h1 className={style.title}>{post.title}</h1>
                    </div>
                    <div className={style.inf}>
                        <div className={style.date}>
                            <div>
                                <img
                                    src="/calendar.png"
                                    width="20px"
                                    height="20px"
                                />
                                {post.first_publication_date}
                            </div>
                        </div>
                        <div>
                            <img src="/user.png" alt="" />
                            {post.author}
                        </div>
                    </div>
                    <div className={style.text}>
                        <h2 className={style.text}>{post.subtitle}</h2>
                        {post.content.map((content) => (
                            <>
                                <h5 className={style.subtitleContent}>
                                    {content.heading}
                                </h5>
                                <h5>
                                    <PrismicRichText field={content.body} />
                                </h5>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps = async ({ req, params }) => {
    const { slug } = params
    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID('posts', String(slug), {})
    console.log(response)
    const post = {
        slug,
        title: response.data.title,
        subtitle: response.data.subtitle,
        content: response.data.content,
        banner: response.data.banner.url,
        author: response.data.author,
        first_publication_date: new Date(
            response.last_publication_date
        ).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }
    return {
        props: {
            post,
        },
    }
}
