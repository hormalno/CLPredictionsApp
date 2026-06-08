import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../features/auth/useAuth'
import { TrophyIcon, TrophyFilledIcon, GlobeIcon, UserIcon, MenuIcon, FootballCloseIcon, LogInIcon, LogOutIcon } from '../icons/Icons'
import { Button } from '../button/Button'
import './Navigation.css'


const Navigation = () => {
  const { isAuthenticated, username, isSuperuser, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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
              <div className="navigation-left">
                <div className="navigation-brand">
                  <Link to="/">
                    <div aria-label="Predict Mate Home" className="navigation-logo-link">
                      <div className="navigation-logo-icon">
                        <TrophyIcon size={30} />
                        <span className="navigation-brand-name section-title">PredictMate</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="navigation-links-desktop">
                  <div className="navigation-link">
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </div>
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
                  {isSuperuser && (
                    <div className="navigation-link">
                      <Link to="/admin">
                        <span>Admin</span>
                      </Link>
                    </div>
                  )}
                </div>
                </div>
                <div className="navigation-actions-desktop">                
                  {isAuthenticated
                    ? (
                    <>
                      <Link to="/profile">
                        {/* <Button variant="secondary" size="sm"> */}
                          
                          <span className="navigation-link"><UserIcon size={18} /> Welcome, {username}!</span>
                        {/* </Button> */}
                      </Link>
                      <Button onClick={handleLogout} variant="secondary" size="sm">
                        <LogOutIcon size={18} />
                        <span>Log Out</span>
                      </Button>
                    </>)
                    : (<Link to="/login">
                        <Button variant="secondary" size="sm">
                          <LogInIcon size={18} />
                          <span>Log In</span>
                        </Button>
                      </Link>)
                  }
                  {/* <div className="navigation-language-picker">
                    <div className="navigation-action-icon">
                      <GlobeIcon size={20} />
                    </div>
                    <span className="navigation-link">EN</span>
                    <ChevronDownIcon size={16} />
                  </div> */}
                </div>
                <button
                  id="navToggle"
                  aria-label="Toggle navigation"
                  aria-expanded={menuOpen}
                  onClick={openMenu}
                  className="navigation-mobile-toggle"
                >
                  <MenuIcon size={24} />
                </button>
            </div>
          </nav>
          <div id="mobileOverlay" className={`navigation-mobile-overlay${menuOpen ? ' is-open' : ''}`}>
            <div className="navigation-mobile-header">
              <div className="navigation-brand">
                <a href="Homepage">
                  <div className="navigation-logo-link">
                    <TrophyFilledIcon size={24} className="navigation-icon23" />
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
                <FootballCloseIcon size={24} />
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
                  <GlobeIcon size={20} />
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
