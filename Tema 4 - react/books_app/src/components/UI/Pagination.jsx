import './Pagination.css'
const Pagination = ({ onClick, actualPage }) => {
    const isActualPage = (actualPage, number) => actualPage === number;
    return (
        <div className='pagination'>
            {[1, 2, 3, 4].map(number =>
                <button className={isActualPage(actualPage, number) && 'actual-page'}
                    style={{
                        color: isActualPage(actualPage, number) && 'black',
                        background: isActualPage(actualPage, number) && 'white'
                    }}
                    onClick={() => onClick(number)}>
                    {number}
                </button>)}
        </div>
    )
}
export default Pagination