<template>
    <div class="m-4 p-4 border rounded-md shadow-lg bg-white flex flex-col">
        <h1 class="text-xl font-bold">{{ title }}</h1>
        <h2 class="text-lg text-gray-700">{{ author }}</h2>
        <h4 class="text-gray-500 hidden md:block">Isbn: {{ isbn }}</h4>
        <div class="flex justify-end mt-auto">
            <button :class="buttonClass" :disabled="!isAvailable" @click="opcionPrestar">{{ availabilityText
                }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Book',
    props: {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        isAvailable: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        availabilityText() {
            return this.isAvailable ? 'Disponible' : 'No Disponible';
        },
        buttonClass() {
            return this.isAvailable
                ? 'bg-green-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-green-700 shadow-lg'
                : 'bg-gray-500 text-white px-4 py-1 mt-2 rounded-lg cursor-not-allowed shadow-lg';
        }
    },
    methods: {
        opcionPrestar() {
            this.$emit('open-modal')
        }
    }
});
</script>
