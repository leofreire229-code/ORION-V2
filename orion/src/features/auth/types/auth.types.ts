export type AuthCredentials = {
    email: string
    password: string
}

export type SignUpPayload = {
    name: string
    email: string
    password: string
}

export type AuthResult =
| { success: true}
| {success: false; message: string }

export type OAuthProvider = 'google'