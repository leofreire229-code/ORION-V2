import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp } from '../services/auth.service'
import styles from './SignupPage.module.css'

export function SignupPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedName = name.trim()
    const normalizedEmail = email.trim()

    if (!normalizedName || !normalizedEmail || !password.trim()) {
      setErrorMessage('Preencha nome, e-mail e senha.')
      setSuccessMessage(null)
      return
    }

    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    const result = await signUp({
      name: normalizedName,
      email: normalizedEmail,
      password,
    })

    if (!result.success) {
      setErrorMessage(result.message)
      setIsSubmitting(false)
      return
    }

    setSuccessMessage('Conta criada com sucesso. Verifique seu e-mail ou volte para entrar.')
    setIsSubmitting(false)
  }

  return (
    <section className={styles.page}>
      <div className={styles.backgroundGlow} />

      <div className={styles.wrapper}>
        <div className={styles.brandBlock}>
          <img
            src="/logo-orion-light.png"
            alt="ÓRION LAB"
            className={styles.logo}
          />
        </div>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Criar Conta</h1>
            <p className={styles.subheading}>
              Cadastre-se para acessar sua área de trabalho no ÓRION.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Nome
              </label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </div>

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
                autoComplete="new-password"
              />
            </div>

            {errorMessage ? (
              <p className={styles.errorMessage}>{errorMessage}</p>
            ) : null}

            {successMessage ? (
              <p className={styles.successMessage}>{successMessage}</p>
            ) : null}

            <button type="submit" className={styles.button} disabled={isSubmitting}>
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate('/')}
            >
              Voltar para entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}