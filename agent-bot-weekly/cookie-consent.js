/**
 * Cookie Consent Management System v2.0
 * DSGVO-konformer Cookie-Banner für agent-bot.de
 */
(function() {
    'use strict';

    const CONFIG = {
        cookieName: 'agent_bot_consent',
        cookieExpiry: 365,
        privacyPolicyUrl: 'datenschutz.html',
        version: '2.0.0',
        services: {
            analytics: ['_ga', '_gid', '_gat', 'amplitude_id', 'utma'],
            marketing: ['fbp', 'fr', 'ads', 'gcl_au', 'IDE']
        }
    };

    const CookieUtils = {
        set(name, value, days) {
            const expires = new Date(Date.now() + days * 864e5).toUTCString();
            document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; SameSite=Lax`;
        },
        get(name) {
            const value = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
            if (!value) return null;
            try {
                return JSON.parse(decodeURIComponent(value.split('=')[1]));
            } catch (e) { return null; }
        },
        delete(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    };

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
            if (saved && saved.version === CONFIG.version) return saved;
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
            if (consent.analytics) this.enableAnalytics();
            else this.disableAnalytics();

            if (consent.marketing) this.enableMarketing();
            else this.disableMarketing();
        }

        enableAnalytics() {
            if (window.gtag) {
                window.gtag('consent', 'update', { analytics_storage: 'granted' });
            }
            this.clearCookies(CONFIG.services.analytics);
        }

        disableAnalytics() {
            if (window.gtag) {
                window.gtag('consent', 'update', { analytics_storage: 'denied' });
            }
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

        clearCookies(patterns) {
            document.cookie.split(';').forEach(cookie => {
                const name = cookie.split('=')[0].trim();
                if (patterns.some(p => name.includes(p))) {
                    CookieUtils.delete(name);
                }
            });
        }

        dispatchEvent(consent) {
            window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
        }
    }

    class ConsentUI {
        constructor(manager) {
            this.manager = manager;
            this.consent = manager.load();
        }

        init() {
            if (this.consent.timestamp) {
                this.manager.apply(this.consent);
                return;
            }
            this.showBanner();
        }

        showBanner() {
            const banner = document.createElement('div');
            banner.id = 'cookie-consent-banner';
            banner.setAttribute('role', 'dialog');
            banner.setAttribute('aria-labelledby', 'cookie-consent-title');
            banner.innerHTML = `
                <div class="cc-banner-content">
                    <div class="cc-banner-text">
                        <h2 id="cookie-consent-title">Wir verwenden Cookies</h2>
                        <p>Wir nutzen Cookies für Analyse und Marketing, um Ihre Erfahrung zu verbessern.
                           <a href="${CONFIG.privacyPolicyUrl}">Mehr erfahren</a></p>
                    </div>
                    <div class="cc-banner-actions">
                        <button type="button" class="cc-btn cc-btn-secondary" id="cc-reject">Ablehnen</button>
                        <button type="button" class="cc-btn cc-btn-outline" id="cc-settings">Einstellungen</button>
                        <button type="button" class="cc-btn cc-btn-primary" id="cc-accept">Akzeptieren</button>
                    </div>
                </div>
            `;
            this.injectStyles();
            document.body.appendChild(banner);
            this.bindEvents();
        }

        showModal() {
            const overlay = document.createElement('div');
            overlay.id = 'cookie-consent-modal';
            overlay.innerHTML = `
                <div class="cc-modal-overlay"></div>
                <div class="cc-modal">
                    <div class="cc-modal-header">
                        <h3>Cookie-Einstellungen</h3>
                        <button type="button" class="cc-modal-close">&times;</button>
                    </div>
                    <div class="cc-modal-body">
                        <div class="cc-category">
                            <div class="cc-category-info">
                                <h4>Notwendig</h4>
                                <p>Erforderlich für die Grundfunktionen der Website.</p>
                            </div>
                            <label class="cc-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cc-toggle-slider"></span>
                            </label>
                        </div>
                        ${['analytics', 'marketing', 'preferences'].map(cat => `
                            <div class="cc-category">
                                <div class="cc-category-info">
                                    <h4>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                                    <p>${this.getCategoryDesc(cat)}</p>
                                </div>
                                <label class="cc-toggle">
                                    <input type="checkbox" data-category="${cat}" ${this.consent[cat] ? 'checked' : ''}>
                                    <span class="cc-toggle-slider"></span>
                                </label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="cc-modal-footer">
                        <button type="button" class="cc-btn cc-btn-primary" id="cc-save">Speichern</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            this.bindModalEvents();
        }

        getCategoryDesc(cat) {
            const descs = {
                analytics: 'Hilft uns zu verstehen, wie Besucher die Seite nutzen.',
                marketing: 'Zeigt relevante Werbung basierend auf Ihren Interessen.',
                preferences: 'Speichert Ihre Einstellungen und Präferenzen.'
            };
            return descs[cat] || '';
        }

        injectStyles() {
            if (document.getElementById('cc-styles')) return;
            const style = document.createElement('style');
            style.id = 'cc-styles';
            style.textContent = `
                #cookie-consent-banner {
                    position: fixed; bottom: 0; left: 0; right: 0;
                    background: #0a0a0d; border-top: 1px solid #333;
                    z-index: 99999; padding: 20px;
                    font-family: 'Inter', sans-serif;
                }
                .cc-banner-content {
                    max-width: 1200px; margin: 0 auto;
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 20px; flex-wrap: wrap;
                }
                .cc-banner-text h2 { margin: 0 0 8px; font-size: 16px; font-weight: 600; color: #fff; }
                .cc-banner-text p { margin: 0; font-size: 14px; color: #888; }
                .cc-banner-text a { color: #5a9e9e; text-decoration: none; }
                .cc-banner-text a:hover { text-decoration: underline; }
                .cc-banner-actions { display: flex; gap: 10px; flex-wrap: wrap; }
                .cc-btn {
                    padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: 500;
                    cursor: pointer; transition: all 0.2s;
                }
                .cc-btn-primary { background: #5a9e9e; border: none; color: #fff; }
                .cc-btn-primary:hover { background: #6fa8a8; }
                .cc-btn-secondary { background: #1a1a22; border: 1px solid #333; color: #888; }
                .cc-btn-secondary:hover { border-color: #555; color: #fff; }
                .cc-btn-outline { background: transparent; border: 1px solid #333; color: #888; }
                .cc-btn-outline:hover { border-color: #555; color: #fff; }
                #cookie-consent-modal {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    z-index: 100000; display: none;
                }
                #cookie-consent-modal.active { display: flex; align-items: center; justify-content: center; }
                .cc-modal-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
                .cc-modal {
                    position: relative; background: #1a1a22; border: 1px solid #333;
                    border-radius: 12px; max-width: 480px; width: 90%; max-height: 90vh; overflow-y: auto;
                }
                .cc-modal-header {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 20px; border-bottom: 1px solid #333;
                }
                .cc-modal-header h3 { margin: 0; color: #fff; font-size: 18px; }
                .cc-modal-close { background: none; border: none; color: #888; font-size: 28px; cursor: pointer; }
                .cc-modal-close:hover { color: #fff; }
                .cc-modal-body { padding: 20px; }
                .cc-modal-footer { padding: 20px; border-top: 1px solid #333; text-align: right; }
                .cc-category {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    padding: 16px 0; border-bottom: 1px solid #333;
                }
                .cc-category:last-child { border-bottom: none; }
                .cc-category-info h4 { margin: 0 0 4px; color: #fff; font-size: 15px; }
                .cc-category-info p { margin: 0; color: #888; font-size: 13px; }
                .cc-toggle { position: relative; display: inline-block; width: 48px; height: 24px; }
                .cc-toggle input { opacity: 0; width: 0; height: 0; }
                .cc-toggle-slider {
                    position: absolute; cursor: pointer; inset: 0;
                    background: #333; border-radius: 24px; transition: 0.3s;
                }
                .cc-toggle-slider::before {
                    content: ''; position: absolute; height: 18px; width: 18px;
                    left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: 0.3s;
                }
                .cc-toggle input:checked + .cc-toggle-slider { background: #5a9e9e; }
                .cc-toggle input:checked + .cc-toggle-slider::before { transform: translateX(24px); }
                @media (max-width: 768px) {
                    .cc-banner-content { flex-direction: column; text-align: center; }
                    .cc-banner-actions { width: 100%; justify-content: center; }
                }
            `;
            document.head.appendChild(style);
        }

        bindEvents() {
            document.getElementById('cc-accept').addEventListener('click', () => {
                this.manager.save({ ...this.manager.defaultConsent, analytics: true, marketing: true, preferences: true });
                document.getElementById('cookie-consent-banner').remove();
            });
            document.getElementById('cc-reject').addEventListener('click', () => {
                this.manager.save(this.manager.defaultConsent);
                document.getElementById('cookie-consent-banner').remove();
            });
            document.getElementById('cc-settings').addEventListener('click', () => {
                document.getElementById('cookie-consent-banner').remove();
                this.showModal();
            });
        }

        bindModalEvents() {
            document.querySelector('.cc-modal-close').addEventListener('click', () => document.getElementById('cookie-consent-modal').remove());
            document.querySelector('.cc-modal-overlay').addEventListener('click', () => document.getElementById('cookie-consent-modal').remove());
            document.getElementById('cc-save').addEventListener('click', () => {
                const consent = { ...this.manager.defaultConsent };
                document.querySelectorAll('[data-category]').forEach(input => {
                    consent[input.dataset.category] = input.checked;
                });
                this.manager.save(consent);
                document.getElementById('cookie-consent-modal').remove();
            });
        }
    }

    function init() {
        const manager = new ConsentManager();
        const ui = new ConsentUI(manager);
        ui.init();

        window.CookieConsent = {
            showSettings: () => ui.showModal(),
            showBanner: () => { CookieUtils.delete(CONFIG.cookieName); location.reload(); },
            getConsent: () => manager.load(),
            resetConsent: () => { CookieUtils.delete(CONFIG.cookieName); location.reload(); }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
