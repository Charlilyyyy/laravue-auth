<script setup lang="ts">
import { useUserStore } from '../../store/user';
import { User } from '../../types/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

const user = userStore.getUser;
const token = userStore.getToken;

onMounted(() => {
    userStore.restoreAuth();
});

const handleLogout = async() :Promise<void> => {
    try {
        const result = await userStore.logout();
        console.log('Login successful:', result);
    } catch (error) {
        console.error("Registration failed:", error);
    }
}

</script>

<template>
    dashboard
{{ user }}
{{ token }}
    <form @submit.prevent="handleLogout">
        <button type="submit">Logout</button>
    </form>
</template>