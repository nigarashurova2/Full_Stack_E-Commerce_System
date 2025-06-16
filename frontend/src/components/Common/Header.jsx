import Navbar from './Navbar'
import Topbar from './Topbar'

const Header = () => {
  return (
    <header className='border-b border-gray-200'>
        {/* Topbar */}
        <Topbar/>
        {/* navbar */}
        <Navbar/>
        {/* cart drawer */}
    </header>
  )
}

export default Header