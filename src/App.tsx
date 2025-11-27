import React from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { useAuthStore } from './store/auth'

export default function App() {
  const { token } = useAuthStore()
  return token ? <Dashboard /> : <Login />
}
