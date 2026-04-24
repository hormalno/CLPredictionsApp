import { Link } from 'react-router-dom'
import Navigation from '../../components/navigation/Navigation'
import Footer from '../../components/footer/Footer'
import './RegisterPage.css'

const RegisterPage = () => {
  return (
    <>        
      <Navigation></Navigation>              
      <main className="register-main">
        <div className="register-bg-overlay">
          <img
            alt="Stadium Atmosphere"
            src="https://images.pexels.com/photos/16826138/pexels-photo-16826138.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1500"
            className="register-bg-img"
          />
        </div>
        <div className="register-content">
          <div className="register-card">
            <div className="register-header">
              <h2 className="section-title">Join Predict Mate</h2>
              <p className="section-content register-intro">
                Ready to beat your friends? Create your account and start
                predicting today.
              </p>
            </div>
            <form
              action="/register"
              method="POST"
              data-form-id="004aea6b-f644-4c0b-a81e-d1bba0231f13"
              className="register-form"
            >
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required={true}
                    minlength={3}
                    placeholder="Enter your username"
                    data-form-field-id="username"
                    className="register-form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required={true}
                    placeholder="name@example.com"
                    data-form-field-id="email"
                    className="register-form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required={true}
                    minlength={8}
                    placeholder="••••••••"
                    data-form-field-id="password"
                    className="register-form-input"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    required={true}
                    minlength={8}
                    placeholder="••••••••"
                    data-form-field-id="confirm-password"
                    className="register-form-input"
                  />
                </div>
              </div>
              <div className="form-footer">
                <button
                  id="thq_button_5evD"
                  name="button"
                  type="submit"
                  data-form-field-id="thq_button_5evD"
                  className="btn-primary btn-lg btn register-submit"
                >
                  Create Account
                </button>
                <p className="sign-in-link section-content">
                  <span>
                    {' '}
                    Already have an account?
                  </span>
                  <Link to="/login" className="btn-link">
                    <div className="btn-link">
                      <span>Sign in</span>
                    </div>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main> 
      <Footer />
    </>
  )
} 

export default RegisterPage;