// Script para la autenticación de los login y sign up
import { FormAuth } from "./form-auth.js";
import { FirebaseAuth } from "./fb-auth.js";

const firebaseAuth = new FirebaseAuth();
const formAuth = new FormAuth(firebaseAuth);

formAuth.enableFormButton();
