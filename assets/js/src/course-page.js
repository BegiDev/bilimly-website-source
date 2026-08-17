import { firebaseConfig, SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

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

            // Fetch the language data
            const isFileProtocol = window.location.protocol === 'file:';
            if (isFileProtocol && window.__langData) {
                langData = window.__langData;
                const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

                applyLanguage(savedLang);
                updateDropdownUI(savedLang);
            } else {
                fetch('lang.json')
                    .then(response => response.json())
                    .then(data => {
                        langData = data;

                        const savedLang = localStorage.getItem('selectedLanguage') || 'uz';

                        applyLanguage(savedLang);
                        updateDropdownUI(savedLang);
                    })
                    .catch(error => {
                        if (window.__langData) {
                            langData = window.__langData;
                            const savedLang = localStorage.getItem('selectedLanguage') || 'uz';
                            applyLanguage(savedLang);
                            updateDropdownUI(savedLang);
                            return;
                        }
                        console.error('Error loading language data:', error);
                    });
            }

            // Dropdown toggle
            const dropdown = document.querySelector('.lang-dropdown');
            const toggle = document.getElementById('langToggle');
            const currentLangText = document.getElementById('current-lang');

            toggle.addEventListener('click', () => {
                dropdown.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });

            // Language buttons click
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    const selectedLang = this.getAttribute('data-lang');

                    // Update localStorage
                    localStorage.setItem('selectedLanguage', selectedLang);

                    // Apply language
                    applyLanguage(selectedLang);

                    // Update dropdown UI
                    updateDropdownUI(selectedLang);

                    // Close dropdown
                    dropdown.classList.remove('open');
                });
            });

            // Function to update dropdown UI
            function updateDropdownUI(lang) {
                currentLangText.textContent = lang.toUpperCase();
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-lang') === lang) {
                        btn.classList.add('active');
                    }
                });
            }

            // Function to apply language (your old code)
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

        const COURSE_CACHE_KEY = 'courseCatalogueCache';
        const COURSE_CACHE_TTL_MS = 10 * 60 * 1000;
        const SUPABASE_RATE_KEY = 'supabaseRateLimit';
        const SUPABASE_RATE_WINDOW_MS = 5 * 1000;
        const SUPABASE_RATE_MAX = 1;

        let supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
                storageKey: 'supabase-auth-firebase'
            }
        });
        let latestCataloguePayload = null;
        let latestUserProfile = null;
        let firebaseAccessToken = null;

        function getCurrentLang() {
            return localStorage.getItem('selectedLanguage') || 'uz';
        }

        function readCache() {
            try {
                const raw = localStorage.getItem(COURSE_CACHE_KEY);
                if (!raw) return null;
                const parsed = JSON.parse(raw);
                if (!parsed?.fetchedAt || !parsed?.payload) return null;
                if (Date.now() - parsed.fetchedAt > COURSE_CACHE_TTL_MS) return null;
                return parsed;
            } catch (_error) {
                return null;
            }
        }

        function canMakeSupabaseRequest() {
            const now = Date.now();
            const initial = { windowStart: now, count: 0 };
            let data = initial;
            try {
                const raw = localStorage.getItem(SUPABASE_RATE_KEY);
                if (raw) data = JSON.parse(raw);
            } catch (_error) {
                data = initial;
            }
            if (now - data.windowStart > SUPABASE_RATE_WINDOW_MS) {
                data.windowStart = now;
                data.count = 0;
            }
            if (data.count >= SUPABASE_RATE_MAX) {
                return false;
            }
            data.count += 1;
            localStorage.setItem(SUPABASE_RATE_KEY, JSON.stringify(data));
            return true;
        }

        async function refreshSupabaseClient(user) {
            if (!user) {
                firebaseAccessToken = null;
                return;
            }
            firebaseAccessToken = await user.getIdToken(true);
        }

        async function supabaseRest(path, options = {}) {
            const headers = new Headers(options.headers || {});
            headers.set('apikey', SUPABASE_ANON_KEY);
            headers.set('Content-Type', 'application/json');
            if (firebaseAccessToken) {
                headers.set('Authorization', `Bearer ${firebaseAccessToken}`);
            }
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
                ...options,
                headers
            });
            if (!response.ok) {
                const text = await response.text();
                const error = new Error(text || response.statusText);
                error.status = response.status;
                throw error;
            }
            if (response.status === 204) return null;
            return response.json();
        }

        function writeCache(payload, version) {
            try {
                localStorage.setItem(COURSE_CACHE_KEY, JSON.stringify({
                    payload,
                    version,
                    fetchedAt: Date.now()
                }));
            } catch (_error) {
                // Ignore cache write errors
            }
        }

        function getTextByLang(field, lang) {
            if (!field) return '';
            if (typeof field === 'string') return field;
            if (field[lang]) return field[lang];
            return field.en || field.ru || field.uz || '';
        }

        function formatPrice(course, lang) {
            if (course?.priceLabel) return getTextByLang(course.priceLabel, lang);
            if (typeof course?.priceSoum === 'number') {
                return `${course.priceSoum.toLocaleString('ru-RU')} UZS`;
            }
            if (typeof course?.priceUsd === 'number') {
                return `$${course.priceUsd.toFixed(2)}`;
            }
            return '';
        }

        function isPaidCourse(course, lang) {
            if (!course || typeof course !== 'object') return false;
            if (course.isFree === true) return false;

            const priceSoum = typeof course.priceSoum === 'number' ? course.priceSoum : null;
            const priceUsd = typeof course.priceUsd === 'number' ? course.priceUsd : null;
            if (priceSoum !== null) return priceSoum > 0;
            if (priceUsd !== null) return priceUsd > 0;

            const label = getTextByLang(course.priceLabel, lang).trim().toLowerCase();
            if (label) {
                const freeTokens = ['free', 'bepul', 'бесплат'];
                if (freeTokens.some(token => label.includes(token))) return false;
                return true;
            }

            return Boolean(course.productId);
        }

        function getBuyLabel(lang) {
            const labels = { uz: "Sotib olish", en: "Buy", ru: "Купить" };
            return labels[lang] || labels.uz;
        }

        function getBoughtLabel(lang) {
            const labels = { uz: "Olingan", en: "Bought", ru: "Куплено" };
            return labels[lang] || labels.uz;
        }

        function getCoursePurchaseId(course) {
            return course?.productId || course?.id || '';
        }

        function getPendingReceipts() {
            try {
                return JSON.parse(localStorage.getItem('pendingReceipts') || '{}');
            } catch (_error) {
                return {};
            }
        }

        function setPendingReceipt(courseId, receiptId) {
            const pending = getPendingReceipts();
            pending[courseId] = receiptId;
            localStorage.setItem('pendingReceipts', JSON.stringify(pending));
        }

        function clearPendingReceipt(courseId) {
            const pending = getPendingReceipts();
            delete pending[courseId];
            localStorage.setItem('pendingReceipts', JSON.stringify(pending));
        }

        function renderCourses(payload, profile) {
            const grid = document.getElementById('coursesGrid');
            const empty = document.getElementById('coursesEmpty');
            if (!grid) return;
            grid.innerHTML = '';

            const lang = getCurrentLang();
            const categories = Array.isArray(payload?.categories) ? payload.categories : [];
            const courses = categories
                .flatMap(category => Array.isArray(category.courses) ? category.courses : [])
                .filter(course => course && typeof course === 'object')
                .filter(course => isPaidCourse(course, lang));
            const boughtCourses = Array.isArray(profile?.bought_courses) ? profile.bought_courses : [];
            const pendingReceipts = getPendingReceipts();

            if (!courses.length) {
                if (empty) empty.classList.remove('d-none');
                return;
            }
            if (empty) empty.classList.add('d-none');

            courses.forEach(course => {
                const col = document.createElement('div');
                col.className = 'col-lg-4 col-md-6 col-12';
                const title = getTextByLang(course.title, lang);
                const subtitle = getTextByLang(course.subtitle, lang);
                const description = getTextByLang(course?.description?.short, lang);
                const price = formatPrice(course, lang);

                const buyLabel = getBuyLabel(lang);
                const boughtLabel = getBoughtLabel(lang);
                const coursePurchaseId = getCoursePurchaseId(course);
                const isBought = coursePurchaseId && boughtCourses.includes(coursePurchaseId);
                const pendingReceipt = coursePurchaseId ? pendingReceipts[coursePurchaseId] : null;
                const showRefresh = Boolean(pendingReceipt) && !isBought;
                col.innerHTML = `
                    <article class="card course-card h-100" aria-label="${title}">
                        ${isBought ? `<span class="course-ribbon">${boughtLabel}</span>` : ''}
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title h5 mb-10">${title}</h3>
                            <p class="card-text">${description || subtitle}</p>
                            <div class="mt-auto course-meta d-flex justify-content-between align-items-center">
                                <span class="price">${price}</span>
                                <div class="d-flex align-items-center gap-2">
                                    <button type="button"
                                        class="btn btn-sm btn-primary bg-gradient rounded-pill btn-buy"
                                        data-course-id="${coursePurchaseId}"
                                        data-course-title="${title}"
                                        ${isBought ? 'disabled aria-disabled="true"' : ''}>
                                        ${isBought ? boughtLabel : buyLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                        ${showRefresh ? `
                            <button type="button" class="refresh-btn refresh-fab btn-refresh"
                                aria-label="Refresh payment status"
                                data-course-id="${coursePurchaseId}"
                                data-receipt-id="${pendingReceipt || ''}">
                                <i class="fa-solid fa-rotate"></i>
                            </button>
                        ` : ''}
                    </article>
                `;
                grid.appendChild(col);
            });
        }

        async function fetchCourseCatalogue() {
            if (!canMakeSupabaseRequest()) {
                throw new Error('rate-limit');
            }
            const { data, error } = await supabaseClient
                .from('course_catalogue')
                .select('version,payload')
                .order('version', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                throw error;
            }
            return data;
        }

        async function loadCourses() {
            const cached = readCache();
            if (cached?.payload) {
                latestCataloguePayload = cached.payload;
                renderCourses(cached.payload, latestUserProfile);
            }
            try {
                const latest = await fetchCourseCatalogue();
                if (latest?.payload) {
                    if (!cached || cached.version !== latest.version) {
                        latestCataloguePayload = latest.payload;
                        renderCourses(latest.payload, latestUserProfile);
                        writeCache(latest.payload, latest.version);
                    }
                }
            } catch (error) {
                if (!cached?.payload) {
                    const empty = document.getElementById('coursesEmpty');
                    if (empty) {
                        const lang = getCurrentLang();
                        const message = {
                            uz: "Kurslar yuklanmadi. Keyinroq qayta urinib ko‘ring.",
                            en: "Courses failed to load. Please try again later.",
                            ru: "Курсы не загрузились. Попробуйте позже."
                        };
                        empty.classList.remove('d-none');
                        empty.textContent = message[lang] || message.uz;
                    }
                }
                console.error('Failed to load courses', error);
            }
        }

        async function loadUserProfile(userId) {
            const query = new URLSearchParams({
                select: 'id,bought_courses,started_courses,display_name,full_name,nickname,photo_url,email',
                id: `eq.${userId}`
            });
            const data = await supabaseRest(`user_profiles?${query.toString()}`);
            return Array.isArray(data) ? data[0] || null : data;
        }

        function setCourseNotice(message, type = 'info') {
            if (!message) return;
            const stack = document.getElementById('toastStack');
            if (!stack) return;
            const toast = document.createElement('div');
            toast.className = `toast-item is-${type}`;
            toast.textContent = message;
            stack.prepend(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(20px)';
            }, 2600);

            setTimeout(() => {
                toast.remove();
            }, 3200);
        }

        function getCourseNoticeText(key) {
            const lang = getCurrentLang();
            const messages = {
                uz: {
                    loginRequired: "Davom etish uchun hisobga kiring.",
                    creatingReceipt: "To'lov yaratilmoqda...",
                    openingPayme: "To'lov oynasi ochilmoqda...",
                    checkingPayment: "To'lov holati tekshirilmoqda...",
                    paymentSuccess: "To'lov tasdiqlandi. Kurs xarid qilindi.",
                    paymentFailed: "To'lov tasdiqlanmadi. Keyinroq qayta urinib ko'ring.",
                    paymentPending: "To'lov hali tasdiqlanmadi. Agar to'lagan bo'lsangiz, biroz kuting va sahifani yangilang.",
                    receiptFailed: "To'lov yaratilmadi. Keyinroq qayta urinib ko'ring.",
                    popupBlocked: "To'lov oynasi bloklandi. Brauzer popup'larini ruxsat qiling.",
                    authFailed: "Avtorizatsiya xatosi. Qayta kiring va urinib ko‘ring."
                },
                en: {
                    loginRequired: "Please sign in to continue.",
                    creatingReceipt: "Creating payment...",
                    openingPayme: "Opening payment window...",
                    checkingPayment: "Checking payment status...",
                    paymentSuccess: "Payment confirmed. Course purchased.",
                    paymentFailed: "Payment not confirmed. Please try again later.",
                    paymentPending: "Payment not confirmed yet. If you already paid, wait a bit and refresh.",
                    receiptFailed: "Payment could not be created. Please try again later.",
                    popupBlocked: "Payment popup was blocked. Please allow popups.",
                    authFailed: "Authorization failed. Please sign in again and retry."
                },
                ru: {
                    loginRequired: "Войдите, чтобы продолжить.",
                    creatingReceipt: "Создаем оплату...",
                    openingPayme: "Открываем окно оплаты...",
                    checkingPayment: "Проверяем статус оплаты...",
                    paymentSuccess: "Оплата подтверждена. Курс куплен.",
                    paymentFailed: "Оплата не подтверждена. Попробуйте позже.",
                    paymentPending: "Оплата еще не подтверждена. Если вы оплатили, подождите и обновите страницу.",
                    receiptFailed: "Не удалось создать оплату. Попробуйте позже.",
                    popupBlocked: "Окно оплаты заблокировано. Разрешите всплывающие окна.",
                    authFailed: "Ошибка авторизации. Войдите снова и попробуйте еще раз."
                }
            };
            return messages[lang]?.[key] || messages.uz[key] || '';
        }

        async function refreshUserProfile(userId) {
            latestUserProfile = await loadUserProfile(userId);
            if (latestCataloguePayload) {
                renderCourses(latestCataloguePayload, latestUserProfile);
            }
        }

        async function createPaymeReceipt(courseId) {
            const user = auth.currentUser;
            const orderId = `${courseId}:${user?.uid ?? ''}:${Date.now()}`;
            const { data, error } = await supabaseClient.functions.invoke('payme', {
                body: {
                    method: "receipts.create",
                    params: {
                        account: { course_id: courseId },
                        order_id: orderId
                    }
                },
                headers: firebaseAccessToken ? { Authorization: `Bearer ${firebaseAccessToken}` } : {}
            });
            if (error) {
                throw error;
            }
            if (data?.error) {
                throw new Error(data.error?.message || 'payme-receipt-create-failed');
            }
            const receiptId = data?.result?.receipt?._id;
            if (!receiptId) {
                throw new Error('missing-receipt-id');
            }
            return receiptId;
        }

        async function checkPaymeReceipt(receiptId) {
            const { data, error } = await supabaseClient.functions.invoke('payme', {
                body: {
                    method: "receipts.check",
                    params: { id: receiptId }
                },
                headers: firebaseAccessToken ? { Authorization: `Bearer ${firebaseAccessToken}` } : {}
            });
            if (error) {
                throw error;
            }
            if (data?.error) {
                throw new Error(data.error?.message || 'payme-receipt-check-failed');
            }
            return data?.result?.state;
        }

        async function waitForPaymePayment(receiptId, maxAttempts = 3, delayMs = 2000) {
            let state = null;
            for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
                state = await checkPaymeReceipt(receiptId);
                if (state === 4) {
                    return { status: 'paid', state };
                }
                if (typeof state === 'number' && state >= 50) {
                    return { status: 'failed', state };
                }
                if (attempt < maxAttempts - 1) {
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
            return { status: 'pending', state };
        }

        async function handleReceiptCheck(courseId, receiptId) {
            if (!courseId || !receiptId) return;
            const user = auth.currentUser;
            if (!user) {
                setCourseNotice(getCourseNoticeText('loginRequired'), 'error');
                return;
            }
            try {
                setAuthLoading(true);
                setCourseNotice(getCourseNoticeText('checkingPayment'));
                await refreshSupabaseClient(user);
                const result = await waitForPaymePayment(receiptId, 3, 2000);
                if (result.status === 'paid') {
                    clearPendingReceipt(courseId);
                    await refreshUserProfile(user.uid);
                    setCourseNotice(getCourseNoticeText('paymentSuccess'), 'success');
                } else if (result.status === 'failed') {
                    setCourseNotice(getCourseNoticeText('paymentFailed'), 'error');
                } else {
                    setCourseNotice(getCourseNoticeText('paymentPending'), 'info');
                }
            } catch (error) {
                if (error?.status === 401) {
                    setCourseNotice(getCourseNoticeText('authFailed'), 'error');
                } else {
                    setCourseNotice(getCourseNoticeText('paymentFailed'), 'error');
                }
            } finally {
                setAuthLoading(false);
            }
        }

        async function handleCoursePurchase(courseId) {
            if (!courseId) return;
            const user = auth.currentUser;
            if (!user) {
                setCourseNotice(getCourseNoticeText('loginRequired'), 'error');
                const modalEl = document.getElementById('authModal');
                if (modalEl && window.bootstrap) {
                    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
                    modal.show();
                }
                return;
            }
            try {
                setAuthLoading(true);
                setCourseNotice(getCourseNoticeText('creatingReceipt'));
                await refreshSupabaseClient(user);
                let receiptId;
                try {
                    receiptId = await createPaymeReceipt(courseId);
                    setPendingReceipt(courseId, receiptId);
                    if (latestCataloguePayload) {
                        renderCourses(latestCataloguePayload, latestUserProfile);
                    }
                } catch (error) {
                    console.error('Payme create error', error);
                    if (error?.status === 401) {
                        setCourseNotice(getCourseNoticeText('authFailed'), 'error');
                    } else {
                        setCourseNotice(getCourseNoticeText('receiptFailed'), 'error');
                    }
                    setAuthLoading(false);
                    return;
                }

                setAuthLoading(false);
                setCourseNotice(getCourseNoticeText('openingPayme'));

                const paymeUrl = `https://checkout.paycom.uz/${receiptId}`;
                const paymeModalEl = document.getElementById('paymeModal');
                const paymeOpenLink = document.getElementById('paymeOpenLink');

                if (!paymeModalEl || !paymeOpenLink || !window.bootstrap) {
                    window.open(paymeUrl, '_blank', 'noopener,noreferrer');
                    setCourseNotice(getCourseNoticeText('popupBlocked'), 'error');
                    return;
                }

                let didCheck = false;
                let timeoutId;

                const doCheck = async () => {
                    if (didCheck) return;
                    didCheck = true;
                    if (timeoutId) clearTimeout(timeoutId);
                    await handleReceiptCheck(courseId, receiptId);
                };

                const onHidden = async () => {
                    paymeModalEl.removeEventListener('hidden.bs.modal', onHidden);
                    await doCheck();
                };

                paymeModalEl.dataset.courseId = courseId;
                paymeModalEl.dataset.receiptId = receiptId;
                paymeOpenLink.setAttribute('href', paymeUrl);
                paymeModalEl.addEventListener('hidden.bs.modal', onHidden);

                const modal = bootstrap.Modal.getOrCreateInstance(paymeModalEl);
                modal.show();

                timeoutId = setTimeout(async () => {
                    if (!didCheck) {
                        await doCheck();
                    }
                }, 30000);
            } catch (_error) {
                setCourseNotice(getCourseNoticeText('paymentFailed'), 'error');
                setAuthLoading(false);
            }
        }

        document.addEventListener('DOMContentLoaded', loadCourses);


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
            const coursesGrid = document.getElementById('coursesGrid');
            const backBtn = document.getElementById('backBtn');
            const menuToggle = document.getElementById('menuToggle');
            const topbarMenu = document.getElementById('topbarMenu');
            const paymeOpenLink = document.getElementById('paymeOpenLink');
            const paymeCheckBtn = document.getElementById('paymeCheckBtn');
            const paymeModalEl = document.getElementById('paymeModal');

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

            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async () => {
                    try {
                        setAuthLoading(true);
                        await auth.signOut();
                        localStorage.removeItem(COURSE_CACHE_KEY);
                        localStorage.removeItem('pendingReceipts');
                        window.location.href = '/';
                    } catch (error) {
                        showAuthMessage(getAuthMessage(error));
                    } finally {
                        setAuthLoading(false);
                    }
                });
            }

            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    window.location.href = '/';
                });
            }

            if (menuToggle && topbarMenu) {
                menuToggle.addEventListener('click', (event) => {
                    event.stopPropagation();
                    topbarMenu.classList.toggle('open');
                });
                document.addEventListener('click', (event) => {
                    if (!topbarMenu.contains(event.target)) {
                        topbarMenu.classList.remove('open');
                    }
                });
            }

            if (coursesGrid) {
                coursesGrid.addEventListener('click', (event) => {
                    const refreshBtn = event.target.closest('.btn-refresh');
                    if (refreshBtn) {
                        const courseId = refreshBtn.getAttribute('data-course-id');
                        const receiptId = refreshBtn.getAttribute('data-receipt-id');
                        if (courseId && receiptId) {
                            handleReceiptCheck(courseId, receiptId);
                        }
                        return;
                    }

                    const button = event.target.closest('.btn-buy');
                    if (!button || button.disabled) return;
                    const courseId = button.getAttribute('data-course-id');
                    if (!courseId) return;
                    handleCoursePurchase(courseId);
                });
            }

            if (paymeOpenLink && paymeModalEl) {
                paymeOpenLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    const paymeUrl = paymeOpenLink.getAttribute('href');
                    if (!paymeUrl || paymeUrl === '#') return;
                    window.open(paymeUrl, '_blank', 'noopener,noreferrer');
                });
            }

            if (paymeCheckBtn && paymeModalEl) {
                paymeCheckBtn.addEventListener('click', () => {
                    const courseId = paymeModalEl.dataset.courseId;
                    const receiptId = paymeModalEl.dataset.receiptId;
                    if (courseId && receiptId) {
                        handleReceiptCheck(courseId, receiptId);
                    }
                });
            }

            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    if (window.location.pathname.startsWith('/course')) {
                        window.location.href = '/';
                        return;
                    }
                    await refreshSupabaseClient(null);
                    latestUserProfile = null;
                    if (latestCataloguePayload) {
                        renderCourses(latestCataloguePayload, latestUserProfile);
                    }
                    return;
                }
                try {
                    setAuthLoading(true);
                    await refreshSupabaseClient(user);
                    await refreshUserProfile(user.uid);
                } catch (error) {
                    console.error('Failed to load user profile', error);
                } finally {
                    setAuthLoading(false);
                }
            });
        });
