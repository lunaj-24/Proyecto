document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    
    // Obtener el ID de cada categoría desde localStorage (muestra en letra de entrega)
    const categoryId = localStorage.getItem('catID');
    
    // Verificar si ese valor de categoryId existe y si un número válido (van desde 101 a 109)
    if (!categoryId) {
        productsContainer.innerHTML = '<p>ID de categoría no válido.</p>';
        return;
    }

    // Creacion de una URL utilizando categoryId, y no las urls de cada categoria por separado (repeticion de codigo)
    const URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryId}.json`;

    function fetchProducts() {
        fetch(URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.products) {
                    displayProducts(data.products); // Llama a la función para mostrar los productos
                } else {
                    console.error('Datos de productos no encontrados o estructura inesperada:', data);
                    productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
                }
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                productsContainer.innerHTML = '<p>Error al cargar productos. Inténtalo de nuevo más tarde.</p>';
            });
    }

    function displayProducts(products) {
        if (!products || !products.length) {
            productsContainer.innerHTML = '<p>No se encontraron productos.</p>';
            return;
        }

        productsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar productos

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card'; 
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>Precio:</strong> ${product.cost} ${product.currency}</p>
                <p><strong>Vendidos:</strong> ${product.soldCount}</p>
            `;
            productsContainer.appendChild(productCard);
        });
    }

    // Inicializar la carga de productos correspondiente a cada categoria
    fetchProducts();
});
