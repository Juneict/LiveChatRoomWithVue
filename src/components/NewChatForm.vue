<template>
    <div v-if="showLoading">
        <Spinner></Spinner>
    </div>
  <form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <textarea placeholder="type message and press enter to sent message" v-model="message" @keypress.enter="sentMessage"></textarea>
  </form>
  
</template>

<script>
import Spinner from './Spinner'
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection';
import { timestamp } from '@/global/config';
import { ref } from 'vue'
export default {
  components: { Spinner },
    setup(){
        let message = ref("");
        let {user} = getUser();
        let showLoading = ref(false);
        let { error , addDoc} = useCollection('messages');
        let errorMessage = ref("");
        let sentMessage = async()=>{
            if(message.value == ''){
                errorMessage.value = "say somthing to send";
                return;
            }
            showLoading.value = true;
            let chat = {
                message : message.value,
                name : user.value.displayName,
                created_at : timestamp
            }
            await addDoc(chat);
            message.value = "";
            errorMessage.value = "";
            showLoading.value = false;
        }
        return {message, sentMessage, error, errorMessage, showLoading}
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