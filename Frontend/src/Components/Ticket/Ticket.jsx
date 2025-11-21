import { memo } from "react"
import styles from "./Ticket.module.css"
const Ticket = memo(({ ticketId, createdAt }) => {

    return (
        <div className={styles['ticket-container']}>
            <div className={styles['ticket-header']}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}> <p style={{ width: "30px", height: "30px", backgroundColor: "green", borderRadius: "50%" }}></p>
                        <span>{ticketId}</span>
                    </div>
                    <div>Date {createdAt}</div>
                </div>
            </div>
            <div className="flex">
                <p>10pm</p>
            </div>
            <div className={styles['ticket-footer']}>
                <div>User</div>
            </div>

        </div>
    )
})

export default Ticket