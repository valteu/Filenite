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

export async function getOwnFileList() {
  try {
    const id = pb.authStore.model.id;
    const filterArgument =  `"${id}" = user.id`;
    const list = await pb.collection('files').getFullList({
      filter: filterArgument,
      sort: '-updated',
    });
    return list;
  } catch (error) {
    throw error;
  }
}

export async function getSharedFileList() {
  try {
    const id = pb.authStore.model.id;
    const filterArgument =  `"${id}" ?= sharedUsers.id`;
    const list = await pb.collection('files').getFullList({
      filter: filterArgument,
      sort: '-updated',
    });
    return list;
  } catch (error) {
    throw error;
  }
}

export async function uploadFile(formData) {
  try {
    await pb.collection('files').create(formData);
  } catch (error) {
    throw error;
  }
}

export async function deleteFile(recordId) {
  try {
    await pb.collection('files').delete(recordId);
  } catch (error) {
    throw error;
  }
}

export async function shareFileWithUser(recordId, userId) {
  try {
      if(userId == '') {
        throw new Error("Please enter an email adress.");
      }
      const record = await pb.collection('files').getOne(recordId);
      const sharedUsers = record.sharedUsers;
      if(record.user == userId) {
        throw new Error("You can't share files with yourself"); 
      }
      if (!sharedUsers.includes(userId)) {
          sharedUsers.push(userId);
      }
      const data = {
          "sharedUsers": sharedUsers
      };
      const updatedRecord = await pb.collection('files').update(record.id, data);
      alert('File shared');
  } catch (error) {
    throw error;
  }
}
  