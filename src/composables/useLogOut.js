import { auth } from "@/global/config";
import { ref } from "vue";

let error = ref(null);
let userLogOut = async() => {
    try{
       let res = await auth.signOut();
       return res;
    }catch(err){
        console.log(err.message);
    }
}
let uselogOut = ()=>{
    return { error , userLogOut}
}
export default uselogOut;