import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../../components/navigation/Navigation'
import Footer from '../../components/footer/Footer'
import { UserIcon, LockIcon } from '../../components/icons/Icons'
import { login } from '../../api'
import './LoginPage.css'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await login(form.username, form.password)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      navigate('/')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container1">
      <Navigation />
      <section className="login-section">
        <div className="login-background">
          <img
            alt="Stadium Atmosphere"
            src="https://images.pexels.com/photos/7545413/pexels-photo-7545413.jpeg?auto=compress&cs=tinysrgb&w=1500"
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
            <form className="login-form" onSubmit={handleSubmit}>
              {error && <p className="form-error">{error}</p>}
              <div className="form-group login-form-group">
                <label htmlFor="username" className="form-label login-form-label">
                  Username
                </label>
                <div className="login-input-wrapper">
                  <UserIcon size={18} />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Enter your username"
                    className="login-form-input"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group login-form-group">
                <div className="label-row">
                  <label htmlFor="password" className="form-label login-form-label">
                    Password
                  </label>
                </div>
                <div className="login-input-wrapper">
                  <LockIcon size={18} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="••••••••"
                    className="login-form-input"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary login-submit-btn btn-lg btn"
              >
                {loading ? 'Signing in...' : 'Sign In'}
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
      <Footer />
    </div>
  )
}

export default Login
