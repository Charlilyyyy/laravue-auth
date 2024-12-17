import { defineStore } from "pinia";
import { LoginUser, RegisterUser, User } from "../types/user"; 
import { login, createUser, logout } from "../api/auth";
import router from '../router/index'

export const useUserStore = defineStore('user', {
    state: () => ({
        // user : {
        //     name: '',
        //     email: '',
        //     password: '',
        // },
        user: localStorage.getItem('auth_user')
            ? JSON.parse(localStorage.getItem('auth_user') as string) as User
            : { name: '', email: '', password: '' } as User,
        token: localStorage.getItem('auth_token') || '',
        isAuthenticated: !!localStorage.getItem('auth_token'),
    }),
    getters: {
        getUser(state): User {
            return state.user;
        },
        getToken(state): string {
            return state.token;
        },
        isAuth(state) {
            return state.isAuthenticated; // Getter to check if user is authenticated
        },
    },
    actions: {
        async login(user :LoginUser){
            try{
                const response = await login(user);

                const token = response.data?.login?.original.token; // Extract the token (ensure your backend returns a 'token' field)

                // if succeed please set jwt here
                if (token) {
                    this.token = token;
                    this.isAuthenticated = true;
                    this.user = response.data?.login?.original.data || {};
                    localStorage.setItem('auth_token', token);
                    localStorage.setItem('auth_user', JSON.stringify(response.data?.login?.original.data));
                    // console.log('JWT stored successfully:', token);
                } else {
                    // throw new Error("Token not provided in response");
                }

                router.push({ name: 'dashboard' });
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
        },
        async logout() {
            const user :User = this.getUser
            try{
                const response = await logout(user);
                this.token = '';
                this.isAuthenticated = false;
                this.user = { name: '', email: '', password: '' };

                // Remove the token from localStorage
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                // console.log('User logged out, token removed!');
                router.push({ name: 'home' });
                // return response.data; // maybe toast here
            }catch(error){
                return error;
            }
        },
        // Restore user data from localStorage
        restoreAuth() {
            const token = localStorage.getItem('auth_token');
            if (token) {
                this.token = token;
                this.isAuthenticated = true;
            }
        },
    }
})