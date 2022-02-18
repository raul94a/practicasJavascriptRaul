import './Header.css'
import Navigation from './Navigation'
import Logo from './Logo';
const Header = ({onSetPage: onClick}) => {
    return (<header>
        <div>
            <Logo />
            <Navigation onClick={onClick}/>
        </div>
    </header>
    )
}
export default Header