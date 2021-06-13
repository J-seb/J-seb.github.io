// Clase para realizar la autenticación de usuario en los login y signup
export class FormAuth {
  constructor(fb) {
    // Apuntamos a los elementos del formulario de registro e inicio de sesión
    this.inputEmail = document.querySelector(".input-email");
    this.inputPassword = document.querySelector(".input-password");
    this.inputCheck = document.querySelector(".input-check");

    this.inputButton = document.querySelector(".input-button");

    // Cuando el botón se active, tomamos los datos y según la vista html que estemos trabajando hará login o signup
    this.enableFormButton = function () {
      this.inputButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = this.inputEmail.value;
        const password = this.inputPassword.value;

        // El try me ayuda a que google me haga validación y si ocurre algún error, yo puedo mostrar como alert ese detalle del por qué no deja ingresar/registrar
        try {
          // Si la página es signup vamos a intentar a hacer una creación de usuario
          if (window.location.href.includes("signup")) {
            // Si el check no está activo, no deja registrar
            if (this.inputCheck.checked) {
              // Si el check está activo, deja registrar e inmediatamente inicia sesión
              await fb.fbAuthCreateUser(email, password);
              alert("User was registered successfully!!!");
              window.location.href = "/";
            } else {
              // Si el check no está activo no crea usuario e indica que acepte términos y condiciones
              alert("Please accept terms and conditions");
            }
          } else {
            // Si la página no es signup por descarte sabemos que es login, por tanto inicializamos el login
            await fb.fbAuthSignIn(email, password);
            alert("Welcome");
            window.location.href = "/";
          }
        } catch (error) {
          // En caso de que en alguno de las opciones anteriores se muestre error, se imprime las causas del problema
          // el cual suele ser problemas de validación del formulario desde el lado del servidor, o usuarios ya existentes
          alert(error.message);
        }
      });
    };
  }
}
