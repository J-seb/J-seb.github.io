//Clase encargada de realizar la conexión con firebase, almacena todos los métodos que requiero para comunicarme con google

export class FirebaseConnection {
  constructor() {
    // Almaceno el objeto firebase.firestore()
    this.dbFirestore = firebase.firestore();

    // Función para crear un documento con el dato que le ingrese
    this.createDocument = async (data) => {
      await this.dbFirestore.collection("catalog").doc().set(data);
    };

    // Función para leer todos los documentos de la colección
    this.readDocuments = () => {
      return this.dbFirestore.collection("catalog").get();
    };

    // Función para obtener un snapshot, es decir, para que google devuelva datos una vez detecte cambios en su DB
    this.onGetDocs = (callback) => {
      this.dbFirestore.collection("catalog").onSnapshot(callback);
    };

    // Función para leer un documento específico por medio de su ID
    this.readDocument = (id) => {
      return this.dbFirestore.collection("catalog").doc(id).get();
    };

    // Función para eliminar un documento específico por medio de su ID
    this.deleteDoc = (id) => {
      this.dbFirestore.collection("catalog").doc(id).delete();
    };

    // Función para actualizar un documento específico por medio de su ID y los campos a modificar
    this.updateDoc = (id, updateData) => {
      this.dbFirestore.collection("catalog").doc(id).update(updateData);
    };
  }
}
