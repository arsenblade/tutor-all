import React, { useState, useEffect } from 'react';
import styles from './BannerInstallSite.module.scss';

declare global {
    interface WindowEventMap {
        'beforeinstallprompt': BeforeInstallPromptEvent;
    }
}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    prompt(): Promise<void>;
}

const BannerInstallSite: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
      <div className={styles.installBanner}>
        <div className={styles.installContainer}>
          <div className={styles.installWrapper}>
            <button className={styles.installButton} onClick={handleInstallClick}>
              Установить сайт как PWA
            </button>
          </div>
          <button className={styles.installClose} onClick={() => setIsVisible(false)}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.92082 21.7211C8.54592 22.096 8.54592 22.7038 8.92082 23.0787C9.29572 23.4536 9.90357 23.4536 10.2785 23.0787L8.92082 21.7211ZM16.6784 16.6787C17.0533 16.3038 17.0533 15.696 16.6784 15.3211C16.3035 14.9462 15.6958 14.9462 15.3209 15.3211L16.6784 16.6787ZM15.3209 15.3211C14.9459 15.696 14.9459 16.3038 15.3209 16.6787C15.6958 17.0536 16.3035 17.0536 16.6784 16.6787L15.3209 15.3211ZM23.0784 10.2787C23.4533 9.90381 23.4533 9.29597 23.0784 8.92107C22.7035 8.54617 22.0958 8.54617 21.7209 8.92107L23.0784 10.2787ZM16.6784 15.3211C16.3035 14.9462 15.6958 14.9462 15.3209 15.3211C14.9459 15.696 14.9459 16.3038 15.3209 16.6787L16.6784 15.3211ZM21.7209 23.0787C22.0958 23.4536 22.7035 23.4536 23.0784 23.0787C23.4533 22.7038 23.4533 22.096 23.0784 21.7211L21.7209 23.0787ZM15.3209 16.6787C15.6958 17.0536 16.3035 17.0536 16.6784 16.6787C17.0533 16.3038 17.0533 15.696 16.6784 15.3211L15.3209 16.6787ZM10.2785 8.92107C9.90357 8.54617 9.29572 8.54617 8.92082 8.92107C8.54592 9.29597 8.54592 9.90381 8.92082 10.2787L10.2785 8.92107ZM10.2785 23.0787L16.6784 16.6787L15.3209 15.3211L8.92082 21.7211L10.2785 23.0787ZM16.6784 16.6787L23.0784 10.2787L21.7209 8.92107L15.3209 15.3211L16.6784 16.6787ZM15.3209 16.6787L21.7209 23.0787L23.0784 21.7211L16.6784 15.3211L15.3209 16.6787ZM16.6784 15.3211L10.2785 8.92107L8.92082 10.2787L15.3209 16.6787L16.6784 15.3211Z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
};

export default BannerInstallSite;
