import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { BootstrapState } from './bootstrap.types'

export function useBootstrap(): BootstrapState {
  const [state, setState] = useState<BootstrapState>({ status: 'loading' })

  useEffect(() => {
    let isMounted = true

    async function runBootstrap() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          if (!isMounted) return
          setState({
            status: 'error',
            message: sessionError.message,
          })
          return
        }

        if (!session?.user) {
          if (!isMounted) return
          setState({ status: 'unauthenticated' })
          return
        }

        const user = session.user

        if (!isMounted) return
        setState({
          status: 'ready',
          context: {
            userId: user.id,
            email: user.email ?? null,
            profile: null,
            activeLab: null,
          },
        })
      } catch (error) {
        if (!isMounted) return

        setState({
          status: 'error',
          message:
            error instanceof Error
              ? error.message
              : 'Erro ao inicializar aplicação',
        })
      }
    }

    runBootstrap()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}