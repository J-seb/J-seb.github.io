// Importación de módulos
import { Product } from "./product.js";
import { Form } from "./form.js";
import { Listeners } from "./listener.js";
import { FirebaseConnection } from "./firebaseConnection.js";
import { Modal } from "./modal.js";
import { FirebaseAuth } from "./fb-auth.js";
import { CurrentUser } from "./user.js";

// Llamo a las clases para crear nuevos objetos que administrarán la app
const firebaseC = new FirebaseConnection();
const product = new Product();
const modal = new Modal();
const form = new Form(firebaseC);
const firebaseAuth = new FirebaseAuth();
const actualUser = new CurrentUser(firebaseAuth);
const listener = new Listeners(modal, firebaseC, form, firebaseAuth);

listener.enableLogoutButton();

// Primero verificamos que haya sesión activa y un usuario activado
firebaseAuth.fbAuthCurrentUser(function (user) {
  console.log(user);
  if (!user) {
    window.location.href = "./views/login.html";
  }

  actualUser.userId = user.uid;

  // Si el usuario es admin cambia el nombre del usuario, de lo contrario queda como usuario.
  if (actualUser.userId === "A5OEbNmovlg3FWuUNgzXzgIu7de2") {
    actualUser.tagUser.textContent = "Admin";
  } else {
    actualUser.tagUser.textContent = "User";
  }

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
    if (actualUser.userId === "A5OEbNmovlg3FWuUNgzXzgIu7de2") {
      listener.enableButtons();
    }

    console.log(listener.arrayButtons);
  });
});

//Habilito el boton del submit del formulario
form.enableSubmitButton();
