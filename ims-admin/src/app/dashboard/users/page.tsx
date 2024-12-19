'use client'

import { useEffect, useState } from 'react'
import { authService } from '@/services/auth'
import type { User, RegisterDTO } from '@/types/auth'
import EditUserModal from './components/EditUserModal'
import CreateUserModal from './components/CreateUserModal'
import { UpdateUserDTO } from '@/types/auth';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreate = async (userData: RegisterDTO) => {
        try {
            await authService.createUser(userData);
            // Refresh user list
            const updatedUsers = await authService.getAllUsers();
            setUsers(updatedUsers);
            setShowCreateModal(false);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await authService.deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    }
  };

  const handleSave = async (userData: UpdateUserDTO): Promise<void> => {
    if (!selectedUser) return;
    try {
        const updatedUser = await authService.updateUser(selectedUser.id, userData);
        setUsers(users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
        ));
        setSelectedUser(null);
    } catch (error) {
        console.error('Failed to update user:', error);
    }
};

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await authService.getAllUsers()
        setUsers(data)
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div>Loading...</div>

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <button
                    data-testid="create-user-button"
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create User
                </button>
            <div>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-gray-900"
                />
            </div>
        </div>

        <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b">
                        <th className="px-6 py-3 text-left text-gray-900 font-semibold">Username</th>
                        <th className="px-6 py-3 text-left text-gray-900 font-semibold">Email</th>
                        <th className="px-6 py-3 text-left text-gray-900 font-semibold">Role</th>
                        <th className="px-6 py-3 text-left text-gray-900 font-semibold">Status</th>
                        <th className="px-6 py-3 text-left text-gray-900 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
    {filteredUsers.map(user => (
        <tr key={user.id} className="border-b" data-testid="user-row">
            <td className="px-6 py-4 text-gray-900">{user.username}</td>
            <td className="px-6 py-4 text-gray-900">{user.email}</td>
            <td className="px-6 py-4 text-gray-900">{user.role}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4">
                <button 
                    data-testid={`edit-${user.username}`}
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-800 mr-2 font-medium"
                >
                    Edit
                </button>
                <button 
                    data-testid={`delete-${user.username}`}
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                >
                    Delete
                </button>
            </td>
        </tr>
    ))}
</tbody>
            </table>
        </div>

        {selectedUser && (
            <EditUserModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onSave={handleSave}
            />
        )}

        {showCreateModal && (
            <CreateUserModal
                onClose={() => setShowCreateModal(false)}
                onSave={handleCreate}
            />
        )}
    </div>
)
}