// Define the path to the JSON file containing product data
const PRODUCTS_FILE_PATH = "data.json";

// Fetch the product data from the JSON file
fetch(PRODUCTS_FILE_PATH)
  .then((response) => response.json())
  .then((products) => {
    // Generate HTML for each product in the list
    const productHTML = products.map((product) => {
      return `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Features: ${product.features.join("<br>")}</p>
                <p><a href="${product.link}">Download</a></p>
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
