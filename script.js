document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const modal = document.getElementById('modal');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.querySelector('.close');
    const counter = document.getElementById('counter');
    const buttons = document.querySelectorAll('.product button');

    const accountDetails = {
        básica: {
            description: 'Cuenta Básica con $100,000,000 en GTA Online.',
            originalPrice: '20€',
            discountedPrice: '10€'
        },
        premium: {
            description: 'Cuenta Premium con $500,000,000 en GTA Online.',
            originalPrice: '24€',
            discountedPrice: '14€'
        },
        élite: {
            description: 'Cuenta Élite con $1,000,000,000 en GTA Online.',
            originalPrice: '29€',
            discountedPrice: '19€'
        }
    };

    products.forEach(product => {
        product.querySelector('button').addEventListener('click', () => {
            const accountType = product.getAttribute('data-account');
            const details = accountDetails[accountType];


            modalDescription.textContent = details.description;
            modalPrice.innerHTML = `<span class="original-price">${details.originalPrice}</span>${details.discountedPrice}`;

            modal.style.display = 'flex';
        });
    });

    let interval;

    const startCounter = (targetAmount) => {
        counter.innerText = '$0';
        let count = 0;
        const target = targetAmount;
        const increment = target / (1 * 100); // 10 seconds divided into 100ms intervals

        interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(interval);
                counter.innerText = '$' + target.toLocaleString();
            } else {
                counter.innerText = '$' + Math.floor(count).toLocaleString();
            }
        }, 100);
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let targetAmount;
            if (button.parentElement.dataset.account === 'básica') {
                targetAmount = 100000000;
            } else if (button.parentElement.dataset.account === 'premium') {
                targetAmount = 500000000;
            } else if (button.parentElement.dataset.account === 'élite') {
                targetAmount = 1000000000;
            }
            startCounter(targetAmount);
            modal.style.display = 'flex';
        });
    });

    const closeModalHandler = () => {
        clearInterval(interval);
        counter.innerText = '0'; // Reinicia el contador a 0
        modal.style.display = 'none';
    };

    closeModal.addEventListener('click', closeModalHandler);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });
});
