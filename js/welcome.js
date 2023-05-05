
const welcome = document.querySelector('#welcome');
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      var name = user.displayName;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      welcome.innerText = `Welcome, ${name}`;
      localStorage.setItem('name', name )
      //console.log(user.uid);
    }
  });


