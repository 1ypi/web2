document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.querySelector('.close');

    const accountDetails = {
        básica: {
            image: 'url_de_imagen_basica.jpg',
            description: 'Cuenta Básica con $100,000,000 en GTA Online.',
            originalPrice: '20€',
            discountedPrice: '10€'
        },
        premium: {
            image: 'url_de_imagen_premium.jpg',
            description: 'Cuenta Premium con $500,000,000 en GTA Online.',
            originalPrice: '24€',
            discountedPrice: '14€'
        },
        élite: {
            image: 'url_de_imagen_elite.jpg',
            description: 'Cuenta Élite con $1,000,000,000 en GTA Online.',
            originalPrice: '29€',
            discountedPrice: '19€'
        }
    };

    products.forEach(product => {
        product.querySelector('button').addEventListener('click', () => {
            const accountType = product.getAttribute('data-account');
            const details = accountDetails[accountType];

            modalImage.src = details.image;
            modalDescription.textContent = details.description;
            modalPrice.innerHTML = `<span class="original-price">${details.originalPrice}</span>${details.discountedPrice}`;

            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
