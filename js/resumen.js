
// ==========================================
// MEGA ESTRUCTURAS - MÓDULO RESUMEN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "mega_registro_diario_v1";

    const fechaInicialInput =
        document.getElementById("fechaInicialResumen");

    const fechaFinalInput =
        document.getElementById("fechaFinalResumen");

    const btnActualizar =
        document.getElementById("btnActualizarResumen");

    const tabla =
        document.getElementById("tablaResumen");

    const totalPeriodo =
        document.getElementById("totalPeriodo");

    const totalTabla =
        document.getElementById("totalTabla");

    const textoPeriodo =
        document.getElementById("textoPeriodo");

    const cantidadDias =
        document.getElementById("cantidadDias");

    // Leer registros del Registro Diario
    function obtenerRegistros() {

        try {

            return JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];

        } catch (error) {

            console.error("Error leyendo registros:", error);
            return [];

        }

    }

    // Formatear fecha para mostrar
    function formatoFecha(fecha) {

        const [anio, mes, dia] = fecha.split("-");

        return `${dia}/${mes}/${anio}`;

    }

    // Obtener día de la semana
    function obtenerDia(fecha) {

        const dias = [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado"
        ];

        const [anio, mes, dia] = fecha.split("-").map(Number);

        return dias[new Date(anio, mes - 1, dia).getDay()];

    }

    // Generar fechas entre dos fechas, incluyendo ambas
    function generarFechas(inicio, fin) {

        const fechas = [];

        const [anioInicio, mesInicio, diaInicio] =
            inicio.split("-").map(Number);

        const [anioFin, mesFin, diaFin] =
            fin.split("-").map(Number);

        const fechaActual = new Date(
            anioInicio, mesInicio - 1, diaInicio
        );

        const fechaFinal = new Date(
            anioFin, mesFin - 1, diaFin
        );

        while (fechaActual <= fechaFinal) {

            const anio = fechaActual.getFullYear();
            const mes = String(
                fechaActual.getMonth() + 1
            ).padStart(2, "0");

            const dia = String(
                fechaActual.getDate()
            ).padStart(2, "0");

            fechas.push(`${anio}-${mes}-${dia}`);

            fechaActual.setDate(fechaActual.getDate() + 1);

        }

        return fechas;

    }

    // Crear celda
    function agregarCelda(fila, contenido) {

        const celda = document.createElement("td");

        celda.textContent = contenido;

        fila.appendChild(celda);

    }

    // Actualizar resumen
    function actualizarResumen() {

        const registros = obtenerRegistros();

        const inicio = fechaInicialInput.value;
        const fin = fechaFinalInput.value;

        tabla.innerHTML = "";

        if (!inicio || !fin) {

            alert("Selecciona ambas fechas.");
            return;

        }

        if (inicio > fin) {

            alert("La fecha inicial no puede ser posterior a la fecha final.");
            return;

        }

        // Contar registros por fecha
        const conteo = {};

        registros.forEach(registro => {

            if (registro.fecha >= inicio && registro.fecha <= fin) {

                conteo[registro.fecha] =
                    (conteo[registro.fecha] || 0) + 1;

            }

        });

        // Crear tabla diaria, incluyendo días sin movimientos
        const fechas = generarFechas(inicio, fin);

        let total = 0;

        fechas.forEach(fecha => {

            const cantidad = conteo[fecha] || 0;

            total += cantidad;

            const fila = document.createElement("tr");

            agregarCelda(fila, formatoFecha(fecha));
            agregarCelda(fila, obtenerDia(fecha));
            agregarCelda(fila, cantidad);

            tabla.appendChild(fila);

        });

        // Actualizar indicadores
        totalPeriodo.textContent = total;
        totalTabla.textContent = total;

        textoPeriodo.textContent =
            `${formatoFecha(inicio)} al ${formatoFecha(fin)}`;

        cantidadDias.textContent =
            `${fechas.length} ${fechas.length === 1 ? "día" : "días"}`;

    }

    // Establecer fecha final según el último registro
    function inicializarFechas() {

        const registros = obtenerRegistros();

        if (registros.length > 0) {

            const fechas = registros
                .map(registro => registro.fecha)
                .filter(Boolean)
                .sort();

            fechaFinalInput.value = fechas[fechas.length - 1];

        } else {

            fechaFinalInput.value = fechaInicialInput.value;

        }

    }

    // Eventos
    btnActualizar.addEventListener("click", actualizarResumen);

    fechaInicialInput.addEventListener("change", actualizarResumen);

    fechaFinalInput.addEventListener("change", actualizarResumen);

    // Inicializar
    inicializarFechas();
    actualizarResumen();

});
