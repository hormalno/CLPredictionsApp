import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
  
  return (
    <div className="footer-container1">
          <footer className="footer-root">
            <div className="footer-container">
              <div className="footer-grid">
                <div className="footer-brand-column">
                  <a href="Homepage">
                    <div className="footer-logo-link">
                      <div className="footer-logo-icon">
                        <svg
                          fill="none"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                            width="18"
                            height="18"
                          ></rect>
                          <path d="m15 9-6 6"></path>
                          <path d="m9 9 6 6"></path>
                        </svg>
                      </div>
                      <span className="footer-brand-name">Predict Mate</span>
                    </div>
                  </a>
                  <p className="footer-description section-content">
                    The ultimate companion for match predictions among colleagues
                    and friends. Rise through the ranks, dominate the leaderboard,
                    and prove your football intuition.
                  </p>
                  <div className="footer-social-links">
                    <a href="#">
                      <div aria-label="Facebook" className="footer-social-icon">
                        <svg
                          fill="none"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2z"></path>
                        </svg>
                      </div>
                    </a>
                    <a href="#">
                      <div aria-label="Twitter" className="footer-social-icon">
                        <svg
                          fill="none"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </div>
                    </a>
                    <a href="#">
                      <div aria-label="Instagram" className="footer-social-icon">
                        <svg
                          fill="none"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            rx="5"
                            ry="5"
                            width="20"
                            height="20"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="footer-links-column">
                  <h3 className="section-subtitle footer-column-title">
                    Game Center
                  </h3>
                  <nav className="footer-nav">
                    <ul className="footer-list">
                      <li className="footer-list-item">
                        <Link to="/predictions">
                          <div className="footer-link">
                            <span>My Predictions</span>
                          </div>
                        </Link>
                      </li>
                      <li className="footer-list-item">
                        <a href="#">
                          <div className="footer-link">
                            <span>Active Leagues</span>
                          </div>
                        </a>
                      </li>
                      <li className="footer-list-item">
                        <a href="#">
                          <div className="footer-link">
                            <span>Leaderboards</span>
                          </div>
                        </a>
                      </li>
                      <li className="footer-list-item">
                        <Link to="/profile-settings">
                          <div className="footer-link">
                            <span>My Profile</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="footer-info-column">
                  <h3 className="section-subtitle footer-column-title">Platform</h3>
                  <div className="footer-stats-card">
                    <div className="footer-stat-item">
                      <div className="footer-stat-icon">
                        <svg
                          fill="none"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                          <path d="M4 22h16"></path>
                          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                        </svg>
                      </div>
                      <div className="footer-stat-content">
                        <span className="footer-stat-value">12,450+</span>
                        <span className="footer-stat-label">Active Players</span>
                      </div>
                    </div>
                  </div>
                  <div className="footer-language-selector">
                    <label htmlFor="footer-lang" className="footer-lang-label">
                      Language
                    </label>
                    <div className="footer-select-wrapper">
                      <select id="footer-lang" className="footer-select">
                        <option value="en">English (US)</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                      <div className="footer-select-chevron">
                        <svg
                          fill="none"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                          height="16"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="footer-copyright">
                  <span>© 2026 Predict Mate. All rights reserved.</span>
                </div>
              </div>
            </div>
          </footer>
          <div className="footer-container2">
            <div className="footer-container3">
            </div>
          </div>
        </div>
  )
}

export default Footer
