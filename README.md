# 🚛 Tacógrafo App - Regla del Minuto

## 📱 Aplicación PWA para Conductores Profesionales

**Tacógrafo App** es una aplicación web progresiva (PWA) diseñada específicamente para conductores profesionales que necesitan cumplir con la **regla del minuto del tacógrafo**. Esta regla es fundamental para el cumplimiento de la normativa de tiempos de conducción y descanso en el transporte por carretera.

## 🎯 ¿Qué es la Regla del Minuto?

La **regla del minuto** es una normativa que establece que los conductores profesionales deben respetar estrictamente los tiempos de conducción y descanso. Esta app simula un semáforo que ayuda a los conductores a:

- **Controlar tiempos de conducción** de manera visual y auditiva
- **Respetar períodos de descanso** obligatorios
- **Cumplir con la normativa** del tacógrafo digital
- **Evitar sanciones** por incumplimiento de tiempos

## 🚦 Funcionamiento de la App

### Secuencia del Semáforo:

1. **🟡 Amarillo (ESPERE)**: 30 segundos iniciales - Tiempo de preparación
2. **🟢 Verde (ADELANTE)**: 50 segundos - Tiempo de conducción activa
3. **🟡 Amarillo (ESPERE)**: 10 segundos - Aviso de cambio
4. **🔴 Rojo (DETENGASE)**: 60 segundos - Tiempo de descanso obligatorio
5. **🔄 Bucle infinito**: Se repite la secuencia verde → amarillo → rojo

### Características Técnicas:

- **Contador preciso**: Muestra el tiempo en formato MM.SS
- **Reinicio automático**: El contador se reinicia en cada cambio de color
- **Sonidos de aviso**: Diferentes tonos para cada cambio de estado
- **Parpadeo visual**: El amarillo parpadea para mayor visibilidad
- **Sin sonido inicial**: Los primeros 30 segundos son silenciosos

## ⚙️ Cómo Funciona la App

### Sistema de Estados:

La app utiliza un sistema de estados inteligente que controla automáticamente la secuencia del semáforo:

1. **Estado Inicial**: Amarillo parpadeante (30 segundos)
   - El contador comienza en 00.00
   - No hay sonido de tick durante este período
   - Mensaje: "ESPERE"

2. **Estado de Conducción**: Verde (50 segundos)
   - El contador se reinicia a 00.00
   - Sonido de confirmación al cambiar a verde
   - Mensaje: "ADELANTE"

3. **Estado de Aviso**: Amarillo parpadeante (10 segundos)
   - El contador se reinicia a 00.00
   - Sonido de tick cada segundo durante el parpadeo
   - Mensaje: "ESPERE"

4. **Estado de Descanso**: Rojo (60 segundos)
   - El contador se reinicia a 00.00
   - Sonido de alerta al cambiar a rojo
   - Mensaje: "DETENGASE"

5. **Bucle Automático**: Vuelve al estado verde y se repite indefinidamente

### Lógica de Control:

- **Contador Preciso**: Actualizado cada 10 milisegundos (centésimas de segundo)
- **Reinicio Automático**: En cada cambio de estado, el contador vuelve a 00.00
- **Verificación de Estados**: Cada cambio solo ocurre cuando el círculo está en el color correcto
- **Sincronización**: Los sonidos y cambios visuales están perfectamente sincronizados

### Características del Sonido:

- **Verde**: Tono medio (600Hz) - Confirmación de conducción
- **Amarillo**: Tono alto (1000Hz) - Aviso de cambio
- **Rojo**: Tono bajo (400Hz) - Alerta de descanso obligatorio
- **Tick**: Tono agudo (1200Hz) - Durante parpadeo del amarillo

## 📱 Características PWA

- **Instalable**: Se puede instalar como app nativa en móviles y tablets
- **Funciona offline**: Funciona sin conexión a internet
- **Responsive**: Se adapta a cualquier tamaño de pantalla
- **Actualizaciones automáticas**: Se actualiza automáticamente
- **Compatibilidad**: Funciona en todos los navegadores modernos

## 🎮 Cómo Usar

1. **Abrir la app** en tu navegador móvil o desktop
2. **Pulsar "INICIAR"** para comenzar el ciclo del semáforo
3. **Observar el color** del círculo y el contador
4. **Seguir las indicaciones**:
   - 🟢 **Verde**: Puedes conducir
   - 🟡 **Amarillo**: Prepárate para parar
   - 🔴 **Rojo**: Debes detenerte y descansar
5. **Pulsar "PARAR"** para detener el ciclo en cualquier momento

## 📋 Aplicaciones en el Transporte

### Para Conductores:
- **Control de tiempos de conducción**
- **Respeto de períodos de descanso**
- **Cumplimiento de normativas del tacógrafo**
- **Prevención de fatiga al volante**

### Para Empresas de Transporte:
- **Formación de conductores**
- **Cumplimiento normativo**
- **Reducción de sanciones**
- **Mejora de la seguridad vial**

## 🔧 Instalación

### En Móvil/Tablet:
1. Abrir la app en el navegador
2. Pulsar "Instalar" cuando aparezca la notificación
3. La app se instalará en tu pantalla de inicio

### En Desktop:
1. Abrir la app en el navegador
2. Pulsar el icono de instalación en la barra de direcciones
3. Confirmar la instalación

## 📊 Normativa Relacionada

Esta app está diseñada para ayudar al cumplimiento de:
- **Reglamento (CE) 561/2006** sobre tiempos de conducción y descanso
- **Directiva 2002/15/CE** sobre tiempos de trabajo
- **Reglamento (UE) 165/2014** sobre el tacógrafo digital
- **Legislación nacional** sobre transporte por carretera

## 🚨 Importante

**Esta aplicación es una herramienta de ayuda visual y no sustituye el tacógrafo digital obligatorio.** Los conductores profesionales deben:

- Mantener su tacógrafo digital actualizado
- Respetar siempre los tiempos oficiales
- Consultar la normativa vigente en su país
- Usar esta app solo como referencia visual

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y responsive
- **JavaScript ES6+**: Lógica de la aplicación
- **Service Worker**: Funcionalidad offline
- **Web App Manifest**: Instalación como PWA
- **Progressive Web App**: Experiencia nativa

## 📞 Soporte

Para soporte técnico o sugerencias:
- **Desarrollador**: Rubén Cerezo
- **Versión**: v2.1.0
- **Contacto**: Disponible en la app

## 📄 Licencia

Esta aplicación está desarrollada para uso educativo y profesional en el sector del transporte por carretera.

---

**🚛 Tacógrafo App - Tu compañero de viaje para el cumplimiento de la regla del minuto**