export interface ILoginResponse {
    email: string,
    message: string,
    isAdmin: boolean,
    isAuthenticated: boolean,
    status: boolean,
    jwt: string
}