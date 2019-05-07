(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBT2ZS3p3BDYQPzjvq6JBvNXp81DqjV4Mo",
    authDomain: "courseconstructor.firebaseapp.com",
    databaseURL: "https://courseconstructor.firebaseio.com",
    projectId: "courseconstructor",
    storageBucket: "courseconstructor.appspot.com",
    messagingSenderId: "929586144457"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const logout = document.getElementById('logout');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    // alert(email);

    // const promise = auth.createUserWithEmailAndPassword(email, pass)
    // .then(function () {
    //   firestore.collection('users').doc(email).set({
    //     email: email,
    //   })
    //   .then(function () {
    //     auth.signInWithEmailAndPassword(email, pass)
    //       .then((returnedUser) => {
    //         window.location.href = './home.html';
    //       });
    //   });
    // });

    const promise = auth.signInWithEmailAndPassword(email, pass)
      .then((returnedUser) => {
            window.location.href = './home.html';
          });
    promise.catch(e => console.log(e.message));
  });

  logout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
    } else {
      console.log('not logged in');
    }
  });

}());
