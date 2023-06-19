import { RecoilRoot } from 'recoil'
import App from './App';

export default function index() {

  return (
    <div>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </div>
  )
}
