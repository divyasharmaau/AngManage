export interface TokenResponse{
    token: string,
    expiration: number,
    refresh_token: string,
    role_name: string,
    userId:string
}