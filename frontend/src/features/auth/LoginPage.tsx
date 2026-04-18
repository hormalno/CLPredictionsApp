import Navigation from '../../components/navigation/Navigation'
import Footer from '../../components/footer/Footer'
import './LoginPage.css'
import { Link } from 'react-router-dom'
import { UserIcon, LockIcon } from '../../components/icons/Icons'

const Login = () => {
  return (
    <div className="login-container1">
      <Navigation />
      <section className="login-section">
        <div className="login-background">
          <img
            alt="Stadium Atmosphere"
            src="https://images.pexels.com/photos/7545413/pexels-photo-7545413.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            className="login-bg-image"
          />
          <div className="login-overlay"></div>
        </div>
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h2 className="section-title">Sign In</h2>
              <p className="section-content">Welcome back, Predict Mate!</p>
            </div>
            <form
              action="/login"
              method="POST"
              data-form-id="805b42e2-6979-422d-9b1e-699b5d6b9ca1"
              className="login-form"
            >
              <div className="form-group login-form-group">
                <label
                  htmlFor="username"
                  className="form-label login-form-label"
                >
                  Email or Username
                </label>
                <div className="login-input-wrapper">
                  <UserIcon size={18} />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required={true}
                    placeholder="Enter your email"
                    data-form-field-id="username"
                    className="login-form-input"
                  />
                </div>
              </div>
              <div className="form-group login-form-group">
                <div className="label-row">
                  <label
                    htmlFor="password"
                    className="form-label login-form-label"
                  >
                    Password
                  </label>
                  <a href="#">
                    <div className="btn-sm btn-link">
                      <span>Forgot?</span>
                    </div>
                  </a>
                </div>
                <div className="login-input-wrapper">
                  <LockIcon size={18} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required={true}
                    placeholder="••••••••"
                    data-form-field-id="password"
                    className="login-form-input"
                  />
                </div>
              </div>
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="remember"
                  />
                  <span className="login-checkmark"></span>
                  <span className="section-content">Remember me</span>
                </label>
              </div>
              <button
                name="button"
                type="submit"
                className="btn-primary login-submit-btn btn-lg btn"
              >
                Sign In
              </button>
            </form>
            <div className="login-footer">
              <p className="section-content">Don&apos;t have an account?</p>
              <Link to="/register">
                <div className="btn-link">
                  <span>Create an account</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Login
