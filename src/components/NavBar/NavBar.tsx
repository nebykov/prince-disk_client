import './navbar.scss'
import logo from '../../assets/prince-logo.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <header className="navbar">
            <div className="container">
                <div className='navbar__logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    <Link to='/auth'>
                    <span>Log In</span>
                    </Link>
                    <Link to='/registration'>
                    <span>Registration</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default NavBar