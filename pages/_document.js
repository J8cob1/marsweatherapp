// Code copied from: https://nextjs.org/docs/advanced-features/custom-document
// Didn't see a need to modify it other than setting lang="en" - this is why this file exists

// Other places that have this same kind of thing:
// https://github.com/isaachinman/next-i18next/issues/20
// https://stackoverflow.com/questions/57008211/nextjs-add-html-lang-attribute-to-custom-document-in-object-notation
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument