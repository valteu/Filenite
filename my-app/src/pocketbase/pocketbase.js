import PocketBase from 'pocketbase';
import axios from 'axios';
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
        //window.location.reload();
        return authData;
    } catch (error) {
        throw error;
    }
}

export async function login(email, password) {
    try{
        
        const authData = await pb.collection('users').authWithPassword(email, password);
        const isUserVerified=pb.authStore.model.verified;
        if(!isUserVerified){
            pb.authStore.clear();
            throw new Error("Your account is not verified. Please check your emails for the verification link.");
        }
        
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

  export async function shareFileWithUser(recordId, user) {
    try {
        const record = await pb.collection('files').getOne(recordId);
        console.log(record);
        const sharedUsers = record.sharedUsers;
        if (!sharedUsers.includes(user)) {
            sharedUsers.push(user);
        }
        console.log(sharedUsers);
        const data = {
            "sharedUsers": sharedUsers
        };
        const updatedRecord = await pb.collection('files').update(record.id, data);
      console.log('Record updated successfully', updatedRecord);
    } catch (error) {
      console.error('Failed to update record', error);
    }
  }
  