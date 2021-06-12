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

        try {
          if (window.location.href.includes("signup")) {
            if (this.inputCheck.checked) {
              await fb.fbAuthCreateUser(email, password);
              alert("User was registered successfully!!!");
              window.location.href = "/";
            } else {
              alert("Please accept terms and conditions");
            }
          } else {
            await fb.fbAuthSignIn(email, password);
            alert("Welcome");
            window.location.href = "/";
          }
        } catch (error) {
          alert(error.message);
        }
      });
    };
  }
}
