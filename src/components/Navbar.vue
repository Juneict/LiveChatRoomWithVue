<template>
    <nav v-if="user">
        <div>
            <p>Hi {{ user.displayName }}</p>
            <p class="email">logged in as {{ user.email }}</p>
        </div>
        <button @click="logOut">LogOut</button>
    </nav>
</template>

<script>
import { auth } from '@/global/config';
import { ref } from 'vue';
import getUser from "@/composables/getUser";
import useLogOut from "@/composables/useLogOut";

export default {
    setup(){
        let { user } = getUser();
        let {error, userLogOut } = useLogOut();
        let logOut = async ()=>{
            let res = await userLogOut();
            if(res){
                console.log("user is logout");
            }
        }
        return {logOut, user};
    }
}
</script>

<style>
    nav{
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    nav p {
        margin: 2px auto;
        font-size: 16px;
        color: #444;
    }

    nav p .email{
        font-size: 14px;
        color: #999;
    }
</style>