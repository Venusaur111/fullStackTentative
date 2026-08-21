export interface UserModel {
    id?: number;
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    created_at?: Date;
}