export interface User {
    id: number;
    name: string,
    password: string,
    email: string,
    phone: string,
    isAdmin: boolean
}

export interface SignInData {
    email: string,
    password: string,
}

export interface SignUpData {
    name: string,
    password: string,
    email: string,
    phone: string,
}