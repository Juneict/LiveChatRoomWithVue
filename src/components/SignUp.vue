<template>
  <h2>Signup</h2>
  <form @submit.prevent="signUp">
    <input type="text" placeholder="UserName" v-model="username" />
    <input type="text" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <button type="submit">SignUp</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignUp from "../composables/useSignUp";

export default {
  setup(props, context) {
    let username = ref("");
    let email = ref("");
    let password = ref("");
    let { error, createAccount } = useSignUp();
    let signUp = async () => {
       let res = await createAccount(email.value, password.value, username.value);
       if(res){
          context.emit('enterChatroom');
       }
    };
    return { username, email, password, signUp, error };
  },
};
</script>

<style></style>
