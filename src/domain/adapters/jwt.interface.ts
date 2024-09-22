export interface JWTConfig {
    getJwtSecret(): string;
    getJwtExpirationTime(): string;
    getJwtRefreshSecret(): string;
    getJwtRefreshExpirationTime(): string;
}
export interface IJwtServicePayload {
    authId: number;
    authPartnerId: number;
    authRole: string;
    ownerId: number;
    permission?: object;
}

export interface IJwtService {
    checkToken(token: string): Promise<any>;
    createToken(payload: IJwtServicePayload, secret: string, expiresIn: string): string;
}
  