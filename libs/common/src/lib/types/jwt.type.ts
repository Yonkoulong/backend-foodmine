import { Role } from "../enums";

export type JwtPayload = {
    sub: number;
    username: string;
    role: Role;
}