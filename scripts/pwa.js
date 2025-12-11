// PWA Installation & Service Worker Registration
(function () {
    'use strict';

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('[PWA] Service Worker registered:', registration.scope);

                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch((err) => console.log('[PWA] SW registration failed:', err));
        });
    }

    // Install Prompt Handling
    let deferredPrompt;
    let installBanner;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Check if user has dismissed before
        const dismissed = localStorage.getItem('sf_pwa_dismissed');
        if (dismissed) return;

        // Show install banner after short delay
        setTimeout(showInstallBanner, 3000);
    });

    function showInstallBanner() {
        if (installBanner) return;

        installBanner = document.createElement('div');
        installBanner.className = 'pwa-install-banner';
        installBanner.innerHTML = `
      <div class="pwa-install-content">
        <div class="pwa-install-icon">
          <img src="assets/icons/icon-512.png" alt="Sunflour Bakery" width="48" height="48">
        </div>
        <div class="pwa-install-text">
          <strong>Install Sunflour Bakery</strong>
          <span>Get quick access to fresh baked goods!</span>
        </div>
        <div class="pwa-install-actions">
          <button class="pwa-install-btn" aria-label="Install app">Install App</button>
          <button class="pwa-dismiss-btn" aria-label="Dismiss">✕</button>
        </div>
      </div>
    `;

        document.body.appendChild(installBanner);

        // Animate in
        requestAnimationFrame(() => {
            installBanner.classList.add('visible');
        });

        // Install button handler
        installBanner.querySelector('.pwa-install-btn').addEventListener('click', async () => {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('[PWA] App installed');
                window.sfToast?.success('App installed successfully!');
            }

            deferredPrompt = null;
            hideInstallBanner();
        });

        // Dismiss button handler
        installBanner.querySelector('.pwa-dismiss-btn').addEventListener('click', () => {
            localStorage.setItem('sf_pwa_dismissed', '1');
            hideInstallBanner();
        });
    }

    function hideInstallBanner() {
        if (!installBanner) return;

        installBanner.classList.remove('visible');
        setTimeout(() => {
            installBanner.remove();
            installBanner = null;
        }, 400);
    }

    // App installed event
    window.addEventListener('appinstalled', () => {
        console.log('[PWA] App installed');
        hideInstallBanner();
        deferredPrompt = null;
    });

    // Show update notification
    function showUpdateNotification() {
        if (window.sfToast) {
            window.sfToast.info('A new version is available! Refresh to update.', 6000);
        }
    }

    // Inject install banner styles
    const style = document.createElement('style');
    style.textContent = `
    .pwa-install-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      padding: var(--sf-space-md, 1rem);
      padding-bottom: calc(var(--sf-space-md, 1rem) + env(safe-area-inset-bottom, 0px));
      transform: translateY(100%);
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .pwa-install-banner.visible {
      transform: translateY(0);
      opacity: 1;
    }
    
    .pwa-install-content {
      display: flex;
      align-items: center;
      gap: var(--sf-space-md, 1rem);
      max-width: 600px;
      margin: 0 auto;
      padding: var(--sf-space-md, 1rem) var(--sf-space-lg, 1.5rem);
      background: var(--sf-white, #fff);
      border-radius: var(--sf-radius-xl, 24px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    
    .pwa-install-icon img {
      width: 48px;
      height: 48px;
      border-radius: var(--sf-radius-md, 12px);
      object-fit: cover;
    }
    
    .pwa-install-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    
    .pwa-install-text strong {
      font-family: var(--font-display, sans-serif);
      font-weight: 600;
      color: var(--text, #1a1a1a);
    }
    
    .pwa-install-text span {
      font-size: 0.875rem;
      color: var(--muted, #737373);
    }
    
    .pwa-install-actions {
      display: flex;
      align-items: center;
      gap: var(--sf-space-sm, 0.5rem);
    }
    
    .pwa-install-btn {
      padding: 0.75rem 1.25rem;
      background: var(--sf-gradient-warm, linear-gradient(135deg, #e34a3b, #ff8c3a));
      color: #fff;
      font-family: var(--font-display, sans-serif);
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 16px rgba(227, 74, 59, 0.3);
    }
    
    .pwa-install-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(227, 74, 59, 0.4);
    }
    
    .pwa-dismiss-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: 50%;
      color: var(--muted, #737373);
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    
    .pwa-dismiss-btn:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--text, #1a1a1a);
    }
    
    @media (max-width: 480px) {
      .pwa-install-content {
        flex-wrap: wrap;
        text-align: center;
        justify-content: center;
      }
      
      .pwa-install-text {
        align-items: center;
        width: 100%;
      }
      
      .pwa-install-actions {
        width: 100%;
        justify-content: center;
      }
    }
  `;
    document.head.appendChild(style);
})();
