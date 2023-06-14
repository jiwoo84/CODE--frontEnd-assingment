import { Inter } from 'next/font/google'
import Table from '../components/ExchangesTable'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Table />
    </>
  )
}
