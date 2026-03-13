import styles from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const navigate = useNavigate()

  return (
    <div className={styles.formShell}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Entrar</h2>
        <p className={styles.subheading}>
          Acesse sua área de trabalho no ÓRION.
        </p>
      </div>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="seu@gmail.com"
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
          />
        </div>

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <button type="button" className={styles.googleButton}>
          <span className={styles.googleIcon} aria-hidden="true">G</span>
          <span>Continuar com Google</span>
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