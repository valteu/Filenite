import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.REACT_APP_POCKETBASE_URL)

pb.autoCancellation(false);

export default pb;
export const isUserValid=pb.authStore.isValid;

export async function addUser(email, password) {
    try{
        const data = {
            email,
            password,
            passwordConfirm: password,
        }
        const authData = await pb.collection('users').create(data);
        //await pb.collection('users').requestVerification(email);
        window.location.reload();
        return authData;
    } catch (error) {
        throw error;
    }
}

export async function login(email, password) {
    try{
        
        const authData = await pb.collection('users').authWithPassword(email, password);
        window.location.reload();
    } catch (error) {
        throw error;
    }
}

export function logout() {
    try{
        pb.authStore.clear();
        window.location.reload();
    } catch (error) {
        throw error;
    }
}