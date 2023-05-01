
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

firebase.auth().onAuthStateChanged(function(user) {
    if (user || window.location.pathname.endsWith('index.html')
    || window.location.pathname.endsWith('/')) {

    } else {
    window.location.href = 'index.html'; 
    }
})

