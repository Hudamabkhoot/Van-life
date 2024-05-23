import React, { useEffect, useContext } from "react"
import styles from '../css modules/Login.module.css'
import { Link, useLocation,  useNavigate, useActionData, Form } from 'react-router-dom'
import { loginUser } from '../firebase'
import AuthContext from '../components/AuthContext'

export async function action( {request} ){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await loginUser(email, password )
        return data
        
    } catch(err){
        return {
            error: err.message
        }
    } 
    
}

export default function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = useActionData()
    
    const {user} = useContext(AuthContext)

    useEffect(() => {
        if(user){
            navigate('/host')
        }
    }, [user])
    

    return (
        <div className={styles.loginContainer}>
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
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
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
                    <span>Register as a Host today!</span></Link>
            </div>
            </Form>
        </div>
    )

}