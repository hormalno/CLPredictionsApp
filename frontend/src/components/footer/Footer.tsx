import { Link } from 'react-router-dom';
import { XSquareIcon, FacebookIcon, TwitterIcon, InstagramIcon, TrophyCupIcon, ChevronDownIcon } from '../icons/Icons';
import './Footer.css'

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
                        <XSquareIcon size={24} />
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
                        <FacebookIcon size={24} />
                      </div>
                    </a>
                    <a href="#">
                      <div aria-label="Twitter" className="footer-social-icon">
                        <TwitterIcon size={24} />
                      </div>
                    </a>
                    <a href="#">
                      <div aria-label="Instagram" className="footer-social-icon">
                        <InstagramIcon size={24} />
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
                        <TrophyCupIcon size={20} />
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
                        <ChevronDownIcon size={16} />
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
