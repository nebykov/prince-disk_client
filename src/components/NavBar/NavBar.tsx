import './navbar.scss'
import logo from '../../assets/prince-logo.png'

const NavBar = () => {
    return (
        <header className="navbar">
            <div className="container">
                <div className='navbar__logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    <span>Log In</span>
                    <span>Registration</span>
                </nav>
            </div>
        </header>
    )
}

export default NavBar