// Creamos la clase Firebase Auth para administrar los métodos de Firebase Auth
export class FirebaseAuth {
  constructor() {
    // Método para crear un usuario
    this.fbAuthCreateUser = (email, password) => {
      return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    // Método para logear o iniciar sesión de usuario
    this.fbAuthSignIn = (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    // Método para cerrar sesión
    this.fbLogOut = async () => {
      await firebase.auth().signOut();
    };

    // Método para saber qué usuario se encuentra logeado dentro de la aplicación
    this.fbAuthCurrentUser = function (callback) {
      return firebase.auth().onAuthStateChanged(callback);
    };
  }
}
