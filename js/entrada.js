
// ==========================================
// MEGA ESTRUCTURAS - REGISTRAR ENTRADAS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const formEntrada = document.getElementById("formEntrada");
    const tablaEntradas = document.getElementById("tablaEntradas");
    const totalEntradas = document.getElementById("totalEntradas");

    const ENTRADAS_KEY = "mega_entradas";
    const INVENTARIO_KEY = "mega_inventario";

    function obtenerFechaActual() {

        const ahora = new Date();

        const anio = ahora.getFullYear();
        const mes = String(ahora.getMonth() + 1).padStart(2, "0");
        const dia = String(ahora.getDate()).padStart(2, "0");

        return `${anio}-${mes}-${dia}`;
    }

    function obtenerDatos(clave) {

        try {
            return JSON.parse(localStorage.getItem(clave)) || [];
        } catch (error) {
            return [];
        }
    }

    function guardarDatos(clave, datos) {
        localStorage.setItem(clave, JSON.stringify(datos));
    }

    // Mostrar historial
    function mostrarEntradas() {

        const entradas = obtenerDatos(ENTRADAS_KEY);

        tablaEntradas.innerHTML = "";

        totalEntradas.textContent =
            `${entradas.length} ${entradas.length === 1 ? "registro" : "registros"}`;

        if (entradas.length === 0) {

            const fila = document.createElement("tr");
            const celda = document.createElement("td");

            celda.colSpan = 6;
            celda.className = "empty-message";
            celda.textContent = "Todavía no hay entradas registradas.";

            fila.appendChild(celda);
            tablaEntradas.appendChild(fila);

            return;
        }

        entradas.slice().reverse().forEach(entrada => {

            const fila = document.createElement("tr");

            [
                entrada.fecha,
                entrada.codigo || "—",
                entrada.material,
                entrada.cantidad,
                entrada.unidad,
                entrada.proveedor || "—"
            ].forEach(valor => {

                const celda = document.createElement("td");
                celda.textContent = valor;
                fila.appendChild(celda);

            });

            tablaEntradas.appendChild(fila);

        });
    }

    // Actualizar las existencias
    function actualizarInventario(entrada) {

        const inventario = obtenerDatos(INVENTARIO_KEY);

        const codigo = entrada.codigo.toLowerCase().trim();
        const nombre = entrada.material.toLowerCase().trim();
        const categoria = entrada.categoria;

        let material = inventario.find(item => {

            if (codigo && item.codigo) {
                return item.codigo.toLowerCase() === codigo;
            }

            return (
                item.material.toLowerCase().trim() === nombre &&
                item.categoria === categoria
            );

        });

        // Crear material nuevo
        if (!material) {

            material = {
                codigo: entrada.codigo || `MAT-${Date.now()}`,
                categoria: entrada.categoria,
                material: entrada.material,
                cantidadAnotada: "—",
                unidadAnotada: "—",
                estado: "Confirmado",
                observaciones: "Material registrado mediante entrada.",
                stock: []
            };

            inventario.push(material);
        }

        if (!Array.isArray(material.stock)) {
            material.stock = [];
        }

        // Sumar solamente dentro de la misma unidad
        const stockExistente = material.stock.find(item =>
            item.unidad.toLowerCase() === entrada.unidad.toLowerCase()
        );

        if (stockExistente) {

            stockExistente.cantidad += entrada.cantidad;

        } else {

            material.stock.push({
                unidad: entrada.unidad,
                cantidad: entrada.cantidad
            });

        }

        material.estado = "Confirmado";

        guardarDatos(INVENTARIO_KEY, inventario);
    }

    // Registrar entrada
    formEntrada.addEventListener("submit", event => {

        event.preventDefault();

        const nuevaEntrada = {

            id: Date.now(),

            fecha: document.getElementById("fechaEntrada").value,

            codigo: document.getElementById("codigoMaterial").value.trim(),

            material: document.getElementById("nombreMaterial").value.trim(),

            categoria: document.getElementById("categoriaMaterial").value,

            cantidad: Number(document.getElementById("cantidadEntrada").value),

            unidad: document.getElementById("unidadEntrada").value,

            proveedor: document.getElementById("proveedorEntrada").value.trim(),

            responsable: document.getElementById("responsableEntrada").value.trim(),

            observaciones: document.getElementById("observacionesEntrada").value.trim()

        };

        if (
            !nuevaEntrada.fecha ||
            !nuevaEntrada.material ||
            !nuevaEntrada.categoria ||
            !nuevaEntrada.unidad ||
            !Number.isFinite(nuevaEntrada.cantidad) ||
            nuevaEntrada.cantidad <= 0
        ) {

            alert("Completa correctamente los campos obligatorios.");
            return;
        }

        try {

            const entradas = obtenerDatos(ENTRADAS_KEY);

            // Actualizar inventario y guardar movimiento
            actualizarInventario(nuevaEntrada);

            entradas.push(nuevaEntrada);

            guardarDatos(ENTRADAS_KEY, entradas);

            alert("Entrada registrada y existencias actualizadas correctamente.");

            formEntrada.reset();

            document.getElementById("fechaEntrada").value =
                obtenerFechaActual();

            mostrarEntradas();

        } catch (error) {

            console.error(error);

            alert("No se pudo guardar la entrada. Revisa el almacenamiento del navegador.");

        }

    });

    document.getElementById("fechaEntrada").value = obtenerFechaActual();

    mostrarEntradas();

});
