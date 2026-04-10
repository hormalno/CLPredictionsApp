import React, { useState } from 'react'
import './footer.css'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 5000);
  };

  return (
    <div className="footer-container1">
      <footer className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-top-grid">
            <div className="footer-brand-column">
              <div className="footer-logo-group">
                <div className="footer-logo-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"></path>
                      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"></path>
                    </g>
                  </svg>
                </div>
                <span className="footer-logo-text">MatchMates</span>
              </div>
              <p className="footer-brand-description">
                The ultimate match prediction platform for friends. Track stats,
                challenge your mates, and prove who really knows the beautiful
                game.
              </p>
              <div className="footer-social-links">
                <a href="#">
                  <div aria-label="Twitter" className="footer-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M22 4.01c-1 .49-1.98.689-3 .99c-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4c0 0-4.182 7.433 4 11c-1.872 1.247-3.739 2.088-6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58-1.04 6.522-3.723 7.651-7.742a13.8 13.8 0 0 0 .497-3.753c0-.249 1.51-2.772 1.818-4.013z"
                      ></path>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Discord" className="footer-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0-2 0m6 0a1 1 0 1 0 2 0a1 1 0 0 0-2 0"></path>
                        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833-1.667 3.5-3c.667-1.667.5-5.833-1.5-11.5c-1.457-1.015-3-1.34-4.5-1.5l-.972 1.923a11.9 11.9 0 0 0-4.053 0L9 4c-1.5.16-3.043.485-4.5 1.5c-2 5.667-2.167 9.833-1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2-2 2-3"></path>
                        <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                      </g>
                    </svg>
                  </div>
                </a>
                <a href="#">
                  <div aria-label="Github" className="footer-social-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="footer-links-column">
              <h2 className="footer-column-title">Quick Links</h2>
              <nav className="footer-nav">
                <a href="Homepage">
                  <div className="footer-nav-link">
                    <span>Home</span>
                  </div>
                </a>
                <a href="#">
                  <div className="footer-nav-link">
                    <span>Leaderboard</span>
                  </div>
                </a>
                <a href="#">
                  <div className="footer-nav-link">
                    <span>Upcoming Fixtures</span>
                  </div>
                </a>
                <a href="#">
                  <div className="footer-nav-link">
                    <span>My Predictions</span>
                  </div>
                </a>
                <a href="#">
                  <div className="footer-nav-link">
                    <span>Group Chat</span>
                  </div>
                </a>
              </nav>
            </div>
            <div className="footer-newsletter-column">
              <h2 className="footer-column-title">Weekly Digest</h2>
              <p className="footer-newsletter-text">
                Get prediction tips and weekend roundups straight to your inbox.
              </p>
              {submitted ? (
                <p style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-family-body)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  Thanks for joining the squad!
                </p>
              ) : (
              <form onSubmit={handleSubmit} className="footer-form">
                <div className="footer-input-wrapper">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    aria-label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="footer-input"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="footer-submit-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-6 6l6-6m-6-6l6 6"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
          <div className="footer-bottom-bar">
            <div className="footer-legal-links">
              <a href="#">
                <div className="footer-legal-link">
                  <span>Privacy Policy</span>
                </div>
              </a>
              <a href="#">
                <div className="footer-legal-link">
                  <span>Terms of Play</span>
                </div>
              </a>
              <a href="#">
                <div className="footer-legal-link">
                  <span>Cookie Settings</span>
                </div>
              </a>
            </div>
            <p className="footer-copyright">
              &amp;copy; 2026 Predict Mate. Built for friends, by friends.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
