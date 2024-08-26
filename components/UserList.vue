<template>
  <div class="grid grid-cols-1 pt-28 relative">
    <!-- Botón fijo en la parte superior -->
    <button 
      class="w-full py-2 my-6 bg-green-500 text-white rounded-md shadow-lg hover:bg-green-700 fixed top-20 left-4" 
      @click="openForm">
      Agregar Usuario
    </button>

    <!-- Contenedor que hace scroll -->
    <div class="overflow-y-auto mt-12">
      <template v-if="users.length > 0">
        <User 
          v-for="(user, index) in users" 
          :key="index" 
          :id="user.id" 
          :name="user.name" 
          :surname="user.surname"
          :email="user.email" 
          :is-admin="user.isAdmin"
          @edit-user-form="openEditForm(user)"
          @delete-user-form="openDeleteUserForm(user)" 
        />
      </template>
    </div>

    <!-- Modales -->
    <UserForm :show="isFormOpen" @close="closeForm" @save="handleSaveUser"/>
    <UserEditForm :show="isEditFormOpen" :user="selectedUser" @close="closeEditForm" @save="updatedUser"/>
    <UserDeleteForm v-if="selectedUser"  :show="isUserDeleteFormOpen" :user="selectedUser" @close="closeDeleteUserForm" @delete="deleteUser" />
  </div>
</template>


<script setup lang="ts">
import { fetchUsers, persistUserInDatabase, updateUser, deleteUserById } from '~/apis/fetchUsers';
import { type IUser } from '~/types/IUser';


const users = ref<IUser[]>([]);
const selectedUser = ref<IUser | null>(null);
const isFormOpen = ref(false);
const isEditFormOpen = ref(false);
const isUserDeleteFormOpen = ref(false);

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

const openDeleteUserForm = (user: IUser) => {
  selectedUser.value = user;
  isUserDeleteFormOpen.value = true;
}
const closeDeleteUserForm = () => {
  selectedUser.value = null;
  isUserDeleteFormOpen.value = false;
}

const loadUsers = async () => {
  try {
    const allUsers = await fetchUsers(); 
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
const deleteUser = async () => {
  try {
    if (!selectedUser.value) {
      throw new Error('No user selected');
    }

    await deleteUserById(selectedUser.value.id); // Aquí llama a la función para eliminar el usuario
    await loadUsers();
    closeDeleteUserForm();
  } catch (error) {
    // Manejo específico para la restricción de clave foránea
    if (error instanceof Error && error.message.includes('no se puede eliminar')) {
      alert('El usuario no puede ser borrado porque tiene libros en su poder.');
    } else {
      console.error('Error deleting user:', error);
      alert('Ocurrió un error al intentar eliminar el usuario.');
    }
  }
};


</script>

<style scoped>
</style>
