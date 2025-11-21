import React from 'react'
import styles from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate()

    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['navbar-content']}>
                <div className={styles['logo']}>
                    <img src="/logo.svg" alt="Hubly" />
                </div>
                <div className={styles['nav-btns']}>
                    <button className='btn' onClick={() => {
                        navigate("/signin")
                    }}>Login</button>
                    <button className='btn btn-blue' onClick={() => {
                        navigate("/signup")
                    }}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar