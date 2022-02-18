import './Logo.css'
import appLogo from '../../assets/img/logo.png'
const Logo = (props) => {
    return (<div className='header-container-logo'>
        <img src={appLogo} className='header-logo' />

    </div>)
}
export default Logo