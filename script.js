// Populate guest options
const guestSelect = document.querySelector('select[name="guests"]');
for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} ${i === 1 ? 'Guest' : 'Guests'}`;
    guestSelect.appendChild(option);
}

// Populate time options
const timeSelect = document.querySelector('select[name="time"]');
const times = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];
times.forEach(time => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
});

// Set minimum date for booking
const dateInput = document.querySelector('input[type="date"]');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split('T')[0];

// Handle mailing list form submission
document.querySelectorAll('.mailing-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        showNotification('Thank you for subscribing to our mailing list!');
        e.target.reset();
    });
});

// Handle booking form submission
document.querySelector('.booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        guests: guestSelect.value,
        date: dateInput.value,
        time: timeSelect.value
    };

    if (!formData.guests || !formData.date || !formData.time) {
        showNotification('Please fill in all booking details.', 'error');
        return;
    }

    // Here you would typically send this to your backend
    showNotification('Thank you for your reservation request! We will confirm shortly.');
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Here you would typically send this to your backend
        showNotification('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sticky header
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: #4CAF50;
        color: white;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.error {
        background-color: #f44336;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Full Menu Modal
const fullMenuButton = document.querySelector('.btn-secondary');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Manan Restaurant - Full Menu</h2>
        <div class="modal-menu-categories">
            <div class="modal-category">
                <h3>Signature Dishes</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Pan-Seared Duck Breast</h4>
                        <p>With cherry reduction, roasted vegetables</p>
                        <span class="price">$38</span>
                    </div>
                    <div class="modal-item">
                        <h4>Lobster Thermidor</h4>
                        <p>Fresh lobster in creamy sauce, gratinéed</p>
                        <span class="price">$45</span>
                    </div>
                    <div class="modal-item">
                        <h4>Wagyu Beef Tenderloin</h4>
                        <p>With truffle mashed potatoes, seasonal vegetables</p>
                        <span class="price">$52</span>
                    </div>
                </div>
            </div>
            <div class="modal-category">
                <h3>Main Course</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Grilled Salmon</h4>
                        <p>With lemon butter sauce, asparagus</p>
                        <span class="price">$32</span>
                    </div>
                    <div class="modal-item">
                        <h4>Chicken Supreme</h4>
                        <p>With wild mushroom sauce, seasonal vegetables</p>
                        <span class="price">$28</span>
                    </div>
                    <div class="modal-item">
                        <h4>Vegetable Risotto</h4>
                        <p>With seasonal vegetables, parmesan</p>
                        <span class="price">$24</span>
                    </div>
                </div>
            </div>
            <div class="modal-category">
                <h3>Desserts</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Chocolate Soufflé</h4>
                        <p>With vanilla ice cream</p>
                        <span class="price">$12</span>
                    </div>
                    <div class="modal-item">
                        <h4>Crème Brûlée</h4>
                        <p>With fresh berries</p>
                        <span class="price">$10</span>
                    </div>
                    <div class="modal-item">
                        <h4>Seasonal Fruit Tart</h4>
                        <p>With whipped cream</p>
                        <span class="price">$11</span>
                    </div>
                </div>
            </div>
            <div class="modal-category">
                <h3>Starters</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Foie Gras Terrine</h4>
                        <p>With brioche toast, fig jam</p>
                        <span class="price">$18</span>
                    </div>
                    <div class="modal-item">
                        <h4>Seared Scallops</h4>
                        <p>With cauliflower purée, truffle oil</p>
                        <span class="price">$22</span>
                    </div>
                    <div class="modal-item">
                        <h4>Beef Carpaccio</h4>
                        <p>With arugula, parmesan, truffle oil</p>
                        <span class="price">$20</span>
                    </div>
                </div>
            </div>
            <div class="modal-category">
                <h3>Wine Pairings</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Chardonnay</h4>
                        <p>California, 2020</p>
                        <span class="price">$12/glass</span>
                    </div>
                    <div class="modal-item">
                        <h4>Pinot Noir</h4>
                        <p>Oregon, 2019</p>
                        <span class="price">$14/glass</span>
                    </div>
                    <div class="modal-item">
                        <h4>Cabernet Sauvignon</h4>
                        <p>Napa Valley, 2018</p>
                        <span class="price">$16/glass</span>
                    </div>
                </div>
            </div>
            <div class="modal-category">
                <h3>Cocktails</h3>
                <div class="modal-menu-items">
                    <div class="modal-item">
                        <h4>Manan Martini</h4>
                        <p>Gin, dry vermouth, olive</p>
                        <span class="price">$15</span>
                    </div>
                    <div class="modal-item">
                        <h4>Seasonal Spritz</h4>
                        <p>Prosecco, aperol, soda</p>
                        <span class="price">$13</span>
                    </div>
                    <div class="modal-item">
                        <h4>Old Fashioned</h4>
                        <p>Bourbon, bitters, sugar</p>
                        <span class="price">$14</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

document.body.appendChild(modal);

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        overflow-y: auto;
    }

    .modal-content {
        background-color: var(--secondary-color);
        margin: 2rem auto;
        padding: 2rem;
        width: 90%;
        max-width: 1200px;
        border-radius: 8px;
        position: relative;
        animation: modalFadeIn 0.3s ease-out;
    }

    .close-modal {
        position: absolute;
        right: 1.5rem;
        top: 1rem;
        font-size: 2rem;
        cursor: pointer;
        color: var(--primary-color);
        transition: var(--transition);
    }

    .close-modal:hover {
        color: var(--accent-color);
    }

    .modal-menu-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .modal-category {
        background: #f9f9f9;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .modal-category h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--accent-color);
    }

    .modal-item {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .modal-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .modal-item h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .modal-item p {
        color: #666;
        font-size: 0.9rem;
    }

    .modal-item .price {
        color: var(--accent-color);
        font-weight: 600;
    }

    @keyframes modalFadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .modal-content {
            width: 95%;
            margin: 1rem auto;
            padding: 1rem;
        }

        .modal-menu-categories {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(modalStyles);

// Modal functionality
fullMenuButton.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

const closeModal = modal.querySelector('.close-modal');
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Mobile Menu Functionality
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');

function toggleMenu() {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Event Listeners
menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        toggleMenu();
    }
}); 