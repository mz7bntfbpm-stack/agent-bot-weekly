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
        
        // Optional: Google Analytics Einwilligung aktualisieren
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                analytics_storage: consent.analytics ? 'granted' : 'denied',
                ad_storage: consent.marketing ? 'granted' : 'denied',
                ad_user_data: consent.marketing ? 'granted' : 'denied',
                ad_personalization: consent.marketing ? 'granted' : 'denied'
            });
        }
    }

    function applyConsent(consent) {
        // Analytics Cookies aktivieren/deaktivieren
        if (consent.analytics) {
            // Google Analytics aktivieren
            enableAnalytics();
        } else {
            disableAnalytics();
        }
        
        // Marketing Cookies aktivieren/deaktivieren
        if (consent.marketing) {
            enableMarketing();
        } else {
            disableMarketing();
        }
    }

    function enableAnalytics() {
        // Hier Google Analytics Code einfügen
        // Beispiel:
        // window.dataLayer = window.dataLayer || [];
        // function gtag(){dataLayer.push(arguments);}
        // gtag('js', new Date());
        // gtag('config', 'UA-XXXXXXXXX-X');
        console.log('Analytics Cookies enabled');
    }

    function disableAnalytics() {
        // Analytics deaktivieren
        console.log('Analytics Cookies disabled');
    }

    function enableMarketing() {
        // Marketing Cookies aktivieren
        console.log('Marketing Cookies enabled');
    }

    function disableMarketing() {
        // Marketing Cookies deaktivieren
        console.log('Marketing Cookies disabled');
    }

    // ==================== UI GENERIERUNG ====================
    function createBanner() {
        // Prüfen ob Banner bereits existiert
        if (document.getElementById('cookie-consent-banner')) {
            return;
        }

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-labelledby', 'cookie-consent-heading');
        banner.setAttribute('aria-describedby', 'cookie-consent-description');

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
