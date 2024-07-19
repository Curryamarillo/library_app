<template>
    <div class="flex items-center h-screen bg-green-900">
        <div class="bg-green-200 p-8 rounded-lg shadow-lg w-full max-w-screen-lg m-2 sm:w-1/2">
            <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Sesión Iniciada</h1>
            <h2 class="text-l font-semibold mb-6 text-center text-gray-800">El Usuario es {{ user.user?.name }} {{
                user.user?.surname }}</h2>
            <div class="text-l font-semibold mb-6 text-center text-gray-800">Tiene permisos de {{ user.user?.isAdmin ?
                'Administrador' : 'Usuario' }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

const user = useMyUserLoguedStore();
</script>