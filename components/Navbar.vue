<template>
    <div class="mt-3">
        <nav class="rounded-md my-2 ml-2 mr-10 p-1 bg-green-800 fixed top-0 w-full z-50">
            <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <button
                            @click="toggleMobileMenu"
                            class="inline-flex items-center justify-center p-2 rounded-md text-green-400 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span class="sr-only">Open main menu</span>
                            <svg
                                v-if="!mobileMenuOpen"
                                class="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                v-if="mobileMenuOpen"
                                class="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0">
                            <img class="h-12 w-auto" src="../assets/biblio-logo.png" alt="Your Company">
                        </div>
                        <div class="hidden sm:block sm:ml-6">
                            <div class="flex space-x-4">
                                <NuxtLink to="/" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white"
                                          aria-current="page">
                                    Home
                                </NuxtLink>
                                <NuxtLink to="/books" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                                    Libros
                                </NuxtLink>
                                <NuxtLink to="/loans" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                                    Préstamos
                                </NuxtLink>
                                <NuxtLink to="/users" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                                    Usuarios
                                </NuxtLink>
                                <NuxtLink to="/about" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                                    Nosotros
                                </NuxtLink>
                                <NuxtLink to="/contact" exact-active-class="bg-green-900 text-white"
                                          class="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                                    Contacto
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button"
                                class="relative rounded-full bg-green-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                            <span class="sr-only">View notifications</span>
                            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button>

                        <!-- Profile dropdown -->
                        <div class="relative ml-3">
                            <button type="button"
                                    class="relative flex rounded-full bg-green-800 text-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true">
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full"
                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt="">
                            </button>

                            <div v-if="profileMenuOpen"
                                 @click.away="profileMenuOpen = false"
                                 class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                 role="menu"
                                 aria-orientation="vertical"
                                 aria-labelledby="user-menu-button"
                                 tabindex="-1">
                                <a href="#" class="block px-4 py-2 text-md text-green-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Perfil</a>
                                <a href="#" class="block px-4 py-2 text-md text-green-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Ajustes</a>
                                <a href="#" class="block px-4 py-2 text-md text-green-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Salir</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div v-if="mobileMenuOpen" class="sm:hidden" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2">
                    <NuxtLink to="/" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white"
                              aria-current="page">
                        Home
                    </NuxtLink>
                    <NuxtLink to="/books" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                        Libros
                    </NuxtLink>
                    <NuxtLink to="/loans" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                        Préstamos
                    </NuxtLink>
                    <NuxtLink to="/users" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                        Usuarios
                    </NuxtLink>
                    <NuxtLink to="/about" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                        Nosotros
                    </NuxtLink>
                    <NuxtLink to="/contact" exact-active-class="bg-green-900 text-white"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-green-700 hover:text-white">
                        Contacto
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Navbar',
    setup() {
        const mobileMenuOpen = ref(false);
        const profileMenuOpen = ref(false);

        const toggleMobileMenu = () => {
            mobileMenuOpen.value = !mobileMenuOpen.value;
        };

        return {
            mobileMenuOpen,
            profileMenuOpen,
            toggleMobileMenu,
        };
    },
});
</script>

<style scoped>

</style>
