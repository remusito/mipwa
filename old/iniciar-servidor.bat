@echo off
title Semaforo App - Servidor
color 0A

echo.
echo  ========================================
echo   🚦 SEMAFORO APP - INICIANDO SERVIDOR
echo  ========================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no está instalado o no está en el PATH
    echo 💡 Descarga Python desde: https://python.org
    pause
    exit /b 1
)

REM Cambiar al directorio del script
cd /d "%~dp0"

echo ✅ Python encontrado
echo 🚀 Iniciando servidor...
echo.

REM Ejecutar el servidor
python server.py

echo.
echo 🛑 Servidor detenido
pause