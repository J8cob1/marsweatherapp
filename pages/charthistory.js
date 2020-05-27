import Head from 'next/head'
import Base from '../components/base'

export default function ChartHistory() {
  // Reminder: change favicon
  return (
    <>
      <Head>
        <title>Chart History - Mars Weather App</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Base>
        Chart History Page
      </Base>
    </>
  );
}