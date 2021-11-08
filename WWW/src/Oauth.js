function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //list the emails that can login to the website using Gmail OAuth
    //list the emails that can login to the website using Gmail OAuth

    //list the emails that can login to the website using Gmail OAuth

    if (profile.getEmail() == "patrickjohnmurchie@gmail.com" ||
        profile.getEmail() == "rmackenzie88@gmail.com" ||
        profile.getEmail() == "callummcintosh6675@gmail.com" ||
        profile.getEmail() == "helloacmeatelier@gmail.com" ||
        profile.getEmail() == "ryancitomlinson@gmail.com"
    ) {
        var current = window.location.href;

        //loads if page is login.html
        switch (current) {
            case "http://localhost:2000/login.html":
                window.location.href = "./index.html"
                console.log("Note on page");
                break;
        }

    } else {

        //
        confirm("You don't have permission to access this.")
        signOut();

    }
}
//Function to signOut
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {

    });
    window.location.href = "./login.html"

}