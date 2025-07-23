// Datos de productos con sus imágenes y detalles
const products = {
    1: {
        name: "Luka 2 Negro",
        price: "Q185",
        description: "Bota elegante en color negro, perfecta para ocasiones formales e informales. Fabricada en cuero genuino con suela antideslizante para mayor comodidad y seguridad.",
        images: [
            "imagenes/negro_liso.jpg",
            "imagenes/zapato3.jpg",
            "imagenes/zapato2.jpg"
        ],
        colors: ["Los colores disponibles son: Blanco, Beige, Negro y Gena"],
        sizes: ["34", "35", "36", "37", "38", "39"]
    },
    2: {
        name: "Luka",
        price: "Q185",
        description: "Botín elegante, ideal para combinar con cualquier outfit. Diseño cómodo con plantilla acolchada para mayor confort durante todo el día.",
        images: [
            "imagenes/zapato4.jpg",
            "imagenes/zapato5.jpg",
            "imagenes/zapato6.jpg",
            "imagenes/zapato8.jpg"
        ],
        colors: ["Los colores disponibles son: Negro, Gena, Beige, Café y Blanco"],
        sizes: ["34","35", "36", "37", "38", "39"]
    },
    3: {
        name: "Luka 2 Blanco",
        price: "Q185",
        description: "Botines blancos con detalles minimalistas, perfectos para looks frescos y modernos. Material resistente al agua y fácil de limpiar.",
        images: [
            "imagenes/zapato3.jpg",
            "imagenes/zapato3_2.jpg",
            "imagenes/zapato3_3.jpg"
        ],
        colors: ["#FFFFFF", "#F5F5F5", "#E6E6FA"],
        sizes: ["36", "37", "38", "39", "40"]
    },
    4: {
        name: "Luka Gena",
        price: "Q185",
        description: "Botín versátil en tonos grises, con diseño ergonómico que se adapta a la forma de tu pie. Ideal para uso diario gracias a su durabilidad y estilo.",
        images: [
            "imagenes/zapato4.jpg",
            "imagenes/zapato4_2.jpg",
            "imagenes/zapato4_3.jpg"
        ],
        colors: ["#708090", "#4682B4", "#5F9EA0"],
        sizes: ["35", "36", "37", "38", "39", "40"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Configurar event listeners para las imágenes
    document.querySelectorAll('.product-image-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            openProductModal(productId);
        });
    });
});

function openProductModal(productId) {
    const product = products[productId];
    const modal = document.getElementById('product-modal');
    
    // Actualizar contenido del modal
    document.getElementById('modal-product-title').textContent = product.name;
    document.getElementById('modal-product-price').textContent = product.price;
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Configurar botón de WhatsApp
    const whatsappBtn = document.getElementById('modal-whatsapp-btn');
    whatsappBtn.href = `https://wa.me/50250174461?text=Estoy%20interesado%20en%20el%20modelo%20${encodeURIComponent(product.name)}`;
    
    // Mostrar imágenes
    const mainImage = document.getElementById('modal-main-image');
    mainImage.src = product.images[0];
    mainImage.alt = product.name;
    
    // Mostrar thumbnails
    const thumbnailsContainer = document.getElementById('modal-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Miniatura ${index + 1} de ${product.name}`;
        thumbnail.className = index === 0 ? 'active' : '';
        thumbnail.addEventListener('click', () => {
            // Actualizar imagen principal
            mainImage.src = image;
            // Marcar thumbnail como activo
            document.querySelectorAll('#modal-thumbnails img').forEach(img => img.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Mostrar colores
    const colorsContainer = document.getElementById('modal-colors');
    colorsContainer.innerHTML = '<h3>Colores disponibles</h3>';
    
    // Verificar si el producto tiene texto descriptivo (productos 1 y 2)
    if (productId === "1" || productId === "2") {
        // Mostramos el texto directamente
        const colorText = document.createElement('p');
        colorText.textContent = product.colors[0];
        colorText.style.marginTop = '10px';
        colorText.style.fontSize = '16px';
        colorText.style.color = '#555';
        colorsContainer.appendChild(colorText);
    } else {
        // Para los productos 3 y 4, mostramos los círculos de color
        const colorOptions = document.createElement('div');
        colorOptions.className = 'color-options';
        colorsContainer.appendChild(colorOptions);
        
        product.colors.forEach(color => {
            const colorOption = document.createElement('span');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color;
            colorOption.title = color;
            colorOptions.appendChild(colorOption);
        });
    }
    
    // Mostrar tallas
    const sizesContainer = document.getElementById('modal-sizes');
    sizesContainer.innerHTML = '';
    
    product.sizes.forEach(size => {
        const sizeOption = document.createElement('span');
        sizeOption.className = 'size-option';
        sizeOption.textContent = size;
        sizeOption.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            // Actualizar enlace de WhatsApp con la talla seleccionada
            const selectedSize = this.textContent;
            whatsappBtn.href = `https://wa.me/50250174461?text=Estoy%20interesado%20en%20el%20modelo%20${encodeURIComponent(product.name)}%20talla%20${selectedSize}`;
        });
        sizesContainer.appendChild(sizeOption);
    });
    
    // Mostrar el modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal al hacer clic en la X
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}