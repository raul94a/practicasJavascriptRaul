import { useState,useEffect } from 'react'
import './Rating.css'

const Rating = ({ averageRating, ratingsCount }) => {
    const [stars, setStarsArray] = useState([])

    const voidStar = <svg fill='yellow' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path style={{ color: 'yellow' }} d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" /></svg>
    const halfStar = <svg fill='yellow'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" /></svg>
    const fullStar = <svg fill='yellow'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
    //vamos a pensar una forma de pintar las estrellas correctas
    // if(!averageRating || !ratingsCount){
    //     averageRating = 0;
    //     ratingsCount = 0;
    // }
    //estrellas completas
    let fullStarsNumber = Math.floor(averageRating);
    let halfStarsNumber = (averageRating - fullStarsNumber) % 1 === 0 ? 0 : 1
    let voidStarsNumber = 5 - fullStarsNumber - halfStarsNumber;
    // console.log(averageRating, 'average ragin')
    // console.log(averageRating, fullStarsNumber, voidStarsNumber, halfStarsNumber)

    const starsArray = [];
    useEffect(() => {
        for (let i = 0; i < fullStarsNumber; i++) {
            starsArray.push(fullStar);
            setStarsArray(prev => [...prev, fullStar])
        }
        if (halfStarsNumber != 0) {
            for (let i = 0; i < halfStarsNumber; i++) {
                starsArray.push(halfStar);
                setStarsArray(prev => [...prev, halfStar])
            }
        }
        for(let i  = 0; i < voidStarsNumber; i++){
            starsArray.push(voidStar);
            setStarsArray(prev => [...prev, voidStar])
        }
       

    }, [])
    // console.log(starsArray)
    const withValoration =  <>{stars.map(star=>star)}<span> ({ratingsCount})</span></>
    const withNoValoration = <p style={{textAlign:'center'}}>No hay valoración disponible</p>
    return (
        <div className='flex-row-center'>
            {averageRating ?  withValoration:  withNoValoration}

        </div>
    )

}
export default Rating