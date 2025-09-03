class SemaforoApp {
    constructor() {
        this.counter = 0; // contador en centésimas de segundo
        this.isRunning = false;
        this.intervalId = null;
        this.audioContext = null;
        this.isFirstCycle = true; // Para controlar el primer ciclo
        this.currentLogo = 'scania'; // Logo actual (scania o renault)

        this.counterElement = document.getElementById('counter');
        this.circleElement = document.getElementById('circle');
        this.startBtn = document.getElementById('startBtn');
        this.statusMessage = document.getElementById('statusMessage');
        this.scaniaLogo = document.getElementById('scaniaLogo');
        this.renaultLogo = document.getElementById('renaultLogo');

        this.initAudio();
        this.bindEvents();
        this.loadLogoPreference();
    }

    initAudio() {
        // Crear contexto de audio para los sonidos
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio no soportado');
        }
    }

    playBeep(frequency = 800, duration = 200) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => {
            if (!this.isRunning) {
                this.startCycle();
            } else {
                this.stop();
            }
        });

        // Activar audio context en la primera interacción
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });
    }

    formatTime(centiseconds) {
        const totalSeconds = Math.floor(centiseconds / 100);
        const milliseconds = (centiseconds % 100);
        return `${totalSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }

    updateStatusMessage(status) {
        // Remover todas las clases de estado
        this.statusMessage.classList.remove('espere', 'adelante', 'para');

        // Actualizar texto y clase según el estado
        switch (status) {
            case 'yellow':
                this.statusMessage.textContent = 'ESPERE';
                this.statusMessage.classList.add('espere');
                break;
            case 'green':
                this.statusMessage.textContent = 'ADELANTE';
                this.statusMessage.classList.add('adelante');
                break;
            case 'red':
                this.statusMessage.textContent = 'DETENGASE';
                this.statusMessage.classList.add('para');
                break;
        }
    }

    startCycle() {
        this.isRunning = true;
        this.counter = 0;
        this.isFirstYellow = true; // Para distinguir el primer amarillo de 30s
        this.startBtn.textContent = 'PARAR';
        this.startBtn.classList.add('stop');

        // Iniciar con ámbar parpadeante
        this.circleElement.className = 'circle yellow blinking';
        this.updateStatusMessage('yellow');

        this.intervalId = setInterval(() => {
            this.counter++;
            
            // Mostrar contador desde cero en cada fase
            this.counterElement.textContent = this.formatTime(this.counter);

            // BUCLE INFINITO: Amarillo 30s → Verde 50s → Amarillo 10s → Rojo 60s → repetir...
            if (this.circleElement.classList.contains('yellow') && this.circleElement.classList.contains('blinking') && this.isFirstYellow && this.counter >= 3000) {
                // PRIMER amarillo: cambiar a verde a los 30 segundos y reiniciar contador
                this.counter = 0;
                this.isFirstYellow = false; // Ya no es el primer amarillo
                this.circleElement.className = 'circle green';
                this.updateStatusMessage('green');
                this.playBeep(600, 300);
            } else if (this.circleElement.classList.contains('green') && this.counter >= 5000) {
                // Empezar ámbar parpadeante a los 50 segundos y reiniciar contador
                this.counter = 0;
                this.circleElement.className = 'circle yellow blinking';
                this.updateStatusMessage('yellow');
                this.playBeep(1000, 150);
            } else if (this.circleElement.classList.contains('yellow') && this.circleElement.classList.contains('blinking') && !this.isFirstYellow && this.counter >= 1000) {
                // Amarillo POSTERIOR: cambiar a rojo a los 10 segundos y reiniciar contador
                this.counter = 0;
                this.circleElement.className = 'circle red';
                this.updateStatusMessage('red');
                this.playBeep(400, 500);
            } else if (this.circleElement.classList.contains('red') && this.counter >= 6000) {
                // Volver a verde y reiniciar contador
                this.counter = 0;
                this.circleElement.className = 'circle green';
                this.updateStatusMessage('green');
                this.playBeep(600, 300);
            }

            // Sonido de tick durante ámbar parpadeando (excepto los primeros 30 segundos)
            if (this.circleElement.classList.contains('blinking') && !this.isFirstYellow && this.counter % 100 === 0) {
                this.playBeep(1200, 100); // Tick más audible durante el ámbar
            }

        }, 10); // Actualizar cada 10ms (centésimas de segundo)
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        this.isFirstYellow = true;
        this.startBtn.textContent = 'INICIAR';
        this.startBtn.classList.remove('stop');
        this.counter = 0;
        this.counterElement.textContent = '00.00';
        this.circleElement.className = 'circle yellow'; // Volver al estado inicial (ámbar)
        this.updateStatusMessage('yellow');
    }

    // Métodos para manejar los logos
    switchLogo(logoType) {
        if (logoType === 'scania') {
            this.scaniaLogo.style.display = 'block';
            this.renaultLogo.style.display = 'none';
            this.currentLogo = 'scania';
        } else if (logoType === 'renault') {
            this.scaniaLogo.style.display = 'none';
            this.renaultLogo.style.display = 'block';
            this.currentLogo = 'renault';
        } else if (logoType === 'none') {
            this.scaniaLogo.style.display = 'none';
            this.renaultLogo.style.display = 'none';
            this.currentLogo = 'none';
        }
        this.saveLogoPreference();
    }

    saveLogoPreference() {
        localStorage.setItem('semaforoLogo', this.currentLogo);
    }

    loadLogoPreference() {
        const savedLogo = localStorage.getItem('semaforoLogo');
        if (savedLogo && (savedLogo === 'scania' || savedLogo === 'renault' || savedLogo === 'none')) {
            this.switchLogo(savedLogo);
        } else {
            this.switchLogo('none'); // Por defecto sin logo
        }
    }
}

// Variables globales
let semaforoApp;
let settingsManager;

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar contador en formato 00.00
    document.getElementById('counter').textContent = '00.00';
    
    // Inicializar aplicaciones
    semaforoApp = new SemaforoApp();
    
    // Esperar un poco antes de inicializar settings para asegurar que el DOM esté listo
    setTimeout(() => {
        settingsManager = new SettingsManager();
        console.log('App inicializada correctamente');
    }, 100);
});

// Prevenir que la pantalla se apague
let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.log('Wake Lock no soportado');
    }
}

// Solicitar wake lock cuando se inicia
document.addEventListener('visibilitychange', () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
    }
});

requestWakeLock();

// Funcionalidad del panel de ajustes
class SettingsManager {
    constructor() {
        // Obtener elementos del DOM
        this.settingsIcon = document.getElementById('settingsIcon');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.settingsOverlay = document.getElementById('settingsOverlay');
        this.closeSettings = document.getElementById('closeSettings');

        // Verificar que todos los elementos existen
        if (!this.settingsIcon || !this.settingsPanel) {
            console.error('Error: No se encontraron elementos del panel de ajustes');
            return;
        }

        console.log('SettingsManager (solo panel) inicializado');
        
        this.initSettings();
        this.bindSettingsEvents();
        this.loadSettings();
    }

    initSettings() {
        // El tema se maneja en el sistema de respaldo
        console.log('SettingsManager - solo panel de ajustes');
    }

    bindSettingsEvents() {
        // Abrir panel de ajustes
        if (this.settingsIcon) {
            this.settingsIcon.addEventListener('click', () => {
                console.log('Abriendo panel de ajustes');
                this.openSettings();
            });
        }

        // Cerrar panel de ajustes
        if (this.closeSettings) {
            this.closeSettings.addEventListener('click', () => {
                console.log('Cerrando panel de ajustes');
                this.closeSettingsPanel();
            });
        }

        // Cerrar con overlay
        if (this.settingsOverlay) {
            this.settingsOverlay.addEventListener('click', () => {
                console.log('Cerrando con overlay');
                this.closeSettingsPanel();
            });
        }

        // Botón de compartir
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                console.log('Compartiendo app');
                this.shareApp();
            });
        }

        // Botón de donación
        const donateBtn = document.getElementById('donateBtn');
        if (donateBtn) {
            donateBtn.addEventListener('click', () => {
                console.log('Abriendo donación PayPal');
                this.openDonation();
            });
        }

        // Botón premium
        const premiumBtn = document.getElementById('premiumBtn');
        if (premiumBtn) {
            premiumBtn.addEventListener('click', () => {
                console.log('Abriendo versión premium');
                this.openPremium();
            });
        }

        // Icono de menú
        const menuIcon = document.getElementById('menuIcon');
        if (menuIcon) {
            menuIcon.addEventListener('click', () => {
                console.log('Abriendo menú');
                this.openMenu();
            });
        }

        // Cerrar menú
        const closeMenu = document.getElementById('closeMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                console.log('Cerrando menú');
                this.closeMenu();
            });
        }
        
        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                console.log('Cerrando menú con overlay');
                this.closeMenu();
            });
        }

        // Items del menú
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.dataset.category;
                console.log('Categoría seleccionada:', category);
                this.handleCategoryChange(category);
                this.closeMenu();
            });
        });

        // Selector de logo
        const logoSelect = document.getElementById('logoSelect');
        if (logoSelect) {
            logoSelect.addEventListener('change', (e) => {
                console.log('Cambiando logo a:', e.target.value);
                if (semaforoApp) {
                    semaforoApp.switchLogo(e.target.value);
                }
            });
        }

        // Toggle tema - REMOVIDO para evitar conflictos
        // El toggle se maneja en el sistema de respaldo

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.settingsPanel && this.settingsPanel.classList.contains('open')) {
                console.log('Cerrando con Escape');
                this.closeSettingsPanel();
            }
        });
    }

    openSettings() {
        this.settingsPanel.classList.add('open');
        this.settingsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeSettingsPanel() {
        this.settingsPanel.classList.remove('open');
        this.settingsOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    loadSettings() {
        // Cargar preferencia del logo
        const logoSelect = document.getElementById('logoSelect');
        if (logoSelect) {
            const savedLogo = localStorage.getItem('semaforoLogo') || 'none';
            logoSelect.value = savedLogo;
        }
        
        console.log('Ajustes cargados');
    }

    async shareApp() {
        const shareData = {
            title: 'Semáforo App - Contador de Tiempo',
            text: '¡Mira esta increíble app de semáforo! Perfecta para entrenamientos y ejercicios de timing.',
            url: window.location.href
        };

        try {
            // Verificar si el navegador soporta Web Share API
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                console.log('Usando Web Share API nativa');
                await navigator.share(shareData);
                console.log('App compartida exitosamente');
            } else {
                // Fallback para navegadores que no soportan Web Share API
                console.log('Web Share API no disponible, usando fallback');
                this.shareAppFallback(shareData);
            }
        } catch (error) {
            console.log('Error al compartir:', error);
            // Si hay error, usar fallback
            this.shareAppFallback(shareData);
        }
    }

    shareAppFallback(shareData) {
        // Crear URLs para diferentes plataformas
        const currentUrl = encodeURIComponent(shareData.url);
        const text = encodeURIComponent(shareData.text);
        const title = encodeURIComponent(shareData.title);

        const shareOptions = [
            {
                name: 'WhatsApp',
                url: `https://wa.me/?text=${text}%20${currentUrl}`,
                icon: '💬'
            },
            {
                name: 'Telegram',
                url: `https://t.me/share/url?url=${currentUrl}&text=${text}`,
                icon: '✈️'
            },
            {
                name: 'Twitter',
                url: `https://twitter.com/intent/tweet?text=${text}&url=${currentUrl}`,
                icon: '🐦'
            },
            {
                name: 'Facebook',
                url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
                icon: '📘'
            },
            {
                name: 'Copiar enlace',
                action: 'copy',
                icon: '📋'
            }
        ];

        // Crear modal de compartir
        this.showShareModal(shareOptions, shareData);
    }

    showShareModal(shareOptions, shareData) {
        // Crear modal
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-modal-header">
                    <h3>Compartir Semáforo App</h3>
                    <button class="share-modal-close">×</button>
                </div>
                <div class="share-options">
                    ${shareOptions.map(option => `
                        <button class="share-option" data-action="${option.action || 'share'}" data-url="${option.url || ''}">
                            <span class="share-icon">${option.icon}</span>
                            <span class="share-name">${option.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Añadir estilos inline para el modal
        const style = document.createElement('style');
        style.textContent = `
            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .share-modal-content {
                background: white;
                border-radius: 15px;
                padding: 20px;
                max-width: 400px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            body.dark-mode .share-modal-content {
                background: #2a2a3a;
                color: white;
            }
            
            .share-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            
            body.dark-mode .share-modal-header {
                border-bottom-color: #444;
            }
            
            .share-modal-header h3 {
                margin: 0;
                font-size: 1.2rem;
            }
            
            .share-modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 5px;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .share-modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            body.dark-mode .share-modal-close {
                color: #ccc;
            }
            
            body.dark-mode .share-modal-close:hover {
                background: #444;
                color: white;
            }
            
            .share-options {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 10px;
            }
            
            .share-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 15px 10px;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                color: inherit;
            }
            
            .share-option:hover {
                border-color: #4a90e2;
                background: #f8f9ff;
                transform: translateY(-2px);
            }
            
            body.dark-mode .share-option {
                background: #3a3a4a;
                border-color: #555;
                color: white;
            }
            
            body.dark-mode .share-option:hover {
                border-color: #4a90e2;
                background: #4a4a5a;
            }
            
            .share-icon {
                font-size: 24px;
                margin-bottom: 8px;
            }
            
            .share-name {
                font-size: 14px;
                font-weight: 500;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.share-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });

        // Manejar opciones de compartir
        const shareOptionBtns = modal.querySelectorAll('.share-option');
        shareOptionBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const action = btn.dataset.action;
                const url = btn.dataset.url;

                if (action === 'copy') {
                    // Copiar enlace al portapapeles
                    try {
                        await navigator.clipboard.writeText(shareData.url);
                        btn.innerHTML = '<span class="share-icon">✅</span><span class="share-name">¡Copiado!</span>';
                        setTimeout(() => {
                            document.body.removeChild(modal);
                            document.head.removeChild(style);
                        }, 1500);
                    } catch (error) {
                        console.log('Error al copiar:', error);
                        // Fallback para copiar
                        const textArea = document.createElement('textarea');
                        textArea.value = shareData.url;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        btn.innerHTML = '<span class="share-icon">✅</span><span class="share-name">¡Copiado!</span>';
                        setTimeout(() => {
                            document.body.removeChild(modal);
                            document.head.removeChild(style);
                        }, 1500);
                    }
                } else if (url) {
                    // Abrir en nueva ventana
                    window.open(url, '_blank', 'width=600,height=400');
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        });
    }

    openDonation() {
        // URL de PayPal para donaciones (puedes cambiar esta URL por tu enlace real de PayPal)
        const paypalUrl = 'https://paypal.me/timehackpro?country.x=ES&locale.x=es_ES", "_blank';
        
        // Mostrar modal de confirmación antes de abrir PayPal
        const modal = document.createElement('div');
        modal.className = 'donate-modal';
        modal.innerHTML = `
            <div class="donate-modal-content">
                <div class="donate-modal-header">
                    <h3>💝 Apoyar el desarrollo</h3>
                    <button class="donate-modal-close">×</button>
                </div>
                <div class="donate-modal-body">
                    <p>¡Gracias por considerar apoyar el desarrollo de Semáforo App!</p>
                    <p>Tu donación ayuda a mantener y mejorar la aplicación.</p>
                    <div class="donate-buttons">
                        <button class="donate-confirm-btn" id="confirmDonate">
                            💳 Ir a PayPal
                        </button>
                        <button class="donate-cancel-btn" id="cancelDonate">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Añadir estilos inline para el modal de donación
        const style = document.createElement('style');
        style.textContent = `
            .donate-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .donate-modal-content {
                background: white;
                border-radius: 15px;
                padding: 25px;
                max-width: 400px;
                width: 90%;
                animation: slideUp 0.3s ease;
                text-align: center;
            }
            
            body.dark-mode .donate-modal-content {
                background: #2a2a3a;
                color: white;
            }
            
            .donate-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            
            body.dark-mode .donate-modal-header {
                border-bottom-color: #444;
            }
            
            .donate-modal-header h3 {
                margin: 0;
                font-size: 1.3rem;
                color: #ff6b35;
            }
            
            body.dark-mode .donate-modal-header h3 {
                color: #ff7b45;
            }
            
            .donate-modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                padding: 5px;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .donate-modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            body.dark-mode .donate-modal-close {
                color: #ccc;
            }
            
            body.dark-mode .donate-modal-close:hover {
                background: #444;
                color: white;
            }
            
            .donate-modal-body p {
                margin-bottom: 15px;
                line-height: 1.5;
                color: #555;
            }
            
            body.dark-mode .donate-modal-body p {
                color: #ccc;
            }
            
            .donate-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .donate-confirm-btn {
                flex: 1;
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .donate-confirm-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
            }
            
            .donate-cancel-btn {
                flex: 1;
                background: #f0f0f0;
                color: #666;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .donate-cancel-btn:hover {
                background: #e0e0e0;
                color: #333;
            }
            
            body.dark-mode .donate-cancel-btn {
                background: #444;
                color: #ccc;
            }
            
            body.dark-mode .donate-cancel-btn:hover {
                background: #555;
                color: white;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.donate-modal-close');
        const confirmBtn = modal.querySelector('#confirmDonate');
        const cancelBtn = modal.querySelector('#cancelDonate');

        const closeModal = () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        confirmBtn.addEventListener('click', () => {
            // Abrir PayPal en nueva ventana
            window.open(paypalUrl, '_blank', 'width=800,height=600');
            closeModal();
        });

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    openPremium() {
        // Modal para la versión premium
        const modal = document.createElement('div');
        modal.className = 'premium-modal';
        modal.innerHTML = `
            <div class="premium-modal-content">
                <div class="premium-modal-header">
                    <h3>⭐ Versión Premium</h3>
                    <button class="premium-modal-close">×</button>
                </div>
                <div class="premium-modal-body">
                    <h4>🚀 Funciones Premium</h4>
                    <ul>
                        <li>✅ Sin anuncios</li>
                        <li>✅ Sonidos personalizados</li>
                        <li>✅ Temas adicionales</li>
                        <li>✅ Configuración avanzada</li>
                        <li>✅ Soporte prioritario</li>
                    </ul>
                    <p><strong>Precio: 2.99€</strong></p>
                    <div class="premium-buttons">
                        <button class="premium-buy-btn" id="buyPremium">
                            💳 Comprar Premium
                        </button>
                        <button class="premium-cancel-btn" id="cancelPremium">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Estilos inline para el modal premium
        const style = document.createElement('style');
        style.textContent = `
            .premium-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .premium-modal-content {
                background: white;
                border-radius: 15px;
                padding: 25px;
                max-width: 400px;
                width: 90%;
                animation: slideUp 0.3s ease;
                text-align: center;
            }
            
            body.dark-mode .premium-modal-content {
                background: #2a2a3a;
                color: white;
            }
            
            .premium-modal-header h3 {
                margin: 0;
                color: #ffd700;
                font-size: 1.3rem;
            }
            
            .premium-modal-body h4 {
                color: #333;
                margin-bottom: 15px;
            }
            
            body.dark-mode .premium-modal-body h4 {
                color: #e0e0e0;
            }
            
            .premium-modal-body ul {
                text-align: left;
                margin: 15px 0;
                padding-left: 20px;
            }
            
            .premium-modal-body li {
                margin: 8px 0;
                color: #555;
            }
            
            body.dark-mode .premium-modal-body li {
                color: #ccc;
            }
            
            .premium-buttons {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .premium-buy-btn {
                flex: 1;
                background: #ffd700;
                color: #333;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .premium-buy-btn:hover {
                background: #ffed4e;
                transform: translateY(-2px);
            }
            
            .premium-cancel-btn {
                flex: 1;
                background: #f0f0f0;
                color: #666;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .premium-cancel-btn:hover {
                background: #e0e0e0;
            }
            
            body.dark-mode .premium-cancel-btn {
                background: #444;
                color: #ccc;
            }
            
            body.dark-mode .premium-cancel-btn:hover {
                background: #555;
                color: white;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);

        // Event listeners
        const closeBtn = modal.querySelector('.premium-modal-close');
        const buyBtn = modal.querySelector('#buyPremium');
        const cancelBtn = modal.querySelector('#cancelPremium');

        const closeModal = () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        buyBtn.addEventListener('click', () => {
            alert('🚀 ¡Gracias por tu interés! La versión Premium estará disponible próximamente.');
            closeModal();
        });

        // Cerrar al hacer clic fuera del modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    handleCategoryChange(category) {
        if (!category) return;

        const categoryMessages = {
            'mantenimiento': () => {
                // Abrir página de mantenimiento del vehículo
                window.open('./mantenimiento.html', '_blank');
            },
            'contactos': '📞 Gestión de contactos en desarrollo',
            'gps': () => {
                // Abrir página de velocímetro GPS
                window.open('./velocimetro.html', '_blank');
            },
            'control-horas': () => {
                // Abrir página de control de horas para conductores profesionales
                window.open('./control-horas.html', '_blank');
            },
                        
        };

        const categoryAction = categoryMessages[category];
        
        // Si es una función, ejecutarla
        if (typeof categoryAction === 'function') {
            categoryAction();
            return;
        }
        
        const message = categoryAction || 'Función en desarrollo';
        
        // Mostrar mensaje temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4a90e2;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);

    }

    openMenu() {
        const menuPanel = document.getElementById('menuPanel');
        const menuIcon = document.getElementById('menuIcon');
        
        if (menuPanel) {
            menuPanel.classList.add('open');
        }
        
        if (menuIcon) {
            menuIcon.classList.add('open');
        }
    }

    closeMenu() {
        const menuPanel = document.getElementById('menuPanel');
        const menuIcon = document.getElementById('menuIcon');
        
        if (menuPanel) {
            menuPanel.classList.remove('open');
        }
        
        if (menuIcon) {
            menuIcon.classList.remove('open');
        }
    }
}

// Los ajustes se inicializan en el DOMContentLoaded principal

// Inicialización simple del modo oscuro
window.addEventListener('load', () => {
    console.log('Inicializando modo oscuro...');
    
    // Función simple para alternar modo oscuro
    window.toggleDarkModeSimple = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('semaforo-theme', isDark ? 'dark' : 'light');
        
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.checked = isDark;
        }
        
        console.log('Modo oscuro:', isDark ? 'ON' : 'OFF');
        return isDark;
    };
    
    // Cargar tema guardado al iniciar
    const savedTheme = localStorage.getItem('semaforo-theme');
    console.log('Tema guardado:', savedTheme);
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Configurar el toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        console.log('Toggle encontrado, configurando...');
        
        // Establecer estado inicial
        themeToggle.checked = (savedTheme === 'dark');
        
        // Añadir evento
        themeToggle.addEventListener('change', function(e) {
            console.log('Toggle cambiado a:', e.target.checked);
            
            // Transición suave
            document.body.style.transition = 'all 0.3s ease';
            
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('semaforo-theme', 'dark');
                console.log('Modo oscuro activado');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('semaforo-theme', 'light');
                console.log('Modo claro activado');
            }
            
            // Remover transición
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
        
        // Añadir evento de clic directo al slider como respaldo
        const slider = themeToggle.nextElementSibling;
        if (slider && slider.classList.contains('slider')) {
            console.log('Slider encontrado, añadiendo evento de clic directo');
            slider.addEventListener('click', function(e) {
                console.log('Clic directo en slider');
                e.stopPropagation();
                themeToggle.checked = !themeToggle.checked;
                
                // Disparar evento change manualmente
                const event = new Event('change', { bubbles: true });
                themeToggle.dispatchEvent(event);
            });
        }
        
        console.log('Toggle configurado correctamente');
    } else {
        console.error('Toggle no encontrado!');
    }
    
    console.log('Modo oscuro inicializado');
});