import api from './api';
import { LoginRequest, LoginResponse, User, AdminUser, UpdateUserDTO, RegisterDTO } from '../types/auth';

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
    const response = await api.put<User>(`/Admin/users/${id}`, userData);
    console.log('Frontend update response:', response.data);
    return response.data;
},

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/Admin/users/${id}`);
    },

    createUser: async (userData: RegisterDTO): Promise<User> => {
        debugger; // Add breakpoint
        console.log('Create User Request:', userData);
        try {
            const response = await api.post<User>('/Auth/register', userData);
            console.log('Create User Response:', response.data);
            return response.data;
        } catch (error: unknown) {
            console.error('Create User Error:', error);
            throw error;
        }
    }
};