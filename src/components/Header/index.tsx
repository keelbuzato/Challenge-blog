import styles from './header.module.scss'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
    const { asPath } = useRouter()

    return (
        <header>
            <div className={styles.headers}>
                <Link href="/">
                    <a href={asPath == '/'}>
                        <img src="/Logo.svg" />
                    </a>
                </Link>
            </div>
        </header>
    )
}
