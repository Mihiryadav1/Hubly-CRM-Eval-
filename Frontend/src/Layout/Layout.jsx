import React from 'react'
import styles from './Layout.module.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className={styles['layout-container']}>
            <div className={styles['sidebar']}>
                <Sidebar />
            </div>
            <div className={styles['outlet']}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout