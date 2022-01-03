export interface TokenResponse{
    token: string,
    expiration: number,
    refresh_token: string,
    role_name: string,
    userId:string,
    profile_picture_path:string,
    user_name:string
}