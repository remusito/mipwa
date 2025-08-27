const http = require('http');
const { createCanvas } = require('canvas');

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fondo azul
    ctx.fillStyle = '#667eea';
    ctx.fillRect(0, 0, size, size);
    
    // Círculos del semáforo
    const centerX = size / 2;
    const circleRadius = size * 0.08;
    const spacing = size * 0.12;
    
    // Rojo
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(centerX, centerX - spacing, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Amarillo
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(centerX, centerX, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Verde
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(centerX, centerX + spacing, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
    
    return canvas.toBuffer('image/png');
}

const server = http.createServer((req, res) => {
    if (req.url === '/icon-192.png') {
        const icon = generateIcon(192);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': icon.length,
            'Cache-Control': 'public, max-age=86400'
        });
        res.end(icon);
    } else if (req.url === '/icon-512.png') {
        const icon = generateIcon(512);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': icon.length,
            'Cache-Control': 'public, max-age=86400'
        });
        res.end(icon);
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(8082, () => {
    console.log('Icon server running on port 8082');
});