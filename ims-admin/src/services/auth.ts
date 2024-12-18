import api from './api';
import { LoginRequest, LoginResponse, User, AdminUser, UpdateUserDTO } from '../types/auth';

export const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/Auth/login', credentials);
        return response.data;
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await api.get<User>('/Auth/me');
        return response.data;
    },

    getAllUsers: async (): Promise<AdminUser[]> => {
        const response = await api.get<AdminUser[]>('/Admin/users');
        return response.data;
    },

    updateUser: async (id: number, userData: UpdateUserDTO): Promise<User> => {
    console.log('Frontend update payload:', userData);
    const response = await api.put<User>(`/Admin/users/${id}`, {
        username: userData.username,
        email: userData.email,
        password: userData.password, // Include this field
        role: userData.role,
        isActive: userData.isActive, // And this field
    });
    return response.data;
},

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/Admin/users/${id}`);
    },
};