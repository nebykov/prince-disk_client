import './navbar.scss'
import logo from '../../assets/prince-logo.png'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { logOut } from '../../store/reducers/userSlice'

const NavBar = () => {
    const { isAuth } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    return (
        <header className="navbar">
            <div className="nav_wrapper">
                <div className='navbar__logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    {
                        !isAuth ?
                        <>
                        <Link to='/auth'>
                        <span>Log In</span>
                    </Link>
                    <Link to='/registration'>
                        <span>Registration</span>
                    </Link>
                        </>
                        :
                        <span onClick={() => dispatch(logOut())}>Log Out</span>
                    }
                </nav>
            </div>
        </header>
    )
}

export default NavBar