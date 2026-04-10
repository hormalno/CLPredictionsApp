import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './navigation.css'

const Logo = () => (
  <div aria-label="Predict Mate Home" className="navigation-logo-link">
    <div className="navigation-logo-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
        </g>
      </svg>
    </div>
    <span className="navigation-brand-name section-title">PredictMate</span>
  </div>
)

const navLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'My Predictions', to: '/' },
  { label: 'Leagues', to: '/' },
  { label: 'Leaderboard', to: '/' },
]

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
      <nav className="navigation-wrapper">
        <div className="navigation-container">
          <Link to="/"><Logo /></Link>
          <div className="navigation-desktop-menu">
            <ul className="navigation-links-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="navigation-link">{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="navigation-actions">
              <button className="btn btn-outline btn-sm">Sign In</button>
              <button className="btn btn-sm btn-primary">Join Group</button>
            </div>
          </div>
          <button
            aria-label="Open Menu"
            aria-expanded={menuOpen}
            className="navigation-mobile-toggle"
            onClick={openMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div className={`navigation-mobile-overlay${menuOpen ? ' is-active' : ''}`}>
        <div className="navigation-overlay-header">
          <Link to="/" onClick={closeMenu}><Logo /></Link>
          <button aria-label="Close Menu" className="navigation-mobile-toggle" onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zm-5.5-3.5l-5 5m0-5l5 5"></path>
            </svg>
          </button>
        </div>
        <div className="navigation-overlay-content">
          <ul className="navigation-overlay-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="navigation-overlay-link" onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navigation-overlay-actions">
            <button className="btn btn-outline btn-lg" onClick={closeMenu}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation
