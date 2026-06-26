import React from 'react'
import logo from '../../../assets/logo.png'
import { language } from '../../../scripts/language'

const Profile = ({ lang }) => {
  return (
    <div className="profile-card">

      <div className="profile-logo">
        <img
          src={logo}
          alt="Music Master"
          className="profile-logo-img"
        />
      </div>

      <div className="profile-info">
        <h1 style={{ textAlign: 'center', color: 'var(--gold)' }}>Mashallah Mix</h1>
        <p>{language?.[lang].logo}</p>
      </div>

    </div>
  )
}

export default Profile