document.addEventListener('DOMContentLoaded', function() {
    
    // --- KHỞI TẠO CÁC SLIDER ---
    const initSliders = () => {
        if (document.querySelector('.main-slider')) {
            new Swiper('.main-slider', {
                loop: true,
                autoplay: { delay: 4000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            });
        }
        if (document.querySelector('.brands-slider')) {
            new Swiper('.brands-slider', {
                loop: true,
                autoplay: { delay: 2000, disableOnInteraction: false },
                slidesPerView: 2, spaceBetween: 10,
                breakpoints: {
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 5, spaceBetween: 40 },
                    1024: { slidesPerView: 7, spaceBetween: 50 },
                },
            });
        }
        if (document.querySelector('.voucher-slider')) {
            new Swiper('.voucher-slider', {
                loop: true,
                autoplay: { delay: 3500, disableOnInteraction: false },
                slidesPerView: 1,
            });
        }
        if (document.querySelector('.secondary-banner-slider')) {
            new Swiper('.secondary-banner-slider', {
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false, },
                slidesPerView: 1,
            });
        }
        if (document.querySelector('.about-us-slider')) {
            new Swiper('.about-us-slider', {
                loop: true,
                autoplay: { delay: 2500, disableOnInteraction: false, },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                slidesPerView: 1,
                 breakpoints: {
                    768: { slidesPerView: 3, spaceBetween: 20 },
                },
            });
        }
        if (document.querySelector('.bestseller-slider')) {
            new Swiper('.bestseller-slider', {
                loop: true,
                autoplay: { delay: 2800, disableOnInteraction: false, },
                navigation: { nextEl: '.bestseller-next', prevEl: '.bestseller-prev' },
                slidesPerView: 2,
                spaceBetween: 10,
                 breakpoints: {
                    640: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 30 },
                    1024: { slidesPerView: 6, spaceBetween: 40 },
                },
            });
        }
    };

    // --- HIỆU ỨNG CUỘN TRANG ---
    const initScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(el => observer.observe(el));
        }
    };

    // --- CHỨC NĂNG CHUNG ---
    const initCommonFunctions = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        }

        const welcomeModalOverlay = document.getElementById('welcome-modal-overlay');
        if (welcomeModalOverlay) {
            const closeModalBtn = document.getElementById('close-welcome-modal-btn');
            const confirmRegionBtn = document.getElementById('confirm-region-btn');
            const showModal = () => welcomeModalOverlay.classList.add('visible');
            const hideModal = () => welcomeModalOverlay.classList.remove('visible');
            
            if (!localStorage.getItem('regionConfirmed')) {
                setTimeout(showModal, 500);
            }

            const confirmAndHide = () => {
                localStorage.setItem('regionConfirmed', 'true');
                hideModal();
            };

            if (confirmRegionBtn) confirmRegionBtn.addEventListener('click', confirmAndHide);
            if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
            welcomeModalOverlay.addEventListener('click', (e) => { if (e.target === welcomeModalOverlay) hideModal(); });
        }
    };

    // --- GIỎ HÀNG (MÔ PHỎNG) ---
    const initCart = () => {
        const cartCountSpan = document.getElementById('cart-count');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const updateCartCount = () => {
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            if (cartCountSpan) cartCountSpan.textContent = totalItems;
            localStorage.setItem('cartCount', totalItems);
        };
        
        const saveCart = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
        };

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const productToAdd = {
                    id: 'SKU37041302',
                    name: 'Đầm Cuore',
                    price: 499000,
                    image: 'img/product-1-main.jpg',
                    size: 'M',
                    color: 'Medium Blue',
                };

                const existingItem = cartItems.find(item => item.id === productToAdd.id);
                if(existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({...productToAdd, quantity: 1});
                }
                
                saveCart();
                
                const originalText = addToCartBtn.textContent;
                addToCartBtn.textContent = 'Đã thêm!';
                addToCartBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                addToCartBtn.classList.remove('bg-black', 'hover:bg-gray-800');

                setTimeout(() => {
                    addToCartBtn.textContent = originalText;
                    addToCartBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                    addToCartBtn.classList.add('bg-black', 'hover:bg-gray-800');
                }, 1500);
            });
        }
        updateCartCount();
    };

    // --- TRANG CHI TIẾT SẢN PHẨM ---
    const initProductDetailPage = () => {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-img');
        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    mainImage.src = this.dataset.src;
                    thumbnails.forEach(t => t.classList.remove('border-black'));
                    this.classList.add('border-black');
                });
            });
        }

        const tabsContainer = document.getElementById('info-tabs');
        const tabContents = document.querySelectorAll('.tab-content');
        if (tabsContainer && tabContents.length > 0) {
            tabsContainer.addEventListener('click', (e) => {
                if (e.target.matches('.tab-btn')) {
                    const tabId = e.target.dataset.tab;
                    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    tabContents.forEach(content => {
                        content.classList.toggle('hidden', content.id !== `${tabId}-content`);
                    });
                }
            });
        }
    };

    // --- TRANG SẢN PHẨM ---
    const initProductListPage = () => {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        if (favoriteButtons.length > 0) {
            favoriteButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    this.classList.toggle('active');
                });
            });
        }
    };

    // --- TRANG HỖ TRỢ KHÁCH HÀNG ---
    const initSupportPage = () => {
        const navContainer = document.getElementById('support-nav');
        const contentContainer = document.getElementById('support-content');

        if (!navContainer || !contentContainer) return;

        const navLinks = navContainer.querySelectorAll('.support-nav-link');
        const contentSections = contentContainer.querySelectorAll('.support-section');

        const activateSection = (hash) => {
            const sectionId = hash.substring(1); 
            
            navLinks.forEach(link => {
                link.classList.toggle('active', link.hash === hash);
            });
            
            contentSections.forEach(section => {
                section.classList.toggle('hidden', section.dataset.section !== sectionId);
            });
        };
        
        navContainer.addEventListener('click', (e) => {
            const targetLink = e.target.closest('a');
            if (targetLink && targetLink.hash) {
                activateSection(targetLink.hash);
            }
        });

        if (window.location.hash) {
            activateSection(window.location.hash);
        }
    };

    // --- TRANG GIỎ HÀNG ---
    const initCartPage = () => {
        if (!document.getElementById('cart-page-container')) return;

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const emptyCartView = document.getElementById('empty-cart');
        const cartWithItemsView = document.getElementById('cart-with-items');
        const cartItemsList = document.getElementById('cart-items-list');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartTotal = document.getElementById('cart-total');
        
        const saveCart = () => {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
             localStorage.setItem('cartCount', totalItems);
             const cartCountSpan = document.getElementById('cart-count');
             if(cartCountSpan) cartCountSpan.textContent = totalItems;
        };

        const renderCart = () => {
            if (cartItems.length === 0) {
                emptyCartView.classList.remove('hidden');
                cartWithItemsView.classList.add('hidden');
            } else {
                emptyCartView.classList.add('hidden');
                cartWithItemsView.classList.remove('hidden');
                
                cartItemsList.innerHTML = '';
                let subtotal = 0;

                cartItems.forEach((item, index) => {
                    const itemTotal = item.price * item.quantity;
                    subtotal += itemTotal;
                    
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item bg-white p-4 rounded-lg shadow-md flex gap-4';
                    itemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-32 object-cover rounded-md">
                        <div class="flex-grow flex flex-col">
                            <h3 class="font-bold">${item.name}</h3>
                            <p class="text-sm text-gray-500">Màu: ${item.color} / Size: ${item.size}</p>
                            <p class="text-green-600 font-semibold my-2">${item.price.toLocaleString('vi-VN')}₫</p>
                            <div class="flex items-center border rounded-md w-fit mt-auto">
                                <button data-index="${index}" class="quantity-decrease px-3 py-1 text-lg">-</button>
                                <span class="px-4">${item.quantity}</span>
                                <button data-index="${index}" class="quantity-increase px-3 py-1 text-lg">+</button>
                            </div>
                        </div>
                        <div class="flex flex-col items-end">
                            <p class="font-bold mb-auto">${itemTotal.toLocaleString('vi-VN')}₫</p>
                            <button data-index="${index}" class="remove-item text-gray-400 hover:text-red-500 text-sm"><i class="fas fa-trash-alt mr-1"></i> Xóa</button>
                        </div>
                    `;
                    cartItemsList.appendChild(itemElement);
                });

                cartSubtotal.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
                cartTotal.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
            }
        };

        cartItemsList.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const index = target.dataset.index;

            if (target.classList.contains('quantity-decrease')) {
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                }
            }
            if (target.classList.contains('quantity-increase')) {
                cartItems[index].quantity++;
            }
            if (target.classList.contains('remove-item')) {
                cartItems.splice(index, 1);
            }
            saveCart();
            renderCart();
        });

        renderCart();
    };

    // --- TRANG THANH TOÁN ---
    const initCheckoutPage = () => {
        if (!document.querySelector('body').classList.contains('page-checkout')) return;

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const checkoutItemsList = document.getElementById('checkout-items-list');
        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');
        const checkoutShipping = document.getElementById('checkout-shipping');
        const shippingFee = 0; // Tạm thời miễn phí

        if(cartItems.length === 0) {
            checkoutItemsList.innerHTML = `<p class="text-gray-500 text-center">Không có sản phẩm nào để thanh toán.</p>`;
            return;
        }

        checkoutItemsList.innerHTML = '';
        let subtotal = 0;

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center py-4 border-b';
            itemElement.innerHTML = `
                <div class="flex items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-md">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-sm text-gray-500">Phân loại: ${item.color}, ${item.size}</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm text-right">
                    <span>${item.price.toLocaleString('vi-VN')}₫</span>
                    <span>${item.quantity}</span>
                    <span class="font-semibold">${itemTotal.toLocaleString('vi-VN')}₫</span>
                </div>
            `;
            checkoutItemsList.appendChild(itemElement);
        });

        const total = subtotal + shippingFee;
        checkoutSubtotal.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
        checkoutShipping.textContent = shippingFee > 0 ? `${shippingFee.toLocaleString('vi-VN')}₫` : 'Miễn phí';
        checkoutTotal.textContent = `${total.toLocaleString('vi-VN')}₫`;
    };

    // --- CHẠY TẤT CẢ CÁC HÀM ---
    initSliders();
    initScrollAnimations();
    initCommonFunctions();
    initCart();
    initProductDetailPage();
    initProductListPage();
    initSupportPage();
    initCartPage();
    initCheckoutPage();
});

