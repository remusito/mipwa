document.addEventListener('DOMContentLoaded', () => {
    const dateInputs = document.querySelectorAll('.date-input');
    const summaryFilterEl = document.getElementById('summary-next-filter');
    const summaryDateEl = document.getElementById('summary-next-date');

    // --- Funciones Principales ---

    /**
     * Carga las fechas guardadas desde localStorage al iniciar.
     */
    function loadDates() {
        dateInputs.forEach(input => {
            const savedDate = localStorage.getItem(input.id);
            if (savedDate) {
                input.value = savedDate;
            }
        });
        // Una vez cargadas todas las fechas, validar y actualizar resumen
        validateAllInputs();
        updateSummary();
    }

    /**
     * Guarda una fecha en localStorage.
     * @param {string} id - El ID del input.
     * @param {string} value - El valor de la fecha.
     */
    function saveDate(id, value) {
        localStorage.setItem(id, value);
    }

    /**
     * Valida un campo de fecha individual y muestra/oculta mensajes de error.
     * @param {HTMLInputElement} input - El campo de input a validar.
     */
    function validateInput(input) {
        const section = input.closest('.filter-section');
        const lastDateInput = section.querySelector('[data-type="last"]');
        const nextDateInput = section.querySelector('[data-type="next"]');
        const validationMessage = input.nextElementSibling;

        const lastDate = new Date(lastDateInput.value);
        const nextDate = new Date(nextDateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalizar a medianoche para comparaciones justas

        let isValid = true;
        let message = '';

        // Limpiar estado previo
        input.classList.remove('invalid');
        validationMessage.textContent = '';

        if (input.dataset.type === 'last' && lastDateInput.value && lastDate > today) {
            isValid = false;
            message = 'La fecha no puede ser futura.';
        } else if (input.dataset.type === 'next' && nextDateInput.value && nextDate < today) {
            isValid = false;
            message = 'La fecha no puede ser pasada.';
        } else if (lastDateInput.value && nextDateInput.value && nextDate < lastDate) {
            isValid = false;
            message = 'Debe ser posterior al último cambio.';
            // Marcar ambos campos como inválidos en este caso
            nextDateInput.classList.add('invalid');
            nextDateInput.nextElementSibling.textContent = message;
        }

        if (!isValid) {
            input.classList.add('invalid');
            validationMessage.textContent = message;
        }

        return isValid;
    }

    /**
     * Ejecuta la validación para todos los campos.
     */
    function validateAllInputs() {
        dateInputs.forEach(input => validateInput(input));
    }

    /**
     * Actualiza la sección de resumen con el próximo cambio más urgente.
     */
    function updateSummary() {
        let upcomingChanges = [];

        document.querySelectorAll('.filter-section').forEach(section => {
            const nextDateInput = section.querySelector('[data-type="next"]');
            const filterName = section.dataset.filterName;

            if (nextDateInput.value && !nextDateInput.classList.contains('invalid')) {
                upcomingChanges.push({
                    name: filterName,
                    date: new Date(nextDateInput.value),
                    dateString: nextDateInput.value
                });
            }
        });

        if (upcomingChanges.length > 0) {
            // Ordenar para encontrar la fecha más cercana al día de hoy
            upcomingChanges.sort((a, b) => a.date - b.date);

            const nextChange = upcomingChanges[0];
            summaryFilterEl.textContent = nextChange.name;
            summaryDateEl.textContent = new Date(nextChange.dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        } else {
            summaryFilterEl.textContent = '--';
            summaryDateEl.textContent = 'Sin cambios próximos';
        }
    }


    // --- Event Listeners ---

    dateInputs.forEach(input => {
        input.addEventListener('change', () => {
            // Guardar la fecha cambiada
            saveDate(input.id, input.value);

            // Validar todos los campos y actualizar el resumen
            validateAllInputs();
            updateSummary();
        });
    });

    // --- Inicialización ---
    loadDates();
});