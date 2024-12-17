import { api } from "./api";
import { LoginUser, RegisterUser, User } from "../types/user";

export async function login(user :LoginUser) {
    // console.log("hoi");
    // console.log(user);
    return await api.post("/login", user);
}

export async function logout(user :User) {
    // console.log("hoi");
    // console.log(user);
    return await api.post("/logout", user);
}

export async function createUser(user :RegisterUser) {
    return await api.post("/user", user);
}