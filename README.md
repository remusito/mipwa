# 🚦 Semáforo App - PWA Profesional

Una aplicación web progresiva (PWA) que simula un semáforo profesional con contador de precisión, sonidos y modo oscuro.

## ✨ Características Principales

### 🚦 Funcionalidad del Semáforo
- **Contador preciso** en formato SS.CC (segundos.centésimas)
- **Secuencia realista:** Ámbar (30s) → Verde (55s) → Ámbar parpadeando (60s) → Rojo (65s)
- **Mensajes claros:** "ESPERE", "ADELANTE", "PARA"
- **Bucle infinito** automático después del primer ciclo
- **Sonidos diferenciados** para cada cambio de estado
- **Sonido de aviso** durante los 5 segundos de ámbar parpadeando

### 🎨 Interfaz y Diseño
- **Modo oscuro/claro** con persistencia en localStorage
- **Panel de ajustes** deslizable con glassmorphism
- **Animaciones suaves** y transiciones profesionales
- **Responsive design** para todos los dispositivos
- **Iconos personalizados** en alta resolución

### 📱 Características PWA
- **Instalación nativa** en Android e iOS
- **Funciona offline** después de la primera carga
- **Pantalla completa** sin barras del navegador
- **Mantiene pantalla encendida** durante uso
- **Service Worker** para cache inteligente

## 🚀 Instalación Rápida

### Para Windows:
1. Ejecuta `iniciar-servidor.bat`
2. Sigue las instrucciones en pantalla

### Para Mac/Linux:
1. Ejecuta `./iniciar-servidor.sh`
2. Sigue las instrucciones en pantalla

### Manual:
1. **Generar iconos:**
   ```bash
   # Abre create-icons.html y descarga todos los iconos
   ```

2. **Iniciar servidor:**
   ```bash
   python server.py
   ```

3. **Instalar en móvil:**
   - Conecta móvil a la misma WiFi
   - Abre Chrome en Android
   - Ve a `http://[IP-DE-TU-PC]:8080`
   - Menú → "Instalar app"

## 📱 Instalación Detallada

Ver **[INSTALACION.md](INSTALACION.md)** para instrucciones completas paso a paso.

## 🎮 Uso de la Aplicación

### Controles Principales:
- **INICIAR/PARAR**: Controla el ciclo del semáforo
- **⚙️ Ajustes**: Accede al panel de configuración
- **🌙 Modo Oscuro**: Cambia entre tema claro y oscuro

### Secuencia de Funcionamiento:
1. **Primer ciclo:** Ámbar (30s) → Verde (25s) → Ámbar parpadeando (5s) → Rojo (5s)
2. **Bucle infinito:** Verde (55s) → Ámbar parpadeando (5s) → Rojo (5s) → Repetir

### Sonidos:
- **Cambio de color**: Tonos diferenciados (grave para verde/rojo, agudo para ámbar)
- **Aviso de cambio**: Tick cada segundo durante ámbar parpadeando
- **Sin ruido**: Silencioso durante verde y rojo fijos

## 📁 Estructura del Proyecto

```
semaforo-app/
├── 📄 index.html              # Página principal
├── 🎨 styles.css              # Estilos y animaciones
├── ⚙️ script.js               # Lógica de la aplicación
├── 📱 manifest.json           # Configuración PWA
├── 🔧 sw.js                   # Service Worker
├── 🖥️ server.py               # Servidor local mejorado
├── 🎯 create-icons.html       # Generador de iconos
├── 📋 INSTALACION.md          # Guía detallada
├── 🪟 iniciar-servidor.bat    # Script Windows
├── 🐧 iniciar-servidor.sh     # Script Mac/Linux
└── 🖼️ [iconos].png            # Iconos generados
```

## 🔧 Requisitos Técnicos

- **Python 3.6+** (para servidor local)
- **Navegador moderno** con soporte PWA
- **Chrome/Edge** recomendado para Android
- **Safari** para iOS
- **Conexión WiFi** (solo para instalación inicial)

## 🌐 Despliegue Online

### Opciones gratuitas:
- **GitHub Pages**: Sube a repositorio y activa Pages
- **Netlify**: Arrastra carpeta a netlify.com
- **Vercel**: Deploy automático desde GitHub

## 🛠️ Desarrollo

### Tecnologías utilizadas:
- **HTML5** con semántica moderna
- **CSS3** con Flexbox y Grid
- **JavaScript ES6+** con clases
- **Web Audio API** para sonidos
- **Service Workers** para PWA
- **LocalStorage** para persistencia

### Características técnicas:
- **Glassmorphism** en elementos UI
- **Backdrop filters** para efectos de desenfoque
- **CSS Custom Properties** para temas
- **Intersection Observer** para optimización
- **Wake Lock API** para mantener pantalla activa

## 📊 Compatibilidad

| Característica | Chrome | Firefox | Safari | Edge |
|---------------|--------|---------|--------|------|
| PWA Install   | ✅     | ⚠️      | ✅     | ✅   |
| Service Worker| ✅     | ✅      | ✅     | ✅   |
| Web Audio     | ✅     | ✅      | ✅     | ✅   |
| Wake Lock     | ✅     | ❌      | ❌     | ✅   |

## 🆘 Soporte y Problemas

### Problemas comunes:
- **No se conecta**: Verifica misma red WiFi
- **No instala**: Usa Chrome en Android
- **Sin sonido**: Interactúa primero con la página
- **No offline**: Espera primera carga completa

### Logs y debugging:
- Abre DevTools (F12) para ver errores
- Verifica Service Worker en Application tab
- Revisa Network tab para recursos faltantes

## 📄 Licencia

Este proyecto es de código abierto. Úsalo, modifícalo y distribúyelo libremente.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Puedes:
- Reportar bugs
- Sugerir nuevas características
- Mejorar la documentación
- Optimizar el código

---

**¡Disfruta tu nueva app de semáforo profesional! 🚦✨**