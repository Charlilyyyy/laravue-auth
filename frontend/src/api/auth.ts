import { api } from "./api";
import { LoginUser, RegisterUser } from "../types/user";

export async function login(user :LoginUser) {
    // console.log("hoi");
    // console.log(user);
    return await api.post("/login", user);
}

export async function createUser(user :RegisterUser) {
    return await api.post("/user", user);
}