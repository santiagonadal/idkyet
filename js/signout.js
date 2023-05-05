
window.onload = function() {
    const signoutButton = document.querySelector('#signout-button');

    signoutButton.addEventListener('click', function(){
        localStorage.clear()
        auth.signOut();
    })
}
