function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //replace this with a data base please at some point... Thank you fueture Patrick
    if (profile.getEmail() == "patrickjohnmurchie@gmail.com" ||
        profile.getEmail() == "rmackenzie88@gmail.com" ||
        profile.getEmail() == "callummcintosh6675@gmail.com" ||
        profile.getEmail() == "helloacmeatelier@gmail.com" ||
        profile.getEmail() == "ryancitomlinson@gmail.com") {
        window.location.href = "./index.html"
    } else {}
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
        window.location.href = "./LogIn.html"
    });

}