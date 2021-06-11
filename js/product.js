// Clase que me exporta el objeto HTML en string, viene con las clases ya definidas dentro del styles.css
export class Product {
  constructor() {
    this.blockOfProducts = document.querySelector(".catalog-block");

    // Devuelve un template string personalizado con los datos del objeto que se ingresen
    this.renderProduct = function (obj) {
      return `<article class="card">
          <div class="card-header">
              <img src="${obj.image}" alt="" class="card-image">
          </div>
          <div class="card-body">
              <div class="icons-container">
                  <button class="btn edit-button" data-id="${obj.id}">
                      <svg class="main-icon" data-id="${obj.id}">
                          <use xlink:href="./icons/sprite.svg#pencil"></use>
                      </svg>
                  </button>
                  <button class="btn delete-button" data-id="${obj.id}">
                      <svg class="main-icon" data-id="${obj.id}">
                          <use xlink:href="./icons/sprite.svg#delete"></use>
                      </svg>
                  </button>
              </div>
              <p class="card-text">${obj.name}</p>
              <h2 class="card-text">$ ${obj.price} USD</h2>
              <p class="card-text description-title">Description</p>
              <p class="card-text description">${obj.description}</p>
          </div>
      </article>`;
    };
  }
}
