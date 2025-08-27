#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import socket
from threading import Timer

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers para PWA
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def get_local_ip():
    """Obtener la IP local de la máquina"""
    try:
        # Conectar a un servidor externo para obtener la IP local
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

def find_free_port(start_port=8080):
    """Encontrar un puerto libre"""
    for port in range(start_port, start_port + 100):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            continue
    return None

def open_browser(port):
    webbrowser.open(f'http://localhost:{port}')

def print_qr_code(url):
    """Generar código QR en texto para fácil acceso móvil"""
    try:
        import qrcode
        qr = qrcode.QRCode(version=1, box_size=1, border=1)
        qr.add_data(url)
        qr.make(fit=True)
        qr.print_ascii(invert=True)
    except ImportError:
        print("💡 Tip: Instala 'qrcode' para generar código QR: pip install qrcode")

if __name__ == "__main__":
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Encontrar un puerto libre
    free_port = find_free_port(PORT)
    if not free_port:
        print("❌ No se pudo encontrar un puerto libre")
        input("Presiona Enter para salir...")
        exit(1)
    
    # Obtener IP local
    local_ip = get_local_ip()
    
    try:
        with socketserver.TCPServer(("", free_port), MyHTTPRequestHandler) as httpd:
            print("🚦 SEMÁFORO APP - SERVIDOR INICIADO")
            print("=" * 50)
            print(f"📱 Para instalar en tu móvil Android:")
            print(f"   1. Conecta tu móvil a la misma WiFi")
            print(f"   2. Abre Chrome en tu móvil")
            print(f"   3. Ve a: http://{local_ip}:{free_port}")
            print(f"   4. Menú → 'Instalar app'")
            print("=" * 50)
            print(f"🖥️  En este PC: http://localhost:{free_port}")
            print(f"📱 En móvil: http://{local_ip}:{free_port}")
            print("=" * 50)
            
            # Intentar generar código QR
            mobile_url = f"http://{local_ip}:{free_port}"
            print("📱 Código QR para móvil:")
            print_qr_code(mobile_url)
            print("=" * 50)
            
            print("⚡ Presiona Ctrl+C para detener el servidor")
            print("🔄 El servidor se reinicia automáticamente si cambias archivos")
            
            # Abrir navegador después de 2 segundos
            Timer(2.0, lambda: open_browser(free_port)).start()
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n✅ Servidor detenido correctamente")
                httpd.shutdown()
    except Exception as e:
        print(f"❌ Error al iniciar el servidor: {e}")
        input("Presiona Enter para salir...")
        exit(1)