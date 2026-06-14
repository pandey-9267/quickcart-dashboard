
// GLOBAL VARIABLES


let products = [];
let cart = 0;



// FETCH PRODUCTS FROM API


async function getProducts() {
    try {

        let response = await fetch("https://fakestoreapi.com/products");

        products = await response.json();

        displayProducts(products);
        createCategories();

    } 
    catch (error) {

        document.getElementById("productContainer").innerHTML =
            "<h3>API not working</h3>";

    }
}

// call function
getProducts();



// DISPLAY PRODUCTS


function displayProducts(data) {

    let container = document.getElementById("productContainer");

    container.innerHTML = "";

    data.forEach(product => {

        container.innerHTML += `

        <div class="col-md-3 mb-4">

            <div class="card p-2 h-100">

                <img 
                    src="${product.image}" 
                    height="150"
                >

                <h6>
                    ${product.title}
                </h6>

                <p>
                    ₹ ${product.price}
                </p>

                <p>
                    ${product.category}
                </p>

                <button 
                    onclick="addToCart()" 
                    class="btn btn-dark"
                >
                    Add to Cart
                </button>

            </div>

        </div>

        `;
    });

}



// CREATE CATEGORY DROPDOWN


function createCategories() {

    let categories = [
        ...new Set(
            products.map(p => p.category)
        )
    ];

    let dropdown = document.getElementById("categoryFilter");

    categories.forEach(cat => {

        dropdown.innerHTML += `
            <option value="${cat}">
                ${cat}
            </option>
        `;

    });

}



// SEARCH FUNCTION


document
    .getElementById("searchInput")
    .addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let filtered = products.filter(p =>
            p.title
                .toLowerCase()
                .includes(value)
        );

        displayProducts(filtered);

    });


// CATEGORY FILTER


document
    .getElementById("categoryFilter")
    .addEventListener("change", function () {

        let value = this.value;

        if (value == "all") {

            displayProducts(products);

        } 
        else {

            let filtered = products.filter(p =>
                p.category == value
            );

            displayProducts(filtered);

        }

    });


// SORT BY PRICE


document
    .getElementById("sortPrice")
    .addEventListener("change", function () {

        let sorted = [...products];

        if (this.value == "low") {

            sorted.sort(
                (a, b) => a.price - b.price
            );

        } 
        else if (this.value == "high") {

            sorted.sort(
                (a, b) => b.price - a.price
            );

        }

        displayProducts(sorted);

    });



// ADD TO CART


function addToCart() {

    cart++;

    document
        .getElementById("cartCount")
        .innerText = cart;

}