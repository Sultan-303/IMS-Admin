export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
}

export interface AdminUser extends User {
    createdAt: string;
    lastLogin?: string;
    isActive: boolean;
}

export interface UpdateUserDTO {
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    password: string; 
}