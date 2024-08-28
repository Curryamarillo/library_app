import { type ILoginRequest } from "~/types/ILoginRequest";
import { type ILoginResponse } from "~/types/ILoginResponse";
import { fetchUserByEmail } from "./fetchUsers";

const API_URL_AUTH = "http://localhost:8080/api/auth/login";

export const fetchLogin = async (userEmail: string, userPassword: string): Promise<ILoginResponse> => {
    
    const loginRequest: ILoginRequest = {
        email: userEmail,
        password: userPassword
    };

    try {
        console.log('Sending request with body:', JSON.stringify(loginRequest)); // Verificar el cuerpo de la solicitud

        const response = await fetch(API_URL_AUTH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        });

        console.log('Response status:', response.status); // Verificar el estado de la respuesta
        console.log('Response statusText:', response.statusText); // Verificar el texto de estado de la respuesta

        if (!response.ok) {
            // Maneja errores de respuesta no exitosa
            console.error('Authentication error:', response.status, response.statusText); // Verificar el estado de la respuesta
            return Promise.reject(new Error('Error en la autenticación'));
        }

        const loginResponse: ILoginResponse = await response.json();
        console.log('Received response:', loginResponse); // Verificar la respuesta

        localStorage.setItem('token', loginResponse.jwt);
        localStorage.setItem('logguedUser', loginResponse.email);

        const userData = await fetchUserByEmail(loginResponse.email);

        localStorage.setItem('user', JSON.stringify({ id: userData.id, name: userData.name, surname: userData.surname, isAdmin: userData.isAdmin }));

        return loginResponse;
    } catch (error) {
        console.error('Network or server error:', error); // Verificar errores de red o de servidor
        return Promise.reject(new Error('Error de red o de servidor'));
    }
};
