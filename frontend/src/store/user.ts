import { defineStore } from "pinia";
import { LoginUser, RegisterUser, User } from "../types/user"; 
import { login, createUser } from "../api/auth";

export const useUserStore = defineStore('user', {
    state: () => ({
        user : {
            name: '',
            email: '',
            password: '',
        },
        token: ''
    }),
    getters: {
        getUser(state) :User{
            return state.user
        }
    },
    actions: {
        async login(user :LoginUser){
            try{
                const response = await login(user);

                const token = response.data?.login?.original.token; // Extract the token (ensure your backend returns a 'token' field)

                // if succeed please set jwt here
                if (token) {
                    this.token = token;
                    localStorage.setItem('auth_token', token);
                    console.log('JWT stored successfully:', token);
                } else {
                    throw new Error("Token not provided in response");
                }

                this.user = response.data.data || {};

                return response.data;
            }catch(error){
                return error;
            }
        },
        async register(user :RegisterUser){
            try{
                const response = await createUser(user);

                this.user = response.data;
                return user;
            }catch(error){
                return error;
            }
        }
    }
})