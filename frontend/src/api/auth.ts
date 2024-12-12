import { api } from "./api";
import { User } from "../interface/user";

export async function createUser(user: User) {
    return await api.post("/user", user);
}