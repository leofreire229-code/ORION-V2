type EnviConfig = { 
    supabaseUrl: string
    supabaseAnonkey: string
}

function getEnvVar(name:  'VITE_SUPABASE_URL' |  'VITE_SUPABASE_ANON_KEY'): string {
    const value= import.meta.env[name as keyof ImportMetaEnv] 

    if (! value || typeof value !=='string' || value.trim() ===''){   
        throw new Error(`${name} is required`)
    }
    return value
}
export const env:EnviConfig = {  
    supabaseUrl: getEnvVar("VITE_SUPABASE_URL"),
    supabaseAnonkey:getEnvVar("VITE_SUPABASE_ANON_KEY")
}