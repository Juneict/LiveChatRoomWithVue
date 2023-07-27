<template>
  <form>
    <textarea placeholder="type message and press enter to sent message" v-model="message" @keypress.enter="sentMessage"></textarea>
  </form>
</template>

<script>
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection';
import { timestamp } from '@/global/config';
import { ref } from 'vue'
export default {
    setup(){
        let message = ref("");
        let {user} = getUser();
        let { error , addDoc} = useCollection('messages');
        let sentMessage = async()=>{
            let chat = {
                message : message.value,
                name : user.value.displayName,
                created_at : timestamp
            }
            await addDoc(chat);
            message.value = "";
        }
        return {message, sentMessage, error}
    }
}
</script>

<style>
    form{
        margin: 10px;
    }
    textarea{
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 10px;
        box-sizing: border-box;
        border: 0;
        border-radius: 20px;
        font-family: inherit;
        outline: none;
    }
</style>