// Importo función para convertir dato de imagen a base64
import { getBase64 } from "./base64.js";

// Clase para administrar el form
export class Form {
  constructor(fb) {
    // Verifica el estado del form, si es para editar o si por el contrario es para crear
    this.editStatus = false;

    // Campo que almacena momentaneamente el id para ingresarlo mas adelante con el objetivo de modificar productos
    this.id = "";

    // Querys selector para llamar del elementos del DOM a Javascript
    // Específicamente apunta a los campos del formulario y al botón de submit
    this.domName = document.querySelector(".product-name");
    this.domPrice = document.querySelector(".product-price");
    this.domDescription = document.querySelector(".product-description");
    this.domImage = document.querySelector(".product-image");

    this.domSubmitButton = document.querySelector(".form-button-submit");

    // Campo para guardar momentaneamente el objeto ingresado
    this.data = {};

    // Enable submit button habilita o crea el event listener del boton submit
    this.enableSubmitButton = function () {
      this.domSubmitButton.addEventListener("click", async (e) => {
        //Evito que cuando se de submit se recargue el contenido
        e.preventDefault();

        //Creo el objeto data desde los valores que se ingresaron en los input
        const data = {
          name: this.domName.value,
          price: this.domPrice.value,
          description: this.domDescription.value,
        };

        // Obtengo el archivo y convierto a base64
        const file = this.domImage.files[0];
        let base64file = await getBase64(file);

        // Adiciono ese dato de base64 al objeto
        data.image = base64file;

        const id = this.id;

        // Si el estado de edit es falso, se crea un documento, de lo contrario se edita un document
        if (!this.editStatus) {
          console.log(data.name, data.description, data.price);

          this.data = data;
          fb.createDocument(data);
        } else {
          fb.updateDoc(id, data);
          this.editStatus = false;
          this.id = "";
        }

        // Reinicio los valores de los campos del formulario
        this.domName.value = "";
        this.domPrice.value = "";
        this.domDescription.value = "";
      });
    };
  }
}
