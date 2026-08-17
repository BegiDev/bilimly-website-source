import { firebaseConfig } from "./config.js";

document.addEventListener('DOMContentLoaded', function () {
            // Load language data
            let langData = null;

            // Fetch the language data
            const isFileProtocol = window.location.protocol === 'file:';
            if (isFileProtocol && window.__langData) {
                langData = window.__langData;

                const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-lang') === savedLang) {
                        btn.classList.add('active');
                    }
                });

                applyLanguage(savedLang);
            } else {
                fetch('lang.json')
                    .then(response => response.json())
                    .then(data => {
                        langData = data;

                        const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
                        document.querySelectorAll('.lang-btn').forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.getAttribute('data-lang') === savedLang) {
                                btn.classList.add('active');
                            }
                        });

                        applyLanguage(savedLang);
                    })
                    .catch(error => {
                        if (window.__langData) {
                            langData = window.__langData;
                            applyLanguage(localStorage.getItem('selectedLanguage') || 'uz');
                            return;
                        }
                        console.error('Error loading language data:', error);
                    });
            }

            // Add click event listeners to language buttons
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const selectedLang = this.getAttribute('data-lang');

                    // Update active button
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    // Save selected language to localStorage
                    localStorage.setItem('selectedLanguage', selectedLang);

                    // Apply the selected language
                    applyLanguage(selectedLang);
                });
            });

            // Function to apply language
            function applyLanguage(lang) {
                if (!langData) return;

                // Update all elements with data-lang attribute
                document.querySelectorAll('[data-lang]').forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if (langData[lang] && langData[lang][key]) {
                        element.textContent = langData[lang][key];
                    }
                });

                // Update page title
                if (langData[lang] && langData[lang]['pageTitle']) {
                    document.title = langData[lang]['pageTitle'];
                }

                // Update meta tags
                updateMetaTag('description', langData[lang]['metaDescription']);
                updateMetaTag('keywords', langData[lang]['metaKeywords']);
                updateMetaProperty('og:title', langData[lang]['ogTitle']);
                updateMetaProperty('og:description', langData[lang]['ogDescription']);
                updateMetaProperty('twitter:title', langData[lang]['twitterTitle']);
                updateMetaProperty('twitter:description', langData[lang]['twitterDescription']);
            }

            // Helper function to update meta tags
            function updateMetaTag(name, content) {
                let meta = document.querySelector(`meta[name="${name}"]`);
                if (meta) {
                    meta.setAttribute('content', content);
                }
            }

            // Helper function to update meta property tags
            function updateMetaProperty(property, content) {
                let meta = document.querySelector(`meta[property="${property}"]`);
                if (meta) {
                    meta.setAttribute('content', content);
                }
            }
        });
        document.addEventListener('DOMContentLoaded', function () {
            let langData = null;

            const desktopDropdown = document.querySelector('.lang-dropdown');
            const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');

            // Fetch the language data
            const isFileProtocol = window.location.protocol === 'file:';
            if (isFileProtocol && window.__langData) {
                langData = window.__langData;
                const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

                applyLanguage(savedLang);
                ensureMobileDropdown();
                updateDropdownUI(savedLang);
                setupToggleHandlers();
                setupLangButtons();
            } else {
                fetch('lang.json')
                    .then(response => response.json())
                    .then(data => {
                        langData = data;

                        const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

                        applyLanguage(savedLang);
                        ensureMobileDropdown();
                        updateDropdownUI(savedLang);
                        setupToggleHandlers();
                        setupLangButtons();
                    })
                    .catch(error => {
                        if (window.__langData) {
                            langData = window.__langData;
                            const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
                            applyLanguage(savedLang);
                            ensureMobileDropdown();
                            updateDropdownUI(savedLang);
                            setupToggleHandlers();
                            setupLangButtons();
                            return;
                        }
                        console.error('Error loading language data:', error);
                    });
            }

            // Create a mobile-friendly clone of the dropdown inside the mobile menu
            function ensureMobileDropdown() {
                if (!mobileMenuWrapper || !desktopDropdown) return;

                // Avoid creating duplicate clones
                if (mobileMenuWrapper.querySelector('.mobile-lang-dropdown')) return;

                const clone = desktopDropdown.cloneNode(true);
                clone.classList.add('mobile-lang-dropdown');

                // Remove IDs inside the clone to avoid duplicates
                clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

                // Adjust classes so mobile styles can target it if needed
                mobileMenuWrapper.appendChild(clone);
            }

            // Toggle open/close for desktop and mobile dropdowns
            function setupToggleHandlers() {
                if (desktopDropdown) {
                    const desktopToggle = desktopDropdown.querySelector('.lang-current');
                    desktopToggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        desktopDropdown.classList.toggle('open');
                    });
                }

                const mobileDropdown = mobileMenuWrapper && mobileMenuWrapper.querySelector('.mobile-lang-dropdown');
                if (mobileDropdown) {
                    const mobileToggle = mobileDropdown.querySelector('.lang-current');
                    mobileToggle.addEventListener('click', (e) => {
                        e.stopPropagation();
                        mobileDropdown.classList.toggle('open');
                    });
                }

                // Close dropdowns when clicking outside
                document.addEventListener('click', (e) => {
                    if (desktopDropdown && !desktopDropdown.contains(e.target)) desktopDropdown.classList.remove('open');
                    const m = mobileMenuWrapper && mobileMenuWrapper.querySelector('.mobile-lang-dropdown');
                    if (m && !m.contains(e.target)) m.classList.remove('open');
                });
            }

            // Setup language button clicks (handles buttons in both desktop and mobile dropdowns)
            function setupLangButtons() {
                document.addEventListener('click', function (e) {
                    const btn = e.target.closest('.lang-btn');
                    if (!btn) return;

                    const selectedLang = btn.getAttribute('data-lang');

                    // Update localStorage
                    localStorage.setItem('selectedLanguage', selectedLang);

                    // Apply language
                    applyLanguage(selectedLang);

                    // Update dropdown UI
                    updateDropdownUI(selectedLang);

                    // Close any open dropdowns
                    if (desktopDropdown) desktopDropdown.classList.remove('open');
                    const mobileDropdown = mobileMenuWrapper && mobileMenuWrapper.querySelector('.mobile-lang-dropdown');
                    if (mobileDropdown) mobileDropdown.classList.remove('open');
                });
            }

            // Function to update dropdown UI (current label and active class)
            function updateDropdownUI(lang) {
                // Update any visible current-lang spans (desktop + mobile clones)
                document.querySelectorAll('.lang-current span').forEach(span => {
                    span.textContent = (lang || 'UZ').toUpperCase();
                });

                // Update active state for all lang-btn instances
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
                });
            }

            // Function to apply language (content + meta)
            function applyLanguage(lang) {
                if (!langData) return;

                document.querySelectorAll('[data-lang]').forEach(element => {
                    const key = element.getAttribute('data-lang');
                    if (langData[lang] && langData[lang][key]) {
                        element.textContent = langData[lang][key];
                    }
                });

                // Page title
                if (langData[lang] && langData[lang]['pageTitle']) {
                    document.title = langData[lang]['pageTitle'];
                }

                // Meta tags
                updateMetaTag('description', langData[lang]['metaDescription']);
                updateMetaTag('keywords', langData[lang]['metaKeywords']);
                updateMetaProperty('og:title', langData[lang]['ogTitle']);
                updateMetaProperty('og:description', langData[lang]['ogDescription']);
                updateMetaProperty('twitter:title', langData[lang]['twitterTitle']);
                updateMetaProperty('twitter:description', langData[lang]['twitterDescription']);
            }

            function updateMetaTag(name, content) {
                let meta = document.querySelector(`meta[name="${name}"]`);
                if (meta) meta.setAttribute('content', content);
            }

            function updateMetaProperty(property, content) {
                let meta = document.querySelector(`meta[property="${property}"]`);
                if (meta) meta.setAttribute('content', content);
            }
        });


        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const appleProvider = new firebase.auth.OAuthProvider('apple.com');

        const authText = {
            uz: {
                googleSuccess: "Google orqali kirish muvaffaqiyatli.",
                appleSuccess: "Apple orqali kirish muvaffaqiyatli.",
                "auth/invalid-email": "Email manzili noto'g'ri.",
                "auth/user-not-found": "Bunday foydalanuvchi topilmadi.",
                "auth/wrong-password": "Parol noto'g'ri.",
                "auth/too-many-requests": "Juda ko'p urinish. Keyinroq qayta urinib ko'ring.",
                "auth/email-already-in-use": "Bu email allaqachon ro'yxatdan o'tgan.",
                "auth/weak-password": "Parol juda qisqa. Kamida 6 ta belgi kiriting.",
                "auth/popup-closed-by-user": "Kirish oynasi yopildi.",
                "auth/network-request-failed": "Tarmoq xatosi. Internetni tekshiring."
            },
            en: {
                googleSuccess: "Signed in with Google successfully.",
                appleSuccess: "Signed in with Apple successfully.",
                "auth/invalid-email": "Invalid email address.",
                "auth/user-not-found": "User not found.",
                "auth/wrong-password": "Incorrect password.",
                "auth/too-many-requests": "Too many attempts. Try again later.",
                "auth/email-already-in-use": "This email is already registered.",
                "auth/weak-password": "Password is too weak. Use at least 6 characters.",
                "auth/popup-closed-by-user": "Sign-in window was closed.",
                "auth/network-request-failed": "Network error. Check your connection."
            },
            ru: {
                googleSuccess: "Вход через Google выполнен успешно.",
                appleSuccess: "Вход через Apple выполнен успешно.",
                "auth/invalid-email": "Неверный адрес email.",
                "auth/user-not-found": "Пользователь не найден.",
                "auth/wrong-password": "Неверный пароль.",
                "auth/too-many-requests": "Слишком много попыток. Попробуйте позже.",
                "auth/email-already-in-use": "Этот email уже зарегистрирован.",
                "auth/weak-password": "Слишком слабый пароль. Минимум 6 символов.",
                "auth/popup-closed-by-user": "Окно входа было закрыто.",
                "auth/network-request-failed": "Ошибка сети. Проверьте соединение."
            }
        };

        function getAuthLang() {
            return localStorage.getItem('selectedLanguage') || 'uz';
        }

        function getAuthMessage(error) {
            const lang = getAuthLang();
            const map = authText[lang] || authText.uz;
            if (error?.code && map[error.code]) return map[error.code];
            return error?.message || map["auth/network-request-failed"];
        }

        function showAuthMessage(message, isError = true) {
            const el = document.getElementById('authMessage');
            if (!el) return;
            el.textContent = message;
            el.classList.toggle('text-danger', isError);
            el.classList.toggle('text-success', !isError);
            el.classList.remove('d-none');
        }

        function clearAuthMessage() {
            const el = document.getElementById('authMessage');
            if (el) {
                el.textContent = '';
                el.classList.add('d-none');
            }
        }

        function setAuthLoading(isLoading) {
            const overlay = document.getElementById('authLoading');
            if (!overlay) return;
            overlay.classList.toggle('show', isLoading);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const googleButtons = document.querySelectorAll('.auth-google-btn');
            const appleButtons = document.querySelectorAll('.auth-apple-btn');
            const authButtons = document.querySelectorAll('[data-auth-action="true"]');
            let authInitialized = false;
            let authReadyResolve;
            const authReady = new Promise((resolve) => {
                authReadyResolve = resolve;
            });

            authButtons.forEach((button) => {
                button.removeAttribute('data-bs-toggle');
                button.removeAttribute('data-bs-target');
            });

            async function getCurrentUserSafe() {
                if (authInitialized) {
                    return auth.currentUser;
                }
                return authReady;
            }

            async function handleAuthActionClick(event) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                const user = await getCurrentUserSafe();
                if (!user) {
                    const modalEl = document.getElementById('authModal');
                    if (modalEl && window.bootstrap) {
                        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                        modal.show();
                    }
                    return;
                }
                try {
                    await user.getIdToken(true);
                    window.location.href = '/course/';
                } catch (_error) {
                    const modalEl = document.getElementById('authModal');
                    if (modalEl && window.bootstrap) {
                        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                        modal.show();
                    }
                }
            }

            authButtons.forEach((button) => {
                button.addEventListener('click', handleAuthActionClick);
            });

            googleButtons.forEach((button) => {
                button.addEventListener('click', async () => {
                    clearAuthMessage();
                    try {
                        setAuthLoading(true);
                        await auth.signInWithPopup(googleProvider);
                        const map = authText[getAuthLang()] || authText.uz;
                        showAuthMessage(map.googleSuccess, false);
                        window.location.href = '/course/';
                    } catch (error) {
                        showAuthMessage(getAuthMessage(error));
                    } finally {
                        setAuthLoading(false);
                    }
                });
            });

            appleButtons.forEach((button) => {
                button.addEventListener('click', async () => {
                    clearAuthMessage();
                    try {
                        setAuthLoading(true);
                        appleProvider.addScope('email');
                        await auth.signInWithPopup(appleProvider);
                        const map = authText[getAuthLang()] || authText.uz;
                        showAuthMessage(map.appleSuccess, false);
                        window.location.href = '/course/';
                    } catch (error) {
                        showAuthMessage(getAuthMessage(error));
                    } finally {
                        setAuthLoading(false);
                    }
                });
            });

            auth.onAuthStateChanged((user) => {
                if (!authInitialized) {
                    authInitialized = true;
                    authReadyResolve(user || null);
                }
                authButtons.forEach((button) => {
                    if (user) {
                        button.setAttribute('data-lang', 'myCourses');
                        button.textContent = (localStorage.getItem('selectedLanguage') || 'uz') === 'ru'
                            ? 'Moy kursy'
                            : (localStorage.getItem('selectedLanguage') || 'uz') === 'en'
                                ? 'My Courses'
                                : 'Mening kurslarim';
                    } else {
                        button.setAttribute('data-lang', 'navAuth');
                        button.textContent = (localStorage.getItem('selectedLanguage') || 'uz') === 'ru'
                            ? 'Вход / Регистрация'
                            : (localStorage.getItem('selectedLanguage') || 'uz') === 'en'
                                ? 'Sign in / Register'
                                : 'Kirish / Ro\'yxatdan o\'tish';
                    }
                });
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const sheet = document.getElementById('a2hsSheet');
            const backdrop = document.getElementById('a2hsBackdrop');
            const closeBtn = document.getElementById('a2hsClose');
            const dismissBtn = document.getElementById('a2hsDismissBtn');
            const installBtn = document.getElementById('a2hsInstallBtn');
            const iosHelp = document.getElementById('a2hsIosHelp');

            if (!sheet || !backdrop || !installBtn) return;

            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
            const dismissedKey = 'a2hsPromptDismissedSession';

            if (!isMobile || isStandalone || sessionStorage.getItem(dismissedKey) === '1') {
                return;
            }

            let deferredPrompt = null;

            window.addEventListener('beforeinstallprompt', (event) => {
                event.preventDefault();
                deferredPrompt = event;
                showSheet(false);
            });

            const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
            if (isIos) {
                showSheet(true);
            }

            function showSheet(showIosHelp) {
                if (showIosHelp && iosHelp) {
                    iosHelp.style.display = 'block';
                }
                backdrop.classList.add('show');
                sheet.classList.add('show');
            }

            function hideSheet() {
                backdrop.classList.remove('show');
                sheet.classList.remove('show');
            }

            function dismissSheet() {
                sessionStorage.setItem(dismissedKey, '1');
                hideSheet();
            }

            closeBtn && closeBtn.addEventListener('click', dismissSheet);
            dismissBtn && dismissBtn.addEventListener('click', dismissSheet);
            backdrop.addEventListener('click', dismissSheet);

            installBtn.addEventListener('click', async () => {
                if (!deferredPrompt) {
                    if (iosHelp) iosHelp.style.display = 'block';
                    return;
                }
                deferredPrompt.prompt();
                try {
                    await deferredPrompt.userChoice;
                } finally {
                    deferredPrompt = null;
                    dismissSheet();
                }
            });
        });
