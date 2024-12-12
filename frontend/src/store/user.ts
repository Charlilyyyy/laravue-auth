import { defineStore } from "pinia";
import { User } from "../interface/user";
import { createUser } from "../api/user";

export const useUserStore = defineStore('user', {
    state: () => ({
        user : {
            name: '',
            email: '',
            password: '',
        }
    }),
    getters: {
        getUser(state) :User{
            return state.user
        }
    },
    actions: {
        async addUser(user :User){
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