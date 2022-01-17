import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faBell, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const { user: currentUser } = useSelector((state) => state.auth)
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            id="MDB-logo"
            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
            alt="MDB Logo"
            draggable="false"
            height="30"
          />
        </a>
        <button type="button" onClick={() => changeLanguage('ru')}>
          ru
        </button>
        <button type="button" onClick={() => changeLanguage('en')}>
          en
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link mx-2" href="/accounts">
                <FontAwesomeIcon icon={faPlusCircle} /> {t('Accounts')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="/dashboard">
                <FontAwesomeIcon icon={faBell} /> {t('Dashboard')}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-2" href="/categories">
                <FontAwesomeIcon icon={faHeart} />
                {t('Categories')}
              </a>
            </li>
            <li className="nav-item ms-3">
              <a className="btn bg-black text-white rounded-lg" href="/login">
                <FontAwesomeIcon icon={faUser} />{' '}
                {currentUser && currentUser.email ? currentUser.email : 'Sign in'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
