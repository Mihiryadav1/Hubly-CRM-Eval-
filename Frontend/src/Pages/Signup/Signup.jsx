import React from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from '../SignIn/SignIn';
import { toast } from 'react-toastify';
import axios from 'axios';
const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast("Passwords do not match", { type: "error" });
            return;
        }
        if (!formData.termsAccepted) {
            toast("You must accept the terms and conditions", { type: "error" });
            return;
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
                {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password
                }
            ).then(res => {
                console.log(res.data);

            })
            toast("Account created successfully!", { type: "success" });
            //Navigate to signup after successful signup
            navigate("/signin")

        }
        catch (err) { }



    }
    return (
        <div className={styles['signin-container']}>
            <div className={styles['signin-form-container']}>
                <div className={styles['logo']}><img src="/logo.svg" alt="" /></div>
                <div className={styles['signin-form']}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        <h2>Create an account</h2>
                        <p><Link to={"/signin"} element={<SignIn />}>Sign in instead</Link></p></div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['input-group']}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={handleChange} value={formData.firstName} />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={handleChange} value={formData.lastName} />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={handleChange} value={formData.email} />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={handleChange} value={formData.password} />
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
                        </div>

                        <div className={styles['checkbox-group']}>
                            <input type="checkbox" id="termsAccepted" onChange={handleChange} checked={formData.termsAccepted} />
                            <p>By creating an account, I agree to our Terms of Use and Privacy Policy</p>
                        </div>

                        <button type="submit" className={styles['submit-btn']}>
                            Create an account
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "2rem" }}>Don't have an account?{" "}
                        <Link>Sign up</Link></p>
                </div>
            </div>
            <div className={styles['sign-banner']}></div>
        </div >
    )
}

export default Signup