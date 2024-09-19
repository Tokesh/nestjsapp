import { UserM } from "src/domain/model/user/user";

export interface IUserRepo {
    save(user: UserM): Promise<UserM>;
    getById(id: number): Promise<UserM | null>;
    getByEmail(email: string): Promise<UserM | null>;
    getByPhone(phone: string): Promise<UserM | null>;
}
  