import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { SignupPage } from '../features/auth/pages/SignupPage'
import { useBootstrap } from './bootstrap/useBootstrap'

function LoadingScreen() {
  return <div>Carregando...</div>
}

function ErrorScreen({ message }: { message: string }) {
  return <div>Erro: {message}</div>
}

function PrivateApp() {
  return <div>Área autenticada do ÓRION</div>
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function AppRouter() {
  const bootstrap = useBootstrap()

  if (bootstrap.status === 'loading') {
    return <LoadingScreen />
  }

  if (bootstrap.status === 'error') {
    return <ErrorScreen message={bootstrap.message} />
  }

  return (
    <BrowserRouter>
      {bootstrap.status === 'unauthenticated' ? <PublicRoutes /> : <PrivateRoutes />}
    </BrowserRouter>
  )
}