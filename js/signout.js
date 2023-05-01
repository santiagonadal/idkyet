
window.onload = function() {
    const signoutButton = document.querySelector('#signout-button');

    signoutButton.addEventListener('click', function(){
        auth.signOut();
    })
}
