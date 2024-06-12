import React, { useEffect, useContext, useState } from "react"
import styles from '../css modules/Login.module.css'
import { Link, useLocation,  useNavigate, useActionData, Form } from 'react-router-dom'
import { loginUser } from '../firebase/firebase'
import { AuthContext }  from '../components/AuthContext'
import { Toaster } from 'react-hot-toast';

export async function action( {request} ){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await loginUser(email, password )
        return data
        
    } catch(err){
    } 
    
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const data = useActionData()
    const { authUser } = useContext(AuthContext)
   
    useEffect(() => {
        if (authUser) {
            navigate('/host')
        }
    }, [authUser])


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setPassword('');
    };  

    return (
        <div className={styles.loginContainer}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                location.state?.message &&
                    <h3 className={styles.loginError}>{location.state.message}</h3>
            }
            <h1>Login to your account</h1>
            {
                data?.error &&
                    <h3 className={styles.loginError}>{data.error}</h3>
            }

            <Form action='/login' method='post' className={styles.loginForm}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type='submit'
                    className='main-btn'
                >
                    Log in
                </button>
            <div className={styles.register}>
                <p>Don't have an account?</p>
            <Link
                to="/register">
                    <span> Sign up as a Host today!</span></Link>
            </div>
            </Form>
        </div>
    )

}