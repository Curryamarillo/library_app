<template>
  <div class="grid grid-cols-1 mt-20">
    <template v-if="users.length > 0">
      <button class="p-2 my-2 mx-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-700" @click="openForm">
        Agregar Usuario
      </button>
      <User 
        v-for="(user, index) in users" 
        :key="index" 
        :id="user.id" 
        :name="user.name" 
        :surname="user.surname"
        :email="user.email" 
        :is-admin="user.isAdmin" 
      />
    </template>
    <UserForm :show="isFormOpen" @close="closeForm" @save="handleSaveUser"/>
  </div>
</template>

<script setup lang="ts">
import { fetchUsers } from '~/apis/fetchUsers';
import { type IUser } from '~/types/IUser';
import { ref, onMounted } from 'vue';

const users = ref<IUser[]>([]);
const selectedUser = ref<IUser | null>(null);
const isFormOpen = ref(false);

const openForm = () => {
  isFormOpen.value = true;
}
const closeForm = () => {
  isFormOpen.value = false;
}

const loadUsers = async () => {
  try {
    const allUsers = await fetchUsers(); // Ajusta esto según tu API para obtener todos los usuarios
    users.value = allUsers;
  } catch (error) {
    console.error('Error loading users:', error);
  }
};

onMounted(() => {
  loadUsers();
});

const handleSaveUser = async (newUser: IUser) => {
  //todo
}
</script>

<style scoped>
</style>
