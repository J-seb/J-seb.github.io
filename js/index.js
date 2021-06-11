// Importación de módulos
import { Product } from "./product.js";
import { Form } from "./form.js";
import { Listeners } from "./listener.js";
import { FirebaseConnection } from "./firebaseConnection.js";
import { Modal } from "./modal.js";

// Llamo a las clases para crear nuevos objetos que administrarán la app
const firebaseC = new FirebaseConnection();
const product = new Product();
const modal = new Modal();
const form = new Form(firebaseC);
const listener = new Listeners(modal, firebaseC, form);

// Listener principal para descargar de firebase una vez se carga el DOM
window.addEventListener("DOMContentLoaded", async () => {
  // Llamo al snapshot y me devuelve los productos
  firebaseC.onGetDocs((querySnapshot) => {
    // Borro el contenido del contenedor de productos
    product.blockOfProducts.innerHTML = "";

    //Por cada producto extraigo la información y la voy adicionando al contenedor de productos
    querySnapshot.forEach((doc) => {
      const productInfo = doc.data();
      productInfo.id = doc.id;
      console.log(productInfo);
      product.blockOfProducts.innerHTML += product.renderProduct(productInfo);
    });

    // Agrego los listeners para habilitar los botones de los productos
    listener.getAllButtons();
    listener.enableButtons();
    console.log(listener.arrayButtons);
  });
});

//Habilito el boton del submit del formulario
form.enableSubmitButton();
