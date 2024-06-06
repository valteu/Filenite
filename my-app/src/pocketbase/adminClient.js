import PocketBase, { LocalAuthStore } from 'pocketbase';

const adminClient = new PocketBase(process.env.REACT_APP_POCKETBASE_URL, new LocalAuthStore("admin"));



export async function mapToUserId(email){
    try {  
        await adminClient.admins.authWithPassword(process.env.REACT_APP_POCKETBASE_USERNAME, process.env.REACT_APP_POCKETBASE_PASSWORD);
        const resultList = await adminClient.collection('users').getList(1, 1, {
          filter: `email="${email}"`
        });
        adminClient.authStore.clear();
        if (resultList.items.length > 0) {
          return resultList.items[0].id;
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        adminClient.authStore.clear();
        throw error;
      }
}