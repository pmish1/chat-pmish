import './Home.css'

import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function Home() {
  return (
    <div className="home">
        <Sidebar />
        <Chat />
    </div>
  )
}

export default Home