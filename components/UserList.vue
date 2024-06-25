<template>
    <div class="grid grid-cols-1 mt-20">
      <template v-if="users.length > 0">
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
      <div ref="loadMoreTrigger" class="load-more-trigger">Cargando más...</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { fetchUsers } from '~/apis/fetchUsers';
  import { type IUser } from '~/types/IUser';

  
  const users:Ref<IUser[]> = ref<IUser[]>([]);
  const isEditFormOpen:Ref<boolean> = ref(false);
  const page:Ref<number> = ref(1); // Página inicial
  const perPage:number = 10; // Número de usuarios por página
  const totalItems = ref(0); // Número total de usuarios disponibles (puedes ajustar esto según tu API)
  
  const loadUsers = async () => {
    try {
      const newUsers = await fetchUsers(page.value, perPage); // Ajusta esto según tu API
      users.value.push(...newUsers); // Añade los nuevos usuarios al array `users`
      // No necesitamos actualizar `totalItems` porque no hay paginación visible en la respuesta actual
      page.value++; // Incrementa la página para la siguiente carga
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };
  
  const createObserver = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
  
    const observer = new IntersectionObserver(handleIntersect, options);
    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  };
  
  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      // No es necesario comprobar la paginación aquí si la respuesta de la API no tiene paginación visible
      loadUsers();
    }
  };
  
  onMounted(() => {
    loadUsers();
    createObserver();
  });
  
  const loadMoreTrigger = ref<HTMLDivElement | null>(null); // Tipo específico para el elemento ref
  
  </script>
  
  <style scoped>
  .load-more-trigger {
    padding: 10px;
    text-align: center;
    font-size: 14px;
    color: #888;
  }
  </style>
  