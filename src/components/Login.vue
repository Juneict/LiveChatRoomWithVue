<template>
    <h2>Login</h2>
    <form @submit.prevent="signIn">
      <input type="text" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="showLoading">
      <Spinner></Spinner>
    </div>
  </template>
<script>
import { ref } from 'vue';
import Spinner from '../components/Spinner.vue';
import useLogin from '../composables/useLogin';
  export default {
    components:{
      Spinner
    },
    setup(props, context){
      let email = ref("");
      let password = ref("");
      let showLoading = ref(false);
      let {error, logIn} = useLogin();
      let signIn = async ()=>{
        showLoading.value = true;
       let res = await logIn(email.value, password.value);
       if(res){
          context.emit('enterChatroom');
       }
      }
      return { email, password, signIn, error, showLoading}
    }
  }
  </script>
  
  <style>
  
  </style>