
// ==========================================
// MEGA ESTRUCTURAS - FLUJO DE MOVIMIENTOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "mega_registro_diario_v1";

    const selectorMes = document.getElementById("mesConsultar");
    const canvas = document.getElementById("graficoMovimientos");
    const tabla = document.getElementById("tablaFlujo");

    const totalMovimientos = document.getElementById("totalMovimientos");
    const diasActividad = document.getElementById("diasActividad");
    const maximoDiario = document.getElementById("maximoDiario");
    const fechaMaxima = document.getElementById("fechaMaxima");
    const tituloGrafico = document.getElementById("tituloGrafico");
    const totalTabla = document.getElementById("totalTablaFlujo");

    const contexto = canvas.getContext("2d");

    let datosGrafico = [];

    function obtenerRegistros() {

        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            console.error("Error leyendo registros:", error);
            return [];
        }

    }

    function formatoFecha(fecha) {

        const [anio, mes, dia] = fecha.split("-");

        return `${dia}/${mes}/${anio}`;

    }

    function obtenerDia(fecha) {

        const dias = [
            "domingo", "lunes", "martes", "miércoles",
            "jueves", "viernes", "sábado"
        ];

        const [anio, mes, dia] = fecha.split("-").map(Number);

        return dias[new Date(anio, mes - 1, dia).getDay()];

    }

    function crearCelda(fila, texto) {

        const celda = document.createElement("td");
        celda.textContent = texto;

        fila.appendChild(celda);

    }

    // Obtener todos los días del mes seleccionado
    function generarDatosMensuales(mesSeleccionado) {

        const [anio, mes] = mesSeleccionado.split("-").map(Number);

        const cantidadDias = new Date(anio, mes, 0).getDate();

        const registros = obtenerRegistros();

        const conteo = {};

        registros.forEach(registro => {

            if (registro.fecha.startsWith(mesSeleccionado)) {

                conteo[registro.fecha] =
                    (conteo[registro.fecha] || 0) + 1;

            }

        });

        const datos = [];

        for (let dia = 1; dia <= cantidadDias; dia++) {

            const fecha =
                `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

            datos.push({
                fecha,
                dia,
                nombreDia: obtenerDia(fecha),
                cantidad: conteo[fecha] || 0
            });

        }

        return datos;

    }

    // Dibujar gráfico de barras
    
function dibujarGrafico() {

    const ancho = canvas.clientWidth;
    const alto = canvas.clientHeight;

    if (!ancho || !alto) return;

    const escala = window.devicePixelRatio || 1;

    canvas.width = ancho * escala;
    canvas.height = alto * escala;

    contexto.setTransform(escala, 0, 0, escala, 0, 0);
    contexto.clearRect(0, 0, ancho, alto);

    const margen = {
        arriba: 25,
        abajo: 55,
        izquierda: 48,
        derecha: 18
    };

    const anchoGrafico = ancho - margen.izquierda - margen.derecha;
    const altoGrafico = alto - margen.arriba - margen.abajo;

    const maximo = Math.max(
        5,
        ...datosGrafico.map(dato => dato.cantidad)
    );

    const paso = Math.max(1, Math.ceil(maximo / 5));
    const maximoEscala = paso * 5;

    // CUADRÍCULA Y EJE VERTICAL
    contexto.font = "11px Arial";
    contexto.textAlign = "right";
    contexto.textBaseline = "middle";

    for (let i = 0; i <= 5; i++) {

        const valor = i * paso;

        const y = margen.arriba +
            altoGrafico -
            (valor / maximoEscala) * altoGrafico;

        contexto.beginPath();
        contexto.strokeStyle = "#e8e8e8";
        contexto.lineWidth = 1;

        contexto.moveTo(margen.izquierda, y);
        contexto.lineTo(ancho - margen.derecha, y);
        contexto.stroke();

        contexto.fillStyle = "#777";

        contexto.fillText(
            valor,
            margen.izquierda - 12,
            y
        );
    }

    // BARRAS: UNA POSICIÓN PARA CADA DÍA
    const espacio = anchoGrafico / datosGrafico.length;

    const anchoBarra = Math.max(
        3,
        Math.min(19, espacio * 0.62)
    );

    datosGrafico.forEach((dato, indice) => {

        const centroX =
            margen.izquierda + indice * espacio + espacio / 2;

        const altura =
            (dato.cantidad / maximoEscala) * altoGrafico;

        const y = margen.arriba + altoGrafico - altura;

        // Dibujar barra únicamente si hay movimientos
        if (dato.cantidad > 0) {

            const gradiente = contexto.createLinearGradient(
                0, y, 0, margen.arriba + altoGrafico
            );

            gradiente.addColorStop(0, "#ed343b");
            gradiente.addColorStop(1, "#b9151b");

            contexto.fillStyle = gradiente;

            contexto.fillRect(
                centroX - anchoBarra / 2,
                y,
                anchoBarra,
                altura
            );

            // Cantidad encima de la barra
            contexto.fillStyle = "#333";
            contexto.font = "bold 10px Arial";
            contexto.textAlign = "center";
            contexto.textBaseline = "bottom";

            contexto.fillText(
                dato.cantidad,
                centroX,
                y - 5
            );

        }

        // MOSTRAR TODOS LOS DÍAS, SIN OMITIR NINGUNO
        contexto.fillStyle = "#666";
        contexto.font = "9px Arial";
        contexto.textAlign = "center";
        contexto.textBaseline = "top";

        contexto.fillText(
            String(dato.dia).padStart(2, "0"),
            centroX,
            margen.arriba + altoGrafico + 12
        );

    });

    // LÍNEA BASE
    contexto.beginPath();
    contexto.strokeStyle = "#aaa";
    contexto.lineWidth = 1.2;

    contexto.moveTo(
        margen.izquierda,
        margen.arriba + altoGrafico
    );

    contexto.lineTo(
        ancho - margen.derecha,
        margen.arriba + altoGrafico
    );

    contexto.stroke();

}


    // Actualizar tabla e indicadores
    function actualizarFlujo() {

        const mes = selectorMes.value;

        if (!mes) return;

        datosGrafico = generarDatosMensuales(mes);

        tabla.innerHTML = "";

        let total = 0;
        let diasConActividad = 0;

        let mayor = null;

        datosGrafico.forEach(dato => {

            total += dato.cantidad;

            if (dato.cantidad > 0) {
                diasConActividad++;
            }

            if (!mayor || dato.cantidad > mayor.cantidad) {
                mayor = dato;
            }

            const fila = document.createElement("tr");

            crearCelda(fila, formatoFecha(dato.fecha));
            crearCelda(fila, dato.nombreDia);
            crearCelda(fila, dato.cantidad);

            tabla.appendChild(fila);

        });

        totalMovimientos.textContent = total;
        diasActividad.textContent = diasConActividad;

        maximoDiario.textContent = mayor ? mayor.cantidad : 0;

        fechaMaxima.textContent =
            mayor && mayor.cantidad > 0
                ? formatoFecha(mayor.fecha)
                : "Sin registros";

        totalTabla.textContent = total;

        const [anio, mesNumero] = mes.split("-").map(Number);

        const nombreMes = new Date(
            anio,
            mesNumero - 1,
            1
        ).toLocaleDateString("es-PE", {
            month: "long",
            year: "numeric"
        });

        tituloGrafico.textContent =
            `Movimientos de ${nombreMes}`;

        dibujarGrafico();

    }

    // Eventos
    selectorMes.addEventListener("change", actualizarFlujo);

    window.addEventListener("resize", dibujarGrafico);

    // Inicializar
    actualizarFlujo();

});
