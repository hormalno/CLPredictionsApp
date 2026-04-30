import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../../components/navigation/Navigation'
import Footer from '../../components/footer/Footer'
import { register } from '../../api'
import './RegisterPage.css'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await register(form)
      navigate('/login')
    } catch (err: any) {
      const data = err.response?.data
      const message = data
        ? Object.values(data).flat().join(' ')
        : 'Registration failed.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="register-main">
        <div className="register-bg-overlay">
          <img
            alt="Stadium Atmosphere"
            src="https://images.pexels.com/photos/16826138/pexels-photo-16826138.jpeg?auto=compress&cs=tinysrgb&w=1500"
            className="register-bg-img"
          />
        </div>
        <div className="register-content">
          <div className="register-card">
            <div className="register-header">
              <h2 className="section-title">Join Predict Mate</h2>
              <p className="section-content register-intro">
                Ready to beat your friends? Create your account and start predicting today.
              </p>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
              {error && <p className="form-error">{error}</p>}
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    minLength={3}
                    placeholder="Enter your username"
                    className="register-form-input"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className="register-form-input"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minLength={2}
                    placeholder="••••••••"
                    className="register-form-input"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password2" className="form-label">Confirm Password</label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    required
                    minLength={2}
                    placeholder="••••••••"
                    className="register-form-input"
                    value={form.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary btn-lg btn register-submit"
                >
                  {loading ? 'Creating...' : 'Create Account'}
                </button>
                <p className="sign-in-link section-content">
                  <span>Already have an account?</span>
                  <Link to="/login" className="btn-link">
                    <span>Sign in</span>
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

export default RegisterPage
