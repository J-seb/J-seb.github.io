export class FirebaseAuth {
  constructor() {
    this.fbAuthCreateUser = (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    this.fbAuthSignIn = (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    this.fbLogOut = async () => {
      await firebase.auth().signOut();
    };

    this.fbAuthCurrentUser = function (callback) {
      return firebase.auth().onAuthStateChanged(callback);
    };
  }
}
