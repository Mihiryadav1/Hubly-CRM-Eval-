import React from 'react'
import styles from './Hero.module.css'
import { IoPlayCircleOutline } from "react-icons/io5";
const Hero = () => {
    return (
        <div className={styles['hero-container']}>
            <div className={styles["content-wrapper"]}>
                <div className={styles['content']}>
                    <h1>Grow Your Business Faster with Hubly CRM</h1>
                    <p>Manage leads, automate workflows, and close deals effortlessly—all in one <br />powerful platform.</p>
                    <div className="flex">
                        <button className="btn">Get Started</button>
                        <button className="btn" style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
                            <div style={{ fontSize: "2rem", display: "flex", justifyContent: "center", alignItems: "center", }}><IoPlayCircleOutline /></div>Watch Video</button>
                    </div>
                </div>
            </div>
            <div className={styles["hero-image"]}>
                <img src="/Hero.png" alt="" />
            </div>
        </div >
    )
}

export default Hero