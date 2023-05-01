
const signUpButton = document.querySelector('#signup-button');
const signUpEmail = document.querySelector('#signup-email');
const signUpPassword = document.querySelector('#signup-password');
const signUpUsername = document.querySelector('#signup-username');

const loginButton = document.querySelector('#login-button');
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');

const signupWarning = document.querySelector('#signup-warning');
const loginWarning = document.querySelector('#login-warning');

const welcomemessage = document.querySelector('#welcome-message')

var firebaseConfig = {
    apiKey: "AIzaSyAe5pwOobEia3irFlii_k2LBXRWJVMcy3g",
    authDomain: "login-cc829.firebaseapp.com",
    projectId: "login-cc829",
    storageBucket: "login-cc829.appspot.com",
    messagingSenderId: "174998612641",
    appId: "1:174998612641:web:dd9a9b152475bd8dc51ee0"
    };

    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();


signUpButton.addEventListener('click', function(){
    signUpButton.innerText = 'Loading...';
    auth.createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then((userCredential)=>{
        signUpButton.innerText = 'Sign Up';
        var currentUser = auth.currentUser;
        currentUser.updateProfile({
            displayName:signUpUsername.value,
        })
        auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        window.location.href = "options.html"
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
        window.location.href = "options.html"
    })
    .catch((e)=>{
        loginButton.innerText = 'Log In';
        loginWarning.innerText = e.message;
    })
})

signoutButton.addEventListener('click', function(){

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
