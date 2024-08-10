const onSearch = () => {
  const input = document.querySelector(".input");
  const filter = input.value.toUpperCase();

  const list = document.querySelectorAll(".card");
  list.forEach((el) => {
    const text = el.textContent.toUpperCase();

    if (text.includes(filter)) {
      el.style.display = "";
    } else {
      el.style.display = "none";
    }
  });
};

document.querySelector("input").addEventListener("input", onSearch);


// login and signup page change 

const signUp = document.querySelector(".signupPage");
const signUpPage = document.querySelector(".signUpPage")
const login = document.querySelector(".loginPage");
const gobacktologin = document.querySelector(".gobacktologin");
signUp.addEventListener("click", ()=>{
  login.style.display = "none"
  signUpPage.style.display = "block"
});
gobacktologin.addEventListener("click", ()=>{
  login.style.display = "block";
  signUpPage.style.display = "none";
})


// login in signin option

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLXL-_kD2gbs3yTy-i9HjnR9F8JrkRsZE",
  authDomain: "onlinestore-257d6.firebaseapp.com",
  projectId: "onlinestore-257d6",
  storageBucket: "onlinestore-257d6.appspot.com",
  messagingSenderId: "918565674692",
  appId: "1:918565674692:web:a59eb7e85fc25744f9b391",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const signup = document.querySelector(".signup");


signup.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector(".signupEmail").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();
  const db = getFirestore();

  if(email | password === ''){
    alert("please fill the field")
  }else{

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        password: password,
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData).then(() => {
        alert("account created");
        document.querySelector(".signUpPage").style.display = "none"
        login.style.display = "block"
      });
    })

    .catch((error) => {
      console.error("error writting doc", error);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/email-already-in-use") {
        alert("Email Address Already Exists !!!");
      } else {
        alert("Unable to create user");
      }
    }); }
});

//sign in

const signIn=document.querySelector(".signin");
signIn.addEventListener("click", (e)=>{
  e.preventDefault();
  const email=document.querySelector(".loginEmail").value;
  const password=document.querySelector(".loginPass").value;
  const auth = getAuth();
if(email | password === ''){
  alert("field is empty")
}else{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    alert("login is successful");
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href = "index.html"
  })

  .catch((error)=>{
    const errorCode=error.code;
    if(errorCode === 'auth/invalid-credential'){
      alert("incorrect email or password")
    }
    else{
      alert("account does not exist")
    }
  })}
  document.querySelector(".loginEmail").value = '';
  document.querySelector(".loginPass").value = '';

})