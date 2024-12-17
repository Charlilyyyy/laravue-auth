<script setup lang="ts">
import { reactive } from 'vue';
import { LoginUser, RegisterUser } from '../../types/user';
import { useUserStore } from '../../store/user';

const user = reactive<LoginUser>({
  email: '',
  password: '',
})
const userStore = useUserStore();

async function handleSubmit() :Promise<void>{
    try {
        // const response :Promise<any> = userStore.login(user);
        // const result = await response;
        // console.log('result');
        const result = await userStore.login(user);
        console.log('Login successful:', result);
    } catch (error) {
        console.error("Registration failed:", error);
    }
}
</script>

<template>
    login page
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="email">Email: </label>
            <input type="email" name="email" id="email" v-model="user.email">
        </div>
        <div>
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" v-model="user.password">
        </div>
        <button type="submit">Login</button>
    </form>
</template>