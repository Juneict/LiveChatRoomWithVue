<template>
  <div class="container">
    <Navbar></Navbar>
    <ChatWindow></ChatWindow>
    <NewChatForm></NewChatForm>
  </div>
</template>

<script>
import ChatWindow from '../components/ChatWindow'
import NewChatForm from '../components/NewChatForm'
import { watch } from "vue";
import Navbar from "../components/Navbar";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import Spinner from '@/components/Spinner.vue';
export default {
  components: {
    ChatWindow,
    NewChatForm, Navbar,
    Spinner },
  setup() {
    let { user } = getUser();
    let router = useRouter();

    watch(user, ()=>{
      if (!user.value) {
        router.push({name:"welcome"});
      }
    });
  },
};
</script>

<style></style>
