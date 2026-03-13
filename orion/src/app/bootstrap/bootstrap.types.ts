export type BootstrapProfile = {
    id: string
    full_name: string | null
    role: string | null
}

export type BootstrapLab = {
    id: string
    name: string
}

export type BootstrapContext = {
    userId: string
    email: string | null
    profile: BootstrapProfile | null
    activeLab: BootstrapLab | null
}

export type BootstrapState =
| { status: 'loading'}
| { status: 'unauthenticated' }
| { status: 'ready'; context: BootstrapContext }
| { status: 'error'; message: string }
