const PRODUCTS_FILE_PATH = "data.json";

fetch(PRODUCTS_FILE_PATH)
  .then((response) => response.json())
  .then((products) => {
    const productHTML = products.map((product) => {
      return `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Features: ${product.features.join("<br>")}</p>
                <p>${product.link}</p>
                <p>Release Date: ${product.date}</p>
                <p>Version: ${product.version}</p>
                <hr color="gray">
            `;
    });

    // Add the HTML to the page
    const productList = document.getElementById("game-list");
    productList.innerHTML = productHTML.join("");
  })
  .catch((error) => console.error(error));
