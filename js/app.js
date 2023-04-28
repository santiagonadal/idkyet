const signUpPageLink = document.querySelector('#signup-page-link');
const loginPageLink = document.querySelector('#login-page-link');
const wrapper = document.querySelector('.wrapper');

const signUpButton = document.querySelector('#signup-button');
const signUpEmail = document.querySelector('#signup-email');
const signUpPassword = document.querySelector('#signup-password');
const signUpUsername = document.querySelector('#signup-username');

const loginButton = document.querySelector('#login-button');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');


const signoutButton = document.querySelector('#signout-button'); 

const signupWarning = document.querySelector('#signup-warning');
const loginWarning = document.querySelector('#login-warning');

loginPassword.addEventListener('input', checkLoginButton);
signUpPassword.addEventListener('input', checkSignUpButton);
loginEmail.addEventListener('input', checkLoginButton);
signUpEmail.addEventListener('input', checkSignUpButton);
signUpUsername.addEventListener('input', checkSignUpButton);

function checkLoginButton(){
    if(loginPassword.value.length >= 6 && loginEmail.value!=""){
        loginButton.style.backgroundColor = "#0095f6";
    } else {
        loginButton.style.backgroundColor = "#bcdffc";
    }
}

function checkSignUpButton(){
    if(signUpPassword.value.length  >= 6 && signUpEmail.value!="" && signUpUsername.value!=""){
        signUpButton.style.backgroundColor = "#0095f6";
    } else {
        signUpButton.style.backgroundColor = "#bcdffc";
    }
}

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAe5pwOobEia3irFlii_k2LBXRWJVMcy3g",
  authDomain: "login-cc829.firebaseapp.com",
  projectId: "login-cc829",
  storageBucket: "login-cc829.appspot.com",
  messagingSenderId: "174998612641",
  appId: "1:174998612641:web:dd9a9b152475bd8dc51ee0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


signUpPageLink.addEventListener('click', function(){
    wrapper.style.top = '-100%';
})
loginPageLink.addEventListener('click', function(){
    wrapper.style.top = '0%';
})

signUpButton.addEventListener('click', function(){
    signUpButton.innerText = 'Loading...';
    auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then((userCredential)=>{
        signUpButton.innerText = 'Sign Up';
        var currentUser = auth.currentUser;
        currentUser.updateProfile({
            displayName:signUpUsername.value,
        })
    })
    .catch((e)=>{
        signUpButton.innerText = 'Sign Up';
        signupWarning.innerText = e.message;
    })
})

loginButton.addEventListener('click', function(){
    loginButton.innerText = 'Loading...';
    auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then((e)=>{
        loginButton.innerText = 'Log In';
    })
    .catch((e)=>{
        loginButton.innerText = 'Log In';
        loginWarning.innerText = e.message;
    })
})

signoutButton.addEventListener('click', function(){
    auth.signOut();
})

auth.onAuthStateChanged((user)=>{
    loginWarning.innerText = '';
    signupWarning.innerText = '';
    wrapper.style.top = '0';
    loginPassword.value = '';
    loginEmail.value = '';
    signUpPassword.value = '';
    signUpEmail.value = '';
    if(user){
        wrapper.style.display = 'none';
    } else {
        wrapper.style.display = 'block';
    }
})