<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-xl font-semibold mb-4">Editar Usuario</h1>
            <div v-if="user">
                <div v-if="isSaved" class="mb-4 text-green-500 font-bold">¡Usuario guardado correctamente!</div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
                    <input id="name" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nombre" v-model="formData.name" :disabled="isSaved"
                        :class="{ 'bg-gray-100': isSaved }">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="surname">Apellido</label>
                    <input id="surname" type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Apellido" v-model="formData.surname" :disabled="isSaved"
                        :class="{ 'bg-gray-100': isSaved }">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input id="email" type="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email" v-model="formData.email" :disabled="isSaved"
                        :class="{ 'bg-gray-100': isSaved }">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
                    <input id="password" type="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Contraseña" v-model="formData.password" :disabled="isSaved"
                        :class="{ 'bg-gray-100': isSaved }">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">Confirmar
                        Contraseña</label>
                    <input id="confirmPassword" type="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Confirmar Contraseña" v-model="formData.confirmPassword" :disabled="isSaved"
                        :class="{ 'bg-gray-100': isSaved }">
                </div>
                <div v-if="passwordMismatch" class="text-red-500 text-sm mb-4">
                    Las contraseñas no coinciden.
                </div>
                <div class="mb-4">
                    <span><input class="mx-2" id="isAdmin" type="checkbox" v-model="formData.isAdmin"
                            :disabled="isSaved"></span>
                    <label class="text-gray-700 text-sm font-bold my-4" for="isAdmin">Administrador</label>
                </div>
                <div class="flex items-center justify-between">
                    <button :disabled="isSaved" @click="saveChanges"
                        :class="[isSaved ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700', 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline']">
                        Guardar Cambios
                    </button>
                    <button @click="close"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Salir
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type IUser } from '~/types/IUser';

const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Object as () => IUser | null,
        required: false,
    },
});

const emit = defineEmits(['close', 'save']);

const formData = ref({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
});

const passwordMismatch = ref(false);
const isSaved = ref(false);

const saveChanges = () => {
    if (formData.value.password !== formData.value.confirmPassword) {
        passwordMismatch.value = true;
        return;
    }
    if (props.user) {
        emit('save', {
            ...props.user,
            name: formData.value.name,
            surname: formData.value.surname,
            email: formData.value.email,
            password: formData.value.password,
            isAdmin: formData.value.isAdmin,
        });
        isSaved.value = true;
    }
};

const close = () => emit('close');

watch(() => props.show, (newValue) => {
    if (newValue && props.user) {
        formData.value.name = props.user.name;
        formData.value.surname = props.user.surname;
        formData.value.email = props.user.email;
        formData.value.password = '';
        formData.value.confirmPassword = '';
        formData.value.isAdmin = props.user.isAdmin;
        passwordMismatch.value = false;
        isSaved.value = false;
    } else {
        formData.value.name = '';
        formData.value.surname = '';
        formData.value.email = '';
        formData.value.password = '';
        formData.value.confirmPassword = '';
        formData.value.isAdmin = false;
        passwordMismatch.value = false;
        isSaved.value = false;
    }
});
</script>

<style scoped></style>