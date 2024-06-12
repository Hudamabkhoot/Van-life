import React, { useEffect, useContext, useState } from "react"
import { Link,  useNavigate, useActionData, Form, redirect } from 'react-router-dom'
import styles from '../css modules/Register.module.css'
import { AuthContext }  from '../components/AuthContext'
import { registerUser } from "../firebase/firebase";
import { Toaster } from 'react-hot-toast';

export async function action( {request} ){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    try {
        const data = await registerUser(email, password);        
        return data
    } catch(err){
    }
}


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const data = useActionData()
    const {authUser} = useContext(AuthContext)

    useEffect(() => {
        if(authUser !== null){
            navigate('/host')
        }
    }, [authUser])

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setPassword(''); // Clear password field
    }; 

    return (
        <div className={styles.registerContainer}>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {
                location.state?.message &&
                    <h3 className={styles.registerError}>{location.state.message}</h3>
            }
            <h1>Create An Account</h1>
            {
                data?.error &&
                    <h3 className={styles.registerError}>{data.error}</h3>
            }

            <Form action='/register' method='post' className={styles.registerForm}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={handleEmailChange}
                    required

                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type='submit'
                    className='main-btn'
                >
                    Sign up
                </button>
            </Form>
            <div className={styles.login}>
                <p>Need to login in?</p>
            <Link
                to="/login"
                state={{
                from: location.pathname
                }}
                replace
            ><span>Login in</span></Link>
            </div>
        </div>
    )

}


