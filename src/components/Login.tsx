import axios from 'axios'
import { AlertCircle, LogIn } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../store/auth'

export default function Login(){
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()

  const handle = async(e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!u.trim() || !p.trim()) {
        setError('Username and password are required')
        setLoading(false)
        return
      }

      const r = await axios.post('/login', { username: u, password: p })
      login(r.data.token, r.data.user)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Try username: test, password: test123')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <LogIn className="text-indigo-600" size={24} />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Welcome</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to your account</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handle}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="test"
              value={u}
              onChange={(e) => setU(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="test123"
              value={p}
              onChange={(e) => setP(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Demo credentials: <br />
          <span className="font-mono text-gray-700">test / test123</span>
        </p>
      </div>
    </div>
  )
}
