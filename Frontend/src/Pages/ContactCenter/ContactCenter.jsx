import React, { useEffect, useState } from 'react'
import styles from "./ContactCenter.module.css"
import axios from "axios"
const ContactCenter = () => {
  const [tickets, setTickets] = useState([])
  const [activeTicket, setActiveTicket] = useState(null);
  const [messages, setMessages] = useState([])

  // Fetch Tickets
  const getAllTickets = async () => {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/ticket`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      console.log(res.data)
      setTickets(res.data.tickets);
      if (res.data.tickets.length > 0) {
        setActiveTicket(res.data.tickets[0]);
      }
    }).catch(err => {
      console.log(err)
    })
    // Auto select first ticket

  }

  // Generate Avatar
  const avatars = [
    "/avatar1.jpg",
    "/avatar2.jpg",
    "/avatar3.jpg",
    "/avatar4.jpg",
  ];

  const getAvatar = (name) => {
    if (!name) return avatars[0];
    const index = name.charCodeAt(0) % avatars.length;
    return avatars[index];
  };
  console.log(activeTicket)

  useEffect(() => {
    getAllTickets()

  }, [])
  return (
    <div className={styles['contactcenter-container']}>
      <div className={styles['chats-container']}>
        <span>Chats</span>
        <div className={styles['ticketList']}>
          {tickets.map(ticket => {
            return (<div
              key={ticket._id}
              className={`${styles.ticketItem} ${activeTicket?._id === ticket._id ? styles.active : ""}`}
              onClick={() => setActiveTicket(ticket)}
            >
              {/* <div className={styles['avatar']}></div> */}
              <img
                src={getAvatar(ticket.name)}
                alt={ticket.name}
                className={styles['avatar']}
              />
              <div className={styles['ticketName']}>{ticket.name}</div>
            </div>)
          })}
        </div>
      </div>
      <div className={styles['chatbox']}>
        {
          activeTicket && (<>
            <h1>{activeTicket.ticketId}</h1>
          </>)
        }
      </div>
      <div className={styles['ticket-assign']}>
        {activeTicket && (
          <>
            <img
              src={getAvatar(activeTicket.name)}
              alt={activeTicket.name}
              className={styles.avatar}
            />

            <h3>{activeTicket.name}</h3>
            <p>{activeTicket.phone}</p>
            <p>{activeTicket.email}</p>
          </>
        )}
      </div>

    </div>
  )
}

export default ContactCenter