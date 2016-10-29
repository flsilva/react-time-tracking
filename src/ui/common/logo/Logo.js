import React from 'react'
import img from './logo.png'
import './Logo.css'

const Logo = (props) => (
  <div className="Logo">
    <img src={img} className="logo-img" alt="logo" />
  </div>
)

export default Logo
