import { supabase } from '../../../lib/supabase'
import type {
  AuthCredentials,
  AuthResult,
  OAuthProvider,
  SignUpPayload,
} from '../types/auth.types'

export async function signInWithPassword(
  credentials: AuthCredentials,
): Promise<AuthResult> {
  const { email, password } = credentials

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return { success: true }
}

export async function signUp(
  payload: SignUpPayload,
): Promise<AuthResult> {
  const { name, email, password } = payload

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return { success: true }
}
export async function signInWithOAuth(
  provider: OAuthProvider,
): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return { success: true }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}