import { useMyUserLoguedStore } from "#imports"

export default defineNuxtRouteMiddleware(async (to, from) => {

    const logguedUser = useMyUserLoguedStore();
    
})
