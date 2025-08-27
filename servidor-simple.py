#!/usr/bin/env python3
"""
Servidor HTTP simple para Semáforo App
Versión simplificada que encuentra automáticamente un puerto libre
"""
import http.server
import socketserver
import os
import webbrowser
import socket
from threading import Timer

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

def get_local_ip():
    """Obtener la IP local"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

if __name__ == "__main__":
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Encontrar puerto libre
    port = find_free_port()
    if not port:
        print("❌ No se pudo encontrar un puerto libre")
        input("Presiona Enter para salir...")
        exit(1)
    
    # Obtener IP local
    local_ip = get_local_ip()
    
    # Crear servidor
    Handler = http.server.SimpleHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), Handler) as httpd:
            print(f"🚦 Servidor iniciado en puerto {port}")
            print(f"🖥️  PC: http://localhost:{port}")
            print(f"📱 Móvil: http://{local_ip}:{port}")
            print("⚡ Presiona Ctrl+C para detener")
            
            # Abrir navegador
            Timer(1.0, lambda: webbrowser.open(f'http://localhost:{port}')).start()
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✅ Servidor detenido")
    except Exception as e:
        print(f"❌ Error: {e}")
        input("Presiona Enter para salir...")