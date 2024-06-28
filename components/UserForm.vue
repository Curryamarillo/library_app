<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 class="text-xl font-semibold mb-4">Agregar Usuario</h1>
            <div v-if="isSaved" class="mb-4 text-green-500 font-bold">¡Usuario guardado correctamente!</div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre</label>
                <input id="name" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre" v-model="name" :disabled="isSaved" :class="{ 'bg-gray-100': isSaved }">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="surname">Apellido</label>
                <input id="username" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username" v-model="surname" :disabled="isSaved" :class="{ 'bg-gray-100': isSaved }">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="surname">Correo Electrónico</label>
                <input id="username" type="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username" v-model="email" :disabled="isSaved" :class="{ 'bg-gray-100': isSaved }">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="isAdmin">Es Administrador</label>
                <input id="isAdmin" type="checkbox"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="isAdmin" :disabled="isSaved" :class="{ 'bg-gray-100': isSaved }">
            </div>
            <div class="flex items-center justify-between">
                <button :disabled="isSaved" @click="save"
                    :class="[isSaved ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700', 'text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline']"
                    type="button">
                    Guardar
                </button>
                <button @click="close"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Salir
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
});
const emit = defineEmits(['close', 'save']);

const name = ref('');
const surname = ref('');
const email = ref('');
const isAdmin = ref(false);
const isSaved = ref(false);

const close = () => emit('close');
const save = () => {
    const newUser = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        isAdmin: isAdmin.value
    }
    emit('save', newUser);
    isSaved.value = true;
}

watch(() => props.show, (newValue) => {
    if (!newValue) {
        // Reset form and isSaved when form is closed
        name.value = '';
        surname.value = '';
        email.value= '';
        isAdmin.value = false;
        isSaved.value = false;
    }
});
</script>

<style scoped></style>