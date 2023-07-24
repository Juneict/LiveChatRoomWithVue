import { auth } from "@/global/config";
import { ref } from "vue"

let error = ref(null);
let logIn = async (email, password) => {
    try{
        let res = await auth.signInWithEmailAndPassword(email, password);
        if(!res){
          throw new Error('failed to login');
        }
        return res;
    }catch(err){
        error.value = err.message;
    }
}
let useLogin = () => {
    return { error , logIn}
}
export default useLogin