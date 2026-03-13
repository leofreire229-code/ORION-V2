import styles from './SignupPage.module.css'

export function SignupPage() {
  return (
    <section className={styles.page}>
      <div className={styles.backgroundGlow} />

      <div className={styles.wrapper}>
        <div className={styles.brandBlock}>
          <img
            src="/logo-orion.png"
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

          <form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                NOME
              </label>
              <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Seu nome"
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
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}