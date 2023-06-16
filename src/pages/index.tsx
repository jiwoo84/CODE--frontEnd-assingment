import { RecoilRoot } from 'recoil'
import Table from '../components/ExchangesTable'

export default function Home() {
  return (
    <>
      <RecoilRoot>
        <Table />
      </RecoilRoot>
    </>
  )
}
