import { auth } from "@/global/config";
import { ref } from "vue";

let error = ref("");
let createAccount = async (email, password, username) => {
  try {
    let res = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Create user account failed");
    }
    res.user.updateProfile({ displayName: username });
    return res;
  } catch (err) {
    error.value = err.message;
  }
};
let useSignUp = () => {
  return { error, createAccount };
};

export default useSignUp;
