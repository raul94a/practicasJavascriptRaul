import './Footer.css'
const Footer = ({height}) => {
    console.log(document.documentElement.clientHeight)
    console.log(height)
    
    return (
        <footer style={{ position: 'absolute', top: `${height}px` }}>
            <article>
                <p >RAUL ALBIN ALBA</p>
            </article>
        </footer>
    )
}
export default Footer