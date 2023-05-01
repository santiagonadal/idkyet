
const welcome = document.querySelector('#welcome');
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      welcome.innerText = `Welcome, ${user.displayName}`;
      //console.log(user.uid);
    }
  });


