'use client'

import { useState } from 'react'
import type { User } from '@/types/auth'
import { UpdateUserDTO } from '@/types/auth'

interface EditUserModalProps {
    user: User;
    onClose: () => void;
    onSave: (userData: UpdateUserDTO) => Promise<void>;
}

export default function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
    const [userData, setUserData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || '',
        isActive: user?.isActive || false,
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting update:', userData); // Add debug logging
        await onSave(userData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96" role="dialog" aria-labelledby="modal-title">
                <h2 id="modal-title" className="text-xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit} aria-label="Edit user form">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                            className="w-full p-2 border rounded"
                            placeholder="Enter username"
                            aria-label="Username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={userData.password}
                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Enter new password (leave blank to keep current)"
                            aria-label="Password"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="w-full p-2 border rounded"
                            placeholder="Enter email address"
                            aria-label="Email address"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
                        <select
                            id="role"
                            value={userData.role}
                            onChange={(e) => setUserData({...userData, role: e.target.value})}
                            className="w-full p-2 border rounded"
                            aria-label="Select user role"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="Admin">Admin</option>
                            <option value="Worker">Worker</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                id="isActive"
                                type="checkbox"
                                checked={userData.isActive}
                                onChange={(e) => setUserData({...userData, isActive: e.target.checked})}
                                className="mr-2"
                                aria-label="User active status"
                            />
                            <span>Active</span>
                        </label>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            aria-label="Cancel edit"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            aria-label="Save changes"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}