import './Login.css'
import BookContext from '../../state/book-context'
import { useContext, useEffect, useState } from 'react'
import HttpRequest from '../../services/HttpRequest'
import FirebaseBook from '../../models/FirebaseBook'
import BookFromGoogle from '../../models/BookFromGoogle'
import LoginPhrases from './LoginPhrases'
import { ErrorModal } from '../modal/BookModal'

const auth = async (email, password, formState = 'login') => {
    //post to firebase
    const signIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYnc9sw5fj7iggi-45fXCRXhTsb85vABc'
    const signUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYnc9sw5fj7iggi-45fXCRXhTsb85vABc'
    let resp = await fetch(formState == 'login' ? signUp : signIn, {
        'method': 'POST',
        'content-type': 'application/json',
        'body': JSON.stringify({
            'email': email,
            'password': password,
            'returnSecureToken': true
        })
    })
    let data = await resp.json();
    return data;
}


const Login = (props) => {
    const ctx = useContext(BookContext);
    const [formState, setFormState] = useState('login')
    const [emailState, setEmailState] = useState('')
    const [passState, setPassState] = useState('')
    const [error, setError] = useState(null);

    const onError = () => {
        setError(true);
    }
    const clearError = () => {
        setError(false);
    }



    const getUserBooks = async (localId) => {


        let response = await HttpRequest.httpGet(true, '', localId);
        console.log('response', response)

        let arrayBooks = [];
        setTimeout(async () => {
            for (let book in response) {

                // console.log(user, 'user')
                // for (let book in response[user]) {
                console.log(response[book], 'book')
                let selfLink = response[book]['selfLink']
                let firebaseBook = FirebaseBook.createBookFromFirebase(response[book], book);
                let googleBook = new BookFromGoogle(await HttpRequest.httpGetBook(selfLink));
                googleBook.addFirebaseData(firebaseBook)
                arrayBooks.push(googleBook)
                // }
            }

            ctx.setUserBooks([...arrayBooks])
            ctx.setIsLoadingActive(false);


        }, 500)

    }


    const tryAutoLogin = async () => {
        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password')
        if (email && password) {
            // console.log(email, password, 'localId storage')
            let data = await auth(email, password);
            // console.log(data)
            let localId = data['localId'];
            // console.log(localId)
            ctx.setLocalId(localId);
            if (localId) {
                // console.log(localId, 'hay local id')
                ctx.changeLogStatus();
                await getUserBooks(localId)
            }
            return;


        }
    }


    useEffect(() => {
        setTimeout(async () => {
            await tryAutoLogin();
        }, 100)

    }, [

    ])

    const onSubmit = async (event) => {
        event.preventDefault();
        let data = await auth(emailState, passState, formState);
        let localId = data['localId'];

        if (localId) {
            ctx.setLocalId(localId);
            localStorage.setItem('email', emailState);
            localStorage.setItem('password', passState);
            //cogemos los libros del user
            await getUserBooks(localId);
            //ahora debería estar logeado
            ctx.changeLogStatus();
            return;

        }
        onError();


    }

    return (
        <>
            {error && <ErrorModal onClick={clearError} />}
            <section className="login-screen" style={{ width: '100vw', height: '100vh', margin: '0 auto', marginTop: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">

                            <form className="login" onSubmit={
                                async (event) => {
                                    await onSubmit(event)

                                }
                            }>

                                <div className="form-status-row">
                                    <button className={formState == 'login' ? 'button-login-disabled' : 'button-login-enabled'} disabled={formState === 'login'}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFormState('login')
                                        }}
                                    >Login</button>
                                    <button className={formState == 'registro' ? 'button-login-disabled' : 'button-login-enabled'} disabled={formState === 'registro'}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setFormState('registro')
                                        }}
                                    >Registro</button>

                                </div>

                                <div className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <input type="text" className="login__input" placeholder="User name / Email" onChange={(event) => setEmailState(event.target.value)} value={emailState} />
                                </div>
                                <div className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <input type="password" className="login__input" placeholder="Password" value={passState} onChange={(event) => setPassState(event.target.value)} />
                                </div>
                                <button className="button login__submit">
                                    <span className="button__text">{formState === 'login' ? 'Inicia sesión' : 'Registrarse'}</span>
                                    <i className="button__icon fas fa-chevron-right"></i>
                                </button>
                            </form>
                            <div className="social-login">
                                <h3>log in via</h3>
                                <div className="social-icons">
                                    <a href="#" className="social-login__icon fab fa-instagram"></a>
                                    <a href="#" className="social-login__icon fab fa-facebook"></a>
                                    <a href="#" className="social-login__icon fab fa-twitter"></a>
                                </div>
                            </div>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
                <LoginPhrases />
            </section>
        </>
    )
}
export default Login