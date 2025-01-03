'use client'
import { useState } from 'react'
import { RegisterDTO } from '@/types/auth'

interface CreateUserModalProps {
    onClose: () => void;
    onSave: (userData: RegisterDTO) => Promise<void>;
}

export default function CreateUserModal({ onClose, onSave }: CreateUserModalProps) {
    const [userData, setUserData] = useState<RegisterDTO>({
        username: '',
        email: '',
        password: '',
        passwordHash: '',
        role: 'Worker',
        isActive: true  
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(userData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create User</h2>
                <form onSubmit={handleSubmit}>
            <div className="mb-4">
        <label htmlFor="username" className="block font-medium mb-1 text-black">Username</label>
        <input
        id="username"
        data-testid="create-username"
        type="text"
        value={userData.username}
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        className="w-full p-2 border rounded text-black"
        placeholder="Enter username"
        aria-label="Username"
        required
        />
    </div>
    <div className="mb-4">
        <label htmlFor="email" className="block font-medium mb-1 text-black">Email</label>
        <input
        id="email"
        data-testid="create-email"
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        className="w-full p-2 border rounded text-black"
        placeholder="Enter email"
        aria-label="Email"
        required
        />
    </div>
    <div className="mb-4">
        <label htmlFor="password" className="block font-medium mb-1 text-black">Password</label>
        <input
        id="password"
        data-testid="create-password"
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        className="w-full p-2 border rounded text-black"
        placeholder="Enter password"
        aria-label="Password"
        required
        />
    </div>
    <div className="mb-4">
        <label htmlFor="role" className="block font-medium mb-1 text-black">Role</label>
        <select
        id="role"
        data-testid="create-role"
        value={userData.role}
        onChange={(e) => setUserData({ ...userData, role: e.target.value })}
        className="w-full p-2 border rounded text-black"
        aria-label="Select role"
        >
        <option value="Worker">Worker</option>
        <option value="Admin">Admin</option>
        </select>
    </div>
    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            data-testid="create-cancel"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            data-testid="create-submit"
                        >
                            Create User
                        </button>
                    </div>
            </form>
            </div>
        </div>
    );
}