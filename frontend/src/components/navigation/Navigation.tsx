import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button/Button'
import './Navigation.css'

const Logo = () => (
  <div aria-label="Predict Mate Home" className="navigation-logo-link">
    <div className="navigation-logo-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
        </g>
      </svg>
      <span className="navigation-brand-name section-title">PredictMate</span>
    </div>    
  </div>
)

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = () => {
    setMenuOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && menuOpen) closeMenu()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [menuOpen])

  return (
    <div className="navigation-container1">
          <nav className="navigation-container">
            <div className="navigation-bar">
              <div className="navigation-brand">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              <div className="navigation-links-desktop">
                <div className="navigation-link">
                  <Link to="/predictions">
                    <span>My Predictions</span>
                  </Link>
                </div>        
                <div className="navigation-link">      
                  <Link to="/league">                  
                    <span>League</span>
                  </Link>
                </div>                
                <div className="navigation-link">
                  <Link to="/leaderboard">
                    <span>Leaderboard</span>
                  </Link>
                </div>
              </div>
              <div className="navigation-actions-desktop">
                <div className="navigation-language-picker">
                  <div className="navigation-action-icon">
                    <svg
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle r="10" cx="12" cy="12"></circle>
                        <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20"></path>
                      </g>
                    </svg>
                  </div>
                  <span className="navigation-link">EN</span>
                  <svg
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m6 9l6 6l6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <Link to="/profile-settings">
                  <Button variant="secondary" size="sm">
                    <svg
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle r="4" cx="12" cy="7"></circle>
                      </g>
                    </svg>
                    <span>My Profile</span>
                  </Button>
                </Link>
              </div>
              <button
                id="navToggle"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={openMenu}
                className="navigation-mobile-toggle"
              >
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                  className="icon-menu"
                >
                  <path
                    d="M4 5h16M4 12h16M4 19h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </nav>
          <div id="mobileOverlay" className={`navigation-mobile-overlay${menuOpen ? ' is-open' : ''}`}>
            <div className="navigation-mobile-header">
              <div className="navigation-brand">
                <a href="Homepage">
                  <div className="navigation-logo-link">
                    <svg
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      className="navigation-icon23"
                    >
                      <path
                        d="M17 3a1 1 0 0 1 .993.883L18 4v2.17a3 3 0 1 1 0 5.659V12a6 6 0 0 1-5 5.917V20h3a1 1 0 0 1 .117 1.993L16 22H8a1 1 0 0 1-.117-1.993L8 20h3v-2.083a6 6 0 0 1-4.996-5.692L6 12v-.171a3 3 0 0 1-3.996-2.653L2.001 9l.005-.176A3 3 0 0 1 6.001 6.17L6 4a1 1 0 0 1 1-1zM5 8a1 1 0 1 0 0 2a1 1 0 0 0 0-2m14 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="section-title">Predict Mate</span>
                  </div>
                </a>
              </div>
              <button
                id="navClose"
                aria-label="Close navigation"
                onClick={closeMenu}
                className="navigation-mobile-close"
              >
                <svg
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="m15 18l-.722-3.25M2 8a10.645 10.645 0 0 0 20 0m-2 7l-1.726-2.05M4 15l1.726-2.05M9 18l.722-3.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="navigation-mobile-content">
              <div className="navigation-mobile-links">
                <Link to="/predictions" onClick={closeMenu}>
                  <div className="navigation-mobile-link">
                    <span>My Predictions</span>
                  </div>
                </Link>
                <a href="Homepage" onClick={closeMenu}>
                  <div className="navigation-mobile-link">
                    <span>League</span>
                  </div>
                </a>
                <a href="Homepage" onClick={closeMenu}>
                  <div className="navigation-mobile-link">
                    <span>Leaderboard</span>
                  </div>
                </a>
                <hr className="navigation-divider"></hr>
                <Link to="/profile-settings" onClick={closeMenu}>
                  <div className="navigation-mobile-link">
                    <span>My Profile</span>
                  </div>
                </Link>
                <div className="navigation-mobile-link navigation-mobile-lang">
                  <svg
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle r="10" cx="12" cy="12"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20"></path>
                    </g>
                  </svg>
                  <span>Language: English</span>
                </div>
              </div>
              <div className="navigation-mobile-footer">
                <Link to="/profile-settings">
                  <div className="btn-primary btn-lg btn navigation-full-width">
                    <span>Sign In</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Navigation
