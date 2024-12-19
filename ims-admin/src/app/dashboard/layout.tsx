'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authService } from '@/services/auth'
import type { User } from '@/types/auth'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/auth/login')
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      } catch {
        router.push('/auth/login')
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">IMS Admin</h2>
          <p className="text-sm">{user?.username}</p>
        </div>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/users" className="block p-2 hover:bg-gray-700 rounded">
              User Management
            </Link>
          </li>
          <li>
            <button 
              data-testid="logout-button"
              onClick={handleLogout}
              className="w-full text-left p-2 hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  )
}