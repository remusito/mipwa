@echo off
title Semaforo App - Servidor Simple
color 0A

echo.
echo  ========================================
echo   🚦 SEMAFORO APP - SERVIDOR SIMPLE
echo  ========================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no encontrado
    echo 💡 Descarga desde: https://python.org
    pause
    exit /b 1
)

echo ✅ Iniciando servidor...
echo.

REM Ejecutar servidor simple
python servidor-simple.py

echo.
pause