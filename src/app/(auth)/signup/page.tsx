'use client'

import { useState } from 'react'

const SignupPage = () => {
  const [loading, setLoading] = useState(false)

  const fields = [
    { label: 'username', type: 'text' },
    { label: 'email', type: 'email' },
    { label: 'password', type: 'password' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)

    const body = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.message || 'Something went wrong')
      alert('Signup successful!')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-emerald-50 to-emerald-400 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <div key={index} className="w-full">
              <label className="block text-white text-sm font-semibold mb-2" htmlFor={field.label}>
                {field.label.charAt(0).toUpperCase() + field.label.slice(1)}
              </label>
              <input
                type={field.type}
                name={field.label}
                id={field.label}
                className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/20 text-white placeholder-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 animate-spin"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#fff"
                    strokeWidth="4"
                    style={{ opacity: 0.25 }}
                  />
                  <path
                    fill="#fff"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage