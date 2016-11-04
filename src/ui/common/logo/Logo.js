import React from 'react'
import img from './logo.png'
import styles from './Logo.css'

const Logo = (props) => (
  <div className="Logo">
    <img src={img} className={styles.logoImg} alt="logo" />
  </div>
)

export default Logo
