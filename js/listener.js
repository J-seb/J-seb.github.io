// Clase que almacenará los listeners de los botones, es una de las clases principales
export class Listeners {
  // Ingreso el modal, el objeto de firebase y el formulario como parámetros de entrada
  constructor(modal, fb, form, fbAuth) {
    // Apunto al logout del nav
    this.logoutButton = document.querySelector(".logout-tag");

    // Apunto a los botones de adición de producto y cerrar modal
    this.addButton = document.querySelector(".btn-add");
    this.closeButton = document.querySelector(".close-button");

    // Inicializo el array de botones de editar
    this.editArray = [];

    // Función para llenar el array de botones de editar y adicionalmente adiciono esos elementos al array de botones principal
    this.getEditButtons = function () {
      this.editArray = document.querySelectorAll(".edit-button");
      this.arrayButtons.push(...this.editArray);
    };

    // Inicializo el array de botones de eliminar
    this.deleteArray = [];

    // Función para llenar el array de botones de eliminar y adicionalmente adiciono esos elementos al array de botones principal
    this.getDeleteButtons = function () {
      this.deleteArray = document.querySelectorAll(".delete-button");
      this.arrayButtons.push(...this.deleteArray);
    };

    // Inicio el array de botones principales, solo con el boton de adicionar y de cerrar
    this.arrayButtons = [this.addButton, this.closeButton];

    // Cuando esta función se llame, javascript buscará los botones edit, y delete, y los adicionará en el array principal
    this.getAllButtons = function () {
      this.arrayButtons.length = 0;

      this.getEditButtons();
      this.getDeleteButtons();

      this.arrayButtons = [
        this.addButton,
        this.closeButton,
        ...this.editArray,
        ...this.deleteArray,
      ];
    };

    // Agrego un listener por cada botón y dependiendo del botón realizo alguna acción específica
    this.enableButtons = function () {
      this.arrayButtons.forEach((button) => {
        button.addEventListener("click", async (e) => {
          //Si el botón que se activó es de cerrar, cierro el dom y reinicio el formulario
          if (button.classList[0] === "close-button") {
            modal.domModal.style.display = "none";

            form.domName.value = "";
            form.domPrice.value = "";
            form.domDescription.value = "";

            modal.isOpen = false;

            // Si el botón es el de borrar obtengo el id del producto y llamo a la función eliminar
          } else if (button.classList[1] === "delete-button") {
            await fb.deleteDoc(e.target.dataset.id);

            // Si el botón es editar, abro el modal, solicito a firestore el documento con la id específica y extraigo el objeto
          } else if (button.classList[1] === "edit-button") {
            modal.domModal.style.display = "block";
            const doc = await fb.readDocument(e.target.dataset.id);
            const productToEdit = doc.data();

            // Lleno el formulario con esos datos
            form.domName.value = productToEdit.name;
            form.domPrice.value = productToEdit.price;
            form.domDescription.value = productToEdit.description;

            // Cambio el estado del formulario a editar y cambio el texto del botón para actualizar
            form.editStatus = true;
            form.domSubmitButton.innerText = "Update";

            // Agrego al form, el id del documento que se seleccionó
            form.id = e.target.dataset.id;
          } else {
            // Por el contrario, se trata de un evento de crear producto. Cambio el texto a create y muestro el modal
            form.domSubmitButton.innerText = "Create";
            modal.domModal.style.display = "block";
            modal.isOpen = true;
          }
        });
      });
    };

    // Agregamos listener al botón logout
    this.enableLogoutButton = function () {
      this.logoutButton.addEventListener("click", () => {
        // Intentamos hacer logout en firebase, si es exitoso nos redirige al login, sino mostramos el error.
        try {
          fbAuth.fbLogOut();
          window.location.href = "./views/login.html";
        } catch (error) {
          console.log(error.message);
        }
      });
    };
  }
}
