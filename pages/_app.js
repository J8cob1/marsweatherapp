// https://nextjs.org/learn/basics/assets-metadata-css/global-styles
import styles from '../styles/globals.modules.css'
import { Component } from 'react/cjs/react.production.min'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps }/>
}