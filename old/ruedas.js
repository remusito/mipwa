document.addEventListener('DOMContentLoaded', () => {
    const wheels = document.querySelectorAll('.wheel-selector');

    wheels.forEach(wheel => {
        wheel.addEventListener('click', () => {
            wheel.classList.toggle('selected');
        });
    });
});