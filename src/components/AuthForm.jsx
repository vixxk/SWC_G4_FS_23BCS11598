import { useState } from 'react'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar

  const isValid = isEmailValid && isPasswordValid

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
        setPassword('')
      }, 3000)
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Secure Gateway</h2>
        <p>Access your dashboard with validated credentials</p>
      </div>

      {isSubmitted ? (
        <div className="auth-success-alert">
          <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div className="success-text">
            <h4>Authentication Successful</h4>
            <p>You have been safely authenticated.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="auth-email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={email ? (isEmailValid ? 'valid' : 'invalid') : ''}
              />
              {email && (
                <span className="validation-badge">
                  {isEmailValid ? (
                    <span className="badge-valid">✓</span>
                  ) : (
                    <span className="badge-invalid">✗</span>
                  )}
                </span>
              )}
            </div>
            {email && !isEmailValid && (
              <p className="error-text">Please enter a valid email address.</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <div className="input-wrapper">
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={password ? (isPasswordValid ? 'valid' : 'invalid') : ''}
              />
            </div>
            
            <div className="password-rules">
              <div className={`rule-item ${hasMinLength ? 'met' : 'unmet'}`}>
                <span className="rule-dot"></span>
                At least 8 characters
              </div>
              <div className={`rule-item ${hasNumber ? 'met' : 'unmet'}`}>
                <span className="rule-dot"></span>
                At least 1 number
              </div>
              <div className={`rule-item ${hasSpecialChar ? 'met' : 'unmet'}`}>
                <span className="rule-dot"></span>
                At least 1 special character
              </div>
            </div>
          </div>

          <button type="submit" disabled={!isValid} className="auth-submit-btn">
            Sign In
          </button>
        </form>
      )}
    </div>
  )
}
