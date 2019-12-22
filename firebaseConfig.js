import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCMClGCW2gfimw5o7O279TEa5mOj3jlO5A",
    authDomain: "busticket-78aa0.firebaseapp.com",
    databaseURL: "https://busticket-78aa0.firebaseio.com",
    projectId: "busticket-78aa0",
    storageBucket: "busticket-78aa0.appspot.com",
    messagingSenderId: "747218667415",
    appId: "1:747218667415:web:50f841a87e7925a657a6d2"
};
firebase.initializeApp(firebaseConfig);


export default firebase;