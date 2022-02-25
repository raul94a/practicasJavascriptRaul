import './Header.css'
import Navigation from './Navigation'
import Logo from './Logo';
const Header = ({onSetPage: onClick, page}) => {
    return (<header>
        <div>
            <Logo />
            <Navigation onClick={onClick} page={page}/>
        </div>
    </header>
    )
}
export default Header