function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //list the emails that can login to the website using Gmail OAuth
    if (profile.getEmail() == "patrickjohnmurchie@gmail.com" ||
        profile.getEmail() == "rmackenzie88@gmail.com" ||
        profile.getEmail() == "callummcintosh6675@gmail.com" ||
        profile.getEmail() == "helloacmeatelier@gmail.com" ||
        profile.getEmail() == "ryancitomlinson@gmail.com"
    ) {
        window.location.href = "./index.html"
    } else {
        let done = confirm("You don't have permission to access this.")
        if (done) {
            window.location.href = "https://www.acmeatelier.co.uk/"
        } else {
            alert("Please try again.")
        }


    }
}

//Function to signOut
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        window.location.href = "./LogIn.html"
    });

}