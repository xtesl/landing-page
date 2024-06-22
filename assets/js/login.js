import * as firebase from 'Firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase_config';
firebase.initializeApp(firebaseConfig);

const email = document.getElementById('exampleInputEmail');
const password = document.getElementById('exampleInputPassword');
const spinner = document.getElementById('spinner');
const form = document.getElementById('login-form');
function inSide(){
    spinner.style.display = 'block';
    firebase.auth().signInWithEmailAndPassword(email.value.trim(),
password.value.trim()).then((Credential)=>{
    localStorage.setItem('credential', Credential);
}).catch((err)=>{
    const code = err.code;
    const message = err.message;
    console.error('Failed to sign in', code, message);
}).finally(()=>{
    spinner.display.style = 'none';
});
}

form.addEventListener('submit', inSide);