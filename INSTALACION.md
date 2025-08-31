# 📱 Guía de Instalación - Semáforo App

## 🚀 Instalación Rápida en Android

### Paso 1: Generar Iconos
1. Abre `create-icons.html` en tu navegador
2. Haz clic en **"📱 Descargar Todos los Iconos"**
3. Guarda todos los archivos descargados en la carpeta `semaforo-app/`

### Paso 2: Ejecutar Servidor Local
```bash
cd semaforo-app
python server.py
```

### Paso 3: Instalar en tu Móvil Android
1. **Conecta tu móvil a la misma red WiFi** que tu PC
2. **Encuentra la IP de tu PC:**
   - Windows: `ipconfig` (busca IPv4)
   - Mac/Linux: `ifconfig` (busca inet)
   - Ejemplo: `192.168.1.100`

3. **Abre Chrome en tu móvil Android**
4. **Ve a:** `http://[IP-DE-TU-PC]:8080`
   - Ejemplo: `http://192.168.1.100:8080`

5. **Instalar la app:**
   - Toca el menú de Chrome (⋮)
   - Selecciona **"Instalar app"** o **"Añadir a pantalla de inicio"**
   - Confirma la instalación

¡Listo! La app aparecerá en tu pantalla de inicio como una app nativa.

---

## 🌐 Instalación Alternativa (Hosting Online)

### Opción A: GitHub Pages (Gratis)
1. Sube todos los archivos a un repositorio de GitHub
2. Activa GitHub Pages en la configuración
3. Visita la URL desde tu móvil
4. Instala como PWA

### Opción B: Netlify (Gratis)
1. Arrastra la carpeta `semaforo-app` a [netlify.com](https://netlify.com)
2. Obtén la URL generada
3. Visita desde tu móvil e instala

### Opción C: Vercel (Gratis)
1. Sube a [vercel.com](https://vercel.com)
2. Despliega automáticamente
3. Instala desde la URL generada

---

## 🍎 Instalación en iPhone/iPad

### Safari en iOS:
1. Abre la app en Safari
2. Toca el botón **Compartir** (□↗)
3. Selecciona **"Añadir a pantalla de inicio"**
4. Confirma el nombre y toca **"Añadir"**

---

## 🔧 Solución de Problemas

### ❌ "No se puede conectar"
- Verifica que móvil y PC estén en la misma red WiFi
- Desactiva el firewall temporalmente
- Usa la IP correcta (no 127.0.0.1)

### ❌ "No aparece opción de instalar"
- Asegúrate de usar Chrome en Android
- Verifica que todos los iconos estén descargados
- Recarga la página (F5)

### ❌ "Los iconos no se ven"
- Ejecuta `create-icons.html` y descarga todos los iconos
- Coloca los archivos .png en la carpeta correcta
- Reinicia el servidor

### ❌ "No funciona offline"
- La primera carga debe ser online
- Después funcionará sin internet
- Verifica que el Service Worker esté activo

---

## 📋 Archivos Necesarios

Asegúrate de tener todos estos archivos:

```
semaforo-app/
├── index.html              ✅ Página principal
├── styles.css              ✅ Estilos
├── script.js               ✅ Funcionalidad
├── manifest.json           ✅ Configuración PWA
├── sw.js                   ✅ Service Worker
├── server.py               ✅ Servidor local
├── create-icons.html       ✅ Generador de iconos
├── icon-192.png           📱 Icono 192x192
├── icon-512.png           📱 Icono 512x512
├── apple-touch-icon.png   🍎 Icono iOS
├── favicon-32x32.png      🌐 Favicon 32x32
└── favicon-16x16.png      🌐 Favicon 16x16
```

---

## ✨ Características de la App

### 🚦 Funcionalidades:
- **Contador preciso** en formato SS.CC (segundos.centésimas)
- **Secuencia realista:** Ámbar → Verde → Ámbar parpadeando → Rojo
- **Mensajes claros:** "ESPERE", "ADELANTE", "PARA"
- **Sonidos diferenciados** para cada cambio de estado
- **Modo oscuro/claro** con persistencia
- **Panel de ajustes** deslizable

### 📱 Características PWA:
- **Instalación nativa** en Android e iOS
- **Funciona offline** después de la primera carga
- **Pantalla completa** sin barras del navegador
- **Mantiene pantalla encendida** durante uso
- **Iconos personalizados** en alta resolución
- **Responsive** para todos los tamaños de pantalla

---

## 🆘 Soporte

Si tienes problemas:
1. Verifica que todos los archivos estén presentes
2. Usa Chrome actualizado en Android
3. Asegúrate de estar en la misma red WiFi
4. Reinicia el servidor si es necesario

¡Disfruta tu nueva app de semáforo! 🚦✨