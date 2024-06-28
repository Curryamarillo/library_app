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
        @edit-user-form="openEditForm(user)" 
      />
    </template>
    <UserForm :show="isFormOpen" @close="closeForm" @save="handleSaveUser"/>
    <UserEditForm :show="isEditFormOpen" :user="selectedUser" @close="closeEditForm" @save="updatedUser"/>
  </div>
</template>

<script setup lang="ts">
import { fetchUsers, persistUserInDatabase, updateUser } from '~/apis/fetchUsers';
import { type IUser } from '~/types/IUser';
import { ref, onMounted } from 'vue';

const users = ref<IUser[]>([]);
const selectedUser = ref<IUser | null>(null);
const isFormOpen = ref(false);
const isEditFormOpen = ref(false);

const openForm = () => {
  isFormOpen.value = true;
}
const closeForm = () => {
  isFormOpen.value = false;
}
const openEditForm = (user: IUser) => {
  selectedUser.value = user;
  isEditFormOpen.value = true
}
const closeEditForm = () => {
  selectedUser.value = null;
  isEditFormOpen.value = false}

const loadUsers = async () => {
  try {
    const allUsers = await fetchUsers(); // Ajusta esto según tu API para obtener todos los usuarios
    users.value = allUsers;
  } catch (error) {
    console.error('Error loading users:', error);
  }
};
const updatedUser = async (updatedUser: IUser) => {
  try {
    await updateUser(updatedUser.id, updatedUser);
    await loadUsers();
  } catch (error) {
    console.error('Error updating user:', error)
  }
}
onMounted(() => {
  loadUsers();
});

const handleSaveUser = async (newUser: IUser) => {
  try {
    await persistUserInDatabase(newUser);
    await loadUsers();
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
</script>

<style scoped>
</style>
