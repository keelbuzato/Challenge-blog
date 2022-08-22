import { PrismicProvider } from '@prismicio/react'
import { AppProps } from 'next/app'
import Header from '../components/Header'
import { getPrismicClient } from '../services/prismic'
import '../styles/globals.scss'
import * as prismic from '@prismicio/client'

const endpoint = prismic.getEndpoint('challenge-posts')
const client = prismic.createClient(endpoint, {
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_ACESS_TOKEN,
})
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <PrismicProvider client={client}>
                <Header />
                <Component {...pageProps} />
            </PrismicProvider>
        </>
    )
}

export default MyApp
