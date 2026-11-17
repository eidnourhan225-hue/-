/**
 * مخبز ريف المعادي - JavaScript Logic
 */

// Phone number for WhatsApp orders (International format without +)
const BAKERY_PHONE = '201099998888';

document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilter();
    initNavbarScroll();
    initMobileMenu();
    checkWorkingHours();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const toggleBtn = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    // Close when clicking any nav link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    });
}

/**
 * Filter products by category
 */
function initCategoryFilter() {
    const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
    const productCards = document.querySelectorAll('.products-grid .product-card');

    if (!tabButtons.length || !productCards.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.classList.remove('hidden');
                    // Add smooth appearance
                    card.style.animation = 'fadeIn 0.35s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Open WhatsApp with pre-filled order text for the chosen product
 * @param {string} productName 
 * @param {string} price 
 */
function orderItem(productName, price) {
    const message = `مرحباً مخبز ريف المعادي 👋\nأود طلب:\n🍞 *${productName}* (${price})\n\nهل متوفر للتوصيل الآن داخل المعادي؟`;
    const whatsappUrl = `https://wa.me/${BAKERY_PHONE}?text=${encodeURIComponent(message)}`;
    
    showToast(`جاري تحضير طلب: ${productName}`);

    // Small delay so user sees feedback, then opens WhatsApp
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 450);
}

/**
 * Show a sleek toast message
 * @param {string} text 
 */
function showToast(text) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = text;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/**
 * Add active shadow to navbar when scrolling
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.style.boxShadow = '0 4px 20px rgba(43, 31, 23, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

/**
 * Dynamic check if the bakery is currently open (7:00 AM to 11:00 PM)
 */
function checkWorkingHours() {
    const badge = document.querySelector('.badge-open');
    if (!badge) return;

    const now = new Date();
    const currentHour = now.getHours();

    // Open from 7:00 (7) to 23:00 (23)
    if (currentHour >= 7 && currentHour < 23) {
        badge.textContent = 'مفتوح الآن';
        badge.style.backgroundColor = '#d1fae5';
        badge.style.color = '#065f46';
    } else {
        badge.textContent = 'مغلق حالياً - يفتح في 7 صباحاً';
        badge.style.backgroundColor = '#fee2e2';
        badge.style.color = '#991b1b';
    }
}
