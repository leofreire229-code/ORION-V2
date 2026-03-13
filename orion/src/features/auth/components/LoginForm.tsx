import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signInWithOAuth, signInWithPassword } from '../services/auth.service'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha.')
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)

    const result = await signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (!result.success) {
      setErrorMessage(result.message)
      setIsSubmitting(false)
      return
    }

    window.location.reload()
  }

  async function handleGoogleLogin() {
    setIsSubmitting(true)
    setErrorMessage(null)

    const result = await signInWithOAuth('google')

    if (!result.success) {
      setErrorMessage(result.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.formShell}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Entrar</h2>
        <p className={styles.subheading}>
          Acesse sua área de trabalho no ÓRION.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="seu@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Senha
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        {errorMessage ? (
          <p className={styles.errorMessage}>{errorMessage}</p>
        ) : null}

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <span className={styles.googleIcon} aria-hidden="true">
            G
          </span>
          <span className={styles.googleText}>Continue com o Google</span>
        </button>
      </form>

      <div className={styles.footer}>
        <span className={styles.footerText}>Ainda não tem conta?</span>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => navigate('/cadastro')}
        >
          Cadastrar
        </button>
      </div>
    </div>
  )
}