<template>
  <div class="chat-window">
    <div class="messages" ref="chatBox">
      <div class="single" v-for="chat in formattedChats" :key="chat.id">
        <div v-if="user">
          <div v-if="user.displayName == chat.name" class="right-chat">
            <span class="created_at">{{ chat.created_at }}</span>
            <span class="name">{{ chat.name }}</span>
            <span class="message">{{ chat.message }}</span>
          </div>
          <div v-else class="left-chat">
            <span class="created_at">{{ chat.created_at }}</span>
            <span class="name">{{ chat.name }}</span>
            <span class="message">{{ chat.message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/global/config";
import { computed, onUpdated, ref } from "vue";
import { formatDistanceToNow } from "date-fns";
import getUser from "@/composables/getUser";
export default {
  setup() {
    let chats = ref([]);
    let chatBox = ref(null);
    let { user } = getUser();
    onUpdated(() => {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    });
    let formattedChats = computed(() => {
      return chats.value.map((chat) => {
        let formatTime = formatDistanceToNow(chat.created_at.toDate());
        return { ...chat, created_at: formatTime };
      });
    });
    db.collection("messages")
      .orderBy("created_at")
      .onSnapshot((snap) => {
        let result = [];
        snap.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id };
          doc.data().created_at && result.push(document);
          chats.value = result;
        });
      });
    return { chats, formattedChats, chatBox, user };
  },
};
</script>

<style>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created_at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.right-chat {
  text-align: right;
  margin-right: 40px;
}
</style>
