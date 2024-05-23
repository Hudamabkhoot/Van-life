import React, { useEffect, useContext } from "react"
import { Link,  useNavigate, useActionData, Form } from 'react-router-dom'
import styles from '../css modules/Register.module.css'
import AuthContext from '../components/AuthContext'
import { registerUser } from "../firebase";


export async function action( {request} ){
    const formData = await request.formData()
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await registerUser(firstName, lastName, email, password )
        return data
    } catch(err){
        return {
            error: err.message
        }
    }
}


export default function Register() {

    const navigate = useNavigate()
    const data = useActionData()
    const {user} = useContext(AuthContext)

    useEffect(() => {
        if(user){
            navigate('/host')
        }
    }, [user])


    return (
        <div className={styles.registerContainer}>
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
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                   className='main-btn' 
                   type='submit'
                >
                    Register as a Host
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


