'use client'

import { useEffect, useState } from 'react'
import { authService } from '@/services/auth'
import type { User } from '@/types/auth'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0
  })
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const users = await authService.getAllUsers()
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          inactiveUsers: users.filter(u => !u.isActive).length
        })
        setRecentUsers(users.slice(0, 5))
      } catch (error) {
        console.error('Failed to load dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-700 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-700 text-sm font-medium">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-700 text-sm font-medium">Inactive Users</h3>
          <p className="text-3xl font-bold text-red-600">{stats.inactiveUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Recent Users</h2>
        <div className="divide-y">
          {recentUsers.map(user => (
            <div key={user.id} className="py-3">
              <p className="font-medium text-gray-900">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}