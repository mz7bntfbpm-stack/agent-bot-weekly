/* 
 * Cookie Consent Management System
 * DSGVO-konformer Cookie-Banner für agent-bot.de
 * 
 * Installation:
 * 1. Binden Sie dieses Skript in Ihrer Website ein: <script src="cookie-consent.js"></script>
 * 2. Fügen Sie das CSS in Ihre Stylesheet-Datei ein oder binden Sie cookie-consent.css ein
 * 3. Konfigurieren Sie die Einstellungen am Anfang dieser Datei
 */

(function() {
    'use strict';

    // ==================== KONFIGURATION ====================
    const CONFIG = {
        // Cookie-Name für die Speicherung der Einwilligung
        cookieName: 'cookie_consent',
        // Gültigkeit des Cookies in Tagen
        cookieExpiry: 365,
        // URL zur Datenschutzerklärung
        privacyPolicyUrl: 'datenschutz.html',
        // Texte (können angepasst werden)
        texts: {
            heading: 'Wir verwenden Cookies',
            description: 'Wir verwenden Cookies, um Ihnen die bestmögliche Nutzung unserer Webseite zu ermöglichen. Einige Cookies sind für den Betrieb der Seite notwendig, während andere uns helfen, diese zu verbessern und relevante Inhalte für Sie anzuzeigen.',
            acceptAll: 'Alle akzeptieren',
            rejectAll: 'Alle ablehnen',
            customize: 'Einstellungen',
            savePreferences: 'Auswahl speichern',
            close: 'Schließen',
            categories: {
                necessary: {
                    title: 'Notwendig',
                    description: 'Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
                    required: true
                },
                analytics: {
                    title: 'Analyse',
                    description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, um die Nutzererfahrung zu verbessern.',
                    required: false
                },
                marketing: {
                    title: 'Marketing',
                    description: 'Diese Cookies werden verwendet, um Besuchern relevante Werbung und Marketingkampagnen anzuzeigen.',
                    required: false
                },
                preferences: {
                    title: 'Präferenzen',
                    description: 'Diese Cookies ermöglichen es uns, Ihre Einstellungen und Präferenzen zu speichern.',
                    required: false
                }
            }
        }
    };

    // ==================== COOKIE UTILITIES ====================
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + JSON.stringify(value) + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                try {
                    return JSON.parse(c.substring(nameEQ.length, c.length));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }

    // ==================== CONSENT MANAGEMENT ====================
    let currentConsent = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
        timestamp: null,
        version: '1.0'
    };

    function loadConsent() {
        const saved = getCookie(CONFIG.cookieName);
        if (saved) {
            currentConsent = { ...currentConsent, ...saved };
            return true;
        }
        return false;
    }

    function saveConsent(consent) {
        currentConsent = {
            ...consent,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
        setCookie(CONFIG.cookieName, currentConsent, CONFIG.cookieExpiry);
        
        // Aktiviere/deaktiviere Cookies basierend auf der Einwilligung
        applyConsent(currentConsent);
        
        // Close banner
        closeBanner();
        
       /**
 * Cookie Consent Management System - Production Ready
 * DSGVO-konforme Cookie-Verwaltung mit echter Blockierung
 */
(function() {
    'use strict';

    // ==================== KONFIGURATION ====================
    const CONFIG = {
        cookieName: 'cookie_consent',
        cookieExpiry: 365,
        privacyPolicyUrl: 'datenschutz.html',
        version: '2.0.0',
        services: {
            analytics: ['_ga', '_gid', '_gat', 'amplitude_id'],
            marketing: ['fbp', 'fr', 'ads', 'conversion']
        }
    };

    // ==================== COOKIE UTILITIES ====================
    const CookieUtils = {
        set(name, value, days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; SameSite=Lax; Secure`;
        },
        
        get(name) {
            const value = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
            if (!value) return null;
            try {
                return JSON.parse(decodeURIComponent(value.split('=')[1]));
            } catch (e) {
                return null;
            }
        },
        
        delete(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    };

    // ==================== CONSENT MANAGEMENT ====================
    class ConsentManager {
        constructor() {
            this.defaultConsent = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false,
                timestamp: null,
                version: CONFIG.version
            };
        }

        load() {
            const saved = CookieUtils.get(CONFIG.cookieName);
            if (saved && saved.version === CONFIG.version) {
                return saved;
            }
            return { ...this.defaultConsent };
        }

        save(consent) {
            consent.timestamp = new Date().toISOString();
            consent.version = CONFIG.version;
            CookieUtils.set(CONFIG.cookieName, consent, CONFIG.cookieExpiry);
            this.apply(consent);
            this.dispatchEvent(consent);
        }

        apply(consent) {
            // Analytics blockieren/entfernen
            if (consent.analytics) {
                this.enableAnalytics();
            } else {
                this.disableAnalytics();
            }

            // Marketing blockieren/entfernen
            if (consent.marketing) {
                this.enableMarketing();
            } else {
                this.disableMarketing();
            }

            // Preferences
            if (consent.preferences) {
                this.enablePreferences();
            } else {
                this.disablePreferences();
            }
        }

        enableAnalytics() {
            // Google Analytics aktivieren
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'granted'
                });
            }
            
            // Lokale Analytics-Cookies löschen
            this.clearCookies(CONFIG.services.analytics);
        }

        disableAnalytics() {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'denied'
                });
            }
            // Alle Analytics-Cookies löschen
            this.clearCookies(CONFIG.services.analytics);
        }

        enableMarketing() {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    ad_storage: 'granted',
                    ad_user_data: 'granted',
                    ad_personalization: 'granted'
                });
            }
            this.clearCookies(CONFIG.services.marketing);
        }

        disableMarketing() {
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied'
                });
            }
            this.clearCookies(CONFIG.services.marketing);
        }

        enablePreferences() {
            // Präferenz-Cookies aktivieren
        }

        disablePreferences() {
            // Präferenz-Cookies deaktivieren
        }

        clearCookies(patterns) {
            const cookies = document.cookie.split(';');
            cookies.forEach(cookie => {
                const name = cookie.split('=')[0].trim();
                patterns.forEach(pattern => {
                    if (name.includes(pattern)) {
                        CookieUtils.delete(name);
                    }
                });
            });
        }

        dispatchEvent(consent) {
            window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
        }

        hasConsent(category) {
            const consent = this.load();
            return consent[category] === true;
        }
    }

    // ==================== UI KOMPONENTEN ====================
    class ConsentUI {
        constructor(manager) {
            this.manager = manager;
            this.consent = manager.load();
        }

        createBanner() {
            const banner = document.createElement('div');
            banner.id = 'cookie-consent-banner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-labelledby', 'cookie-consent-title');
            banner.setAttribute('aria-describedby', 'cookie-consent-desc');
            banner.innerHTML = `
                <div class="cc-banner-content">
                    <div class="cc-banner-text">
                        <h2 id="cookie-consent-title">${CONFIG.texts.heading}</h2>
                        <p id="cookie-consent-desc">${CONFIG.texts.description}</p>
                        <a href="${CONFIG.privacyPolicyUrl}" class="cc-privacy-link">Mehr erfahren</a>
                    </div>
                    <div class="cc-banner-actions">
                        <button type="button" class="cc-btn cc-btn-reject" id="cc-reject-all">
                            ${CONFIG.texts.rejectAll}
                        </button>
                        <button type="button" class="cc-btn cc-btn-settings" id="cc-settings">
                            ${CONFIG.texts.customize}
                        </button>
                        <button type="button" class="cc-btn cc-btn-accept" id="cc-accept-all">
                            ${CONFIG.texts.acceptAll}
                        </button>
                    </div>
                </div>
            `;
            this.addStyles();
            return banner;
        }

        createSettingsModal() {
            const modal = document.createElement('div');
            modal.id = 'cookie-consent-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.innerHTML = `
                <div class="cc-modal-overlay"></div>
                <div class="cc-modal-content">
                    <div class="cc-modal-header">
                        <h3>Cookie-Einstellungen</h3>
                        <button type="button" class="cc-modal-close" aria-label="Schließen">&times;</button>
                    </div>
                    <div class="cc-modal-body">
                        ${Object.entries(CONFIG.texts.categories).map(([key, cat]) => `
                            <div class="cc-category">
                                <div class="cc-category-header">
                                    <div class="cc-category-info">
                                        <h4>${cat.title}</h4>
                                        <p>${cat.description}</p>
                                    </div>
                                    <label class="cc-toggle">
                                        <input type="checkbox" 
                                               name="cookie_category_${key}"
                                               ${cat.required ? 'checked disabled' : ''}
                                               ${this.consent[key] ? 'checked' : ''}
                                               data-category="${key}">
                                        <span class="cc-toggle-slider"></span>
                                    </label>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cc-modal-footer">
                        <button type="button" class="cc-btn cc-btn-secondary" id="cc-save-preferences">
                            ${CONFIG.texts.savePreferences}
                        </button>
                    </div>
                </div>
            `;
            return modal;
        }

        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                #cookie-consent-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #fff;
                    box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
                    z-index: 9999;
                    padding: 20px;
                    font-family: inherit;
                }
                .cc-banner-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .cc-banner-text h2 {
                    margin: 0 0 8px;
                    font-size: 18px;
                    font-weight: 600;
                }
                .cc-banner-text p {
                    margin: 0;
                    font-size: 14px;
                    color: #666;
                }
                .cc-privacy-link {
                    color: #3b82f6;
                    text-decoration: underline;
                }
                .cc-banner-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .cc-btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cc-btn-accept { background: #3b82f6; color: #fff; }
                .cc-btn-reject { background: #f1f5f9; color: #1a1a2e; }
                .cc-btn-settings { background: transparent; color: #666; }
                .cc-btn-accept:hover { background: #2563eb; }
                .cc-btn-reject:hover { background: #e2e8f0; }
                
                #cookie-consent-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: none;
                }
                #cookie-consent-modal.active { display: flex; }
                .cc-modal-overlay {
                    position: absolute;
                    background: rgba(0,0,0,0.5);
                }
                .cc-modal-content {
                    position: relative;
                    margin: auto;
                    background: #fff;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .cc-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .cc-modal-body { padding: 20px; }
                .cc-modal-footer { padding: 20px; border-top: 1px solid #e2e8f0; }
                .cc-modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
                .cc-category {
                    padding: 16px 0;
                    border-bottom: 1px solid #e2e8f0;
                }
                .cc-category:last-child { border-bottom: none; }
                .cc-category-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    gap: 16px;
                }
                .cc-category-info h4 { margin: 0 0 4px; }
                .cc-category-info p { margin: 0; font-size: 13px; color: #666; }
                
                .cc-toggle {
                    position: relative;
                    display: inline-block;
                    width: 48px;
                    height: 24px;
                    flex-shrink: 0;
                }
                .cc-toggle input { opacity: 0; width: 0; height: 0; }
                .cc-toggle-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0; left: right: bottom: 0;
                    background: #ccc;
                    border-radius: 24px;
                    transition: 0.3s;
                }
                .cc-toggle-slider::before {
                    content: '';
                    position: absolute;
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background: #fff;
                    border-radius: 50%;
                    transition: 0.3s;
                }
                .cc-toggle input:checked + .cc-toggle-slider {
                    background: #3b82f6;
                }
                .cc-toggle input:checked + .cc-toggle-slider::before {
                    transform: translateX(24px);
                }
                .cc-toggle input:disabled + .cc-toggle-slider {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                @media (max-width: 768px) {
                    .cc-banner-content { flex-direction: column; text-align: center; }
                    .cc-banner-actions { width: 100%; justify-content: center; }
                }
            `;
            document.head.appendChild(style);
        }

        show() {
            if (this.consent.timestamp) {
                this.manager.apply(this.consent);
                return;
            }
            
            document.body.appendChild(this.createBanner());
            this.bindEvents();
        }

        showSettings() {
            document.body.appendChild(this.createSettingsModal());
            document.getElementById('cookie-consent-modal').classList.add('active');
            this.bindSettingsEvents();
        }

        hide() {
            const banner = document.getElementById('cookie-consent-banner');
            const modal = document.getElementById('cookie-consent-modal');
            if (banner) banner.remove();
            if (modal) modal.remove();
        }

        bindEvents() {
            document.getElementById('cc-accept-all').addEventListener('click', () => {
                const consent = { ...this.manager.defaultConsent, analytics: true, marketing: true };
                this.manager.save(consent);
                this.hide();
            });
            
            document.getElementById('cc-reject-all').addEventListener('click', () => {
                this.manager.save(this.manager.defaultConsent);
                this.hide();
            });
            
            document.getElementById('cc-settings').addEventListener('click', () => {
                this.hide();
                this.showSettings();
            });
        }

        bindSettingsEvents() {
            document.querySelector('.cc-modal-close').addEventListener('click', () => {
                document.getElementById('cookie-consent-modal').remove();
            });
            
            document.querySelector('.cc-modal-overlay').addEventListener('click', () => {
                document.getElementById('cookie-consent-modal').remove();
            });
            
            document.getElementById('cc-save-preferences').addEventListener('click', () => {
                const consent = { ...this.manager.defaultConsent };
                document.querySelectorAll('[data-category]').forEach(input => {
                    if (input.checked && !input.disabled) {
                        consent[input.dataset.category] = true;
                    }
                });
                this.manager.save(consent);
                document.getElementById('cookie-consent-modal').remove();
                this.hide();
            });
        }
    }

    // ==================== INITIALISIERUNG ====================
    function init() {
        const manager = new ConsentManager();
        const ui = new ConsentUI(manager);
        ui.show();
        
        window.CookieConsent = {
            showSettings: () => ui.showSettings(),
            showBanner: () => {
                manager.save(manager.defaultConsent);
                location.reload();
            },
            getConsent: () => manager.load(),
            resetConsent: () => {
                CookieUtils.delete(CONFIG.cookieName);
                location.reload();
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
        // Inline Styles für den Banner
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #ffffff;
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
            z-index: 99999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            transform: translateY(100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        `;

        banner.innerHTML = `
            <div style="max-width: 1200px; margin: 0 auto; padding: 24px;">
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; align-items: flex-start; gap: 16px;">
                        <div style="flex: 1;">
                            <h2 id="cookie-consent-heading" style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #1a1a2e;">
                                ${CONFIG.texts.heading}
                            </h2>
                            <p id="cookie-consent-description" style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a4a6a;">
                                ${CONFIG.texts.description}
                                <a href="${CONFIG.privacyPolicyUrl}" style="color: #3b82f6; text-decoration: underline;">Mehr erfahren</a>
                            </p>
                        </div>
                    </div>
                    
                    <div id="cookie-consent-categories" style="display: none; margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                        <!-- Categories werden per JS eingefügt -->
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: flex-end;">
                        <button id="cookie-settings-btn" style="
                            padding: 10px 20px;
                            border: 1px solid #e2e8f0;
                            background: #ffffff;
                            color: #4a4a6a;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        ">${CONFIG.texts.customize}</button>
                        
                        <button id="cookie-reject-btn" style="
                            padding: 10px 20px;
                            border: 1px solid #e2e8f0;
                            background: #ffffff;
                            color: #4a4a6a;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        ">${CONFIG.texts.rejectAll}</button>
                        
                        <button id="cookie-accept-btn" style="
                            padding: 10px 20px;
                            border: none;
                            background: #3b82f6;
                            color: #ffffff;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            transition: all 0.2s ease;
                        ">${CONFIG.texts.acceptAll}</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        
        // Event Listener hinzufügen
        setupEventListeners(banner);
    }

    function createCategoryToggle(category, key) {
        const categoryConfig = CONFIG.texts.categories[key];
        const checked = currentConsent[key] ? 'checked' : '';
        const disabled = categoryConfig.required ? 'disabled' : '';
        
        return `
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <label for="cookie-category-${key}" style="display: flex; align-items: center; gap: 8px; cursor: ${categoryConfig.required ? 'not-allowed' : 'pointer'};">
                        <input 
                            type="checkbox" 
                            id="cookie-category-${key}" 
                            data-category="${key}"
                            ${checked} 
                            ${disabled}
                            style="width: 18px; height: 18px; cursor: ${categoryConfig.required ? 'not-allowed' : 'pointer'};"
                        >
                        <span style="font-weight: 600; color: #1a1a2e;">${categoryConfig.title}</span>
                        ${categoryConfig.required ? '<span style="font-size: 12px; color: #6b7280;">(Immer aktiv)</span>' : ''}
                    </label>
                </div>
                <p style="margin: 0; font-size: 13px; color: #6b7280; padding-left: 26px;">
                    ${categoryConfig.description}
                </p>
            </div>
        `;
    }

    function showSettings() {
        const categoriesContainer = document.getElementById('cookie-consent-categories');
        const settingsBtn = document.getElementById('cookie-settings-btn');
        const acceptBtn = document.getElementById('cookie-accept-btn');
        const rejectBtn = document.getElementById('cookie-reject-btn');
        
        if (categoriesContainer) {
            let categoriesHTML = '';
            for (const [key, config] of Object.entries(CONFIG.texts.categories)) {
                categoriesHTML += createCategoryToggle(config, key);
            }
            categoriesHTML += `
                <button id="cookie-save-btn" style="
                    width: 100%;
                    padding: 12px 24px;
                    border: none;
                    background: #3b82f6;
                    color: #ffffff;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 8px;
                    transition: all 0.2s ease;
                ">${CONFIG.texts.savePreferences}</button>
            `;
            categoriesContainer.innerHTML = categoriesHTML;
            categoriesContainer.style.display = 'block';
            
            // Save Button Event
            const saveBtn = document.getElementById('cookie-save-btn');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const consent = {
                        necessary: true,
                        analytics: false,
                        marketing: false,
                        preferences: false
                    };
                    
                    for (const key of Object.keys(CONFIG.texts.categories)) {
                        const checkbox = document.getElementById(`cookie-category-${key}`);
                        if (checkbox) {
                            consent[key] = checkbox.checked || checkbox.disabled;
                        }
                    }
                    
                    saveConsent(consent);
                });
            }
            
            // Hide other buttons
            if (settingsBtn) settingsBtn.style.display = 'none';
            if (acceptBtn) acceptBtn.style.display = 'none';
            if (rejectBtn) rejectBtn.style.display = 'none';
        }
    }

    function setupEventListeners(banner) {
        const acceptBtn = document.getElementById('cookie-accept-btn');
        const rejectBtn = document.getElementById('cookie-reject-btn');
        const settingsBtn = document.getElementById('cookie-settings-btn');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                saveConsent({
                    necessary: true,
                    analytics: true,
                    marketing: true,
                    preferences: true
                });
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                saveConsent({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    preferences: false
                });
            });
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', showSettings);
        }
    }

    function showBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.transform = 'translateY(0)';
            banner.style.opacity = '1';
        }
    }

    function closeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.style.transform = 'translateY(100%)';
            banner.style.opacity = '0';
            setTimeout(() => {
                if (banner.parentNode) {
                    banner.parentNode.removeChild(banner);
                }
            }, 300);
        }
    }

    function init() {
        // Prüfen ob bereits eine Einwilligung vorliegt
        if (!loadConsent()) {
            // Keine Einwilligung vorhanden, Banner anzeigen
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createBanner);
            } else {
                createBanner();
                setTimeout(showBanner, 100);
            }
        } else {
            // Einwilligung vorhanden, anwenden
            applyConsent(currentConsent);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Global functions für externe Nutzung
    window.CookieConsent = {
        showSettings: showSettings,
        showBanner: function() {
            deleteCookie(CONFIG.cookieName);
            currentConsent = {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false,
                timestamp: null,
                version: '1.0'
            };
            createBanner();
            setTimeout(showBanner, 100);
        },
        getConsent: function() {
            return currentConsent;
        },
        resetConsent: function() {
            deleteCookie(CONFIG.cookieName);
            location.reload();
        }
    };

})();
