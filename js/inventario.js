
 // ==========================================
 // MEGA ESTRUCTURAS - MÓDULO DE INVENTARIO
 // ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const tabla = document.getElementById("tablaInventario");
    const buscador = document.getElementById("buscarMaterial");
    const filtroCategoria = document.getElementById("filtrarCategoria");
    const filtroEstado = document.getElementById("filtrarEstado");
    const btnActualizar = document.getElementById("btnActualizar");

    const totalMateriales = document.getElementById("totalMateriales");
    const materialesConfirmados = document.getElementById("materialesConfirmados");
    const materialesPendientes = document.getElementById("materialesPendientes");

    const STORAGE_KEY = "mega_inventario";

    // Cargar inventario inicial desde el HTML
    function obtenerInventario() {

        const guardado = localStorage.getItem(STORAGE_KEY);

        if (guardado) {
            try {
                return JSON.parse(guardado);
            } catch (error) {
                console.error("Error leyendo inventario:", error);
            }
        }

        const materiales = Array.from(tabla.querySelectorAll("tr"))
            .filter(fila => fila.cells.length === 7)
            .map(fila => {

                const cantidad = fila.cells[3].textContent.trim();
                const unidad = fila.cells[4].textContent.trim();
                const estado = fila.cells[5].textContent.trim();

                let stock = [];

                // Conservar las cantidades mixtas
                if (cantidad === "5 paquetes + 7 unidades") {
                    stock = [
                        { unidad: "Paquetes", cantidad: 5 },
                        { unidad: "Unidades", cantidad: 7 }
                    ];
                } else if (
                    cantidad !== "—" &&
                    !isNaN(Number(cantidad)) &&
                    unidad !== "—" &&
                    unidad !== "Mixto"
                ) {
                    stock = [
                        { unidad, cantidad: Number(cantidad) }
                    ];
                }

                return {
                    codigo: fila.cells[0].textContent.trim(),
                    categoria: fila.cells[1].textContent.trim(),
                    material: fila.cells[2].textContent.trim(),
                    cantidadAnotada: cantidad,
                    unidadAnotada: unidad,
                    estado,
                    observaciones: fila.cells[6].textContent.trim(),
                    stock
                };
            });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(materiales));

        return materiales;
    }

    // Guardar inventario
    function guardarInventario(materiales) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(materiales));
    }

    // Mostrar stock sin mezclar unidades
    function mostrarStock(stock) {

        if (!stock || stock.length === 0) {
            return "Sin existencias confirmadas";
        }

        return stock.map(item =>
            `${item.cantidad} ${item.unidad.toLowerCase()}`
        ).join(" + ");
    }

    // Actualizar tabla
    function mostrarInventario() {

        const materiales = obtenerInventario();

        tabla.innerHTML = "";

        materiales.forEach(material => {

            const fila = document.createElement("tr");

            const valores = [
                material.codigo || "—",
                material.categoria,
                material.material,
                material.cantidadAnotada || "—",
                material.unidadAnotada || "—",
                mostrarStock(material.stock),
                material.estado,
                material.observaciones || "—"
            ];

            valores.forEach((valor, indice) => {

                const celda = document.createElement("td");

                if (indice === 6) {

                    const estado = document.createElement("span");

                    estado.className =
                        material.estado === "Confirmado"
                            ? "status-confirmed"
                            : material.estado === "Mixto"
                                ? "status-mixed"
                                : "status-pending";

                    estado.textContent = material.estado;

                    celda.appendChild(estado);

                } else {
                    celda.textContent = valor;
                }

                fila.appendChild(celda);

            });

            tabla.appendChild(fila);

        });

        actualizarIndicadores(materiales);
        cargarCategorias(materiales);
        filtrarMateriales();
    }

    // Indicadores
    function actualizarIndicadores(materiales) {

        const confirmados = materiales.filter(material =>
            material.estado === "Confirmado"
        );

        const pendientes = materiales.filter(material =>
            material.estado === "Por confirmar"
        );

        totalMateriales.textContent = materiales.length;
        materialesConfirmados.textContent = confirmados.length;
        materialesPendientes.textContent = pendientes.length;
    }

    // Categorías
    function cargarCategorias(materiales) {

        const categoriaActual = filtroCategoria.value;

        const categorias = [...new Set(
            materiales.map(material => material.categoria)
        )];

        filtroCategoria.innerHTML =
            '<option value="">Todas las categorías</option>';

        categorias.forEach(categoria => {

            const opcion = document.createElement("option");

            opcion.value = categoria;
            opcion.textContent = categoria;

            filtroCategoria.appendChild(opcion);

        });

        filtroCategoria.value = categoriaActual;
    }

    // Buscar y filtrar
    function filtrarMateriales() {

        const texto = buscador.value.toLowerCase().trim();
        const categoria = filtroCategoria.value;
        const estado = filtroEstado.value;

        Array.from(tabla.querySelectorAll("tr")).forEach(fila => {

            const codigo = fila.cells[0].textContent.toLowerCase();
            const nombre = fila.cells[2].textContent.toLowerCase();
            const categoriaFila = fila.cells[1].textContent.trim();
            const estadoFila = fila.cells[6].textContent.trim();

            const coincideTexto =
                codigo.includes(texto) || nombre.includes(texto);

            const coincideCategoria =
                !categoria || categoriaFila === categoria;

            const coincideEstado =
                !estado || estadoFila === estado;

            fila.style.display =
                coincideTexto && coincideCategoria && coincideEstado
                    ? ""
                    : "none";

        });
    }

    // Eventos
    buscador.addEventListener("input", filtrarMateriales);
    filtroCategoria.addEventListener("change", filtrarMateriales);
    filtroEstado.addEventListener("change", filtrarMateriales);

    btnActualizar.addEventListener("click", () => {

        buscador.value = "";
        filtroCategoria.value = "";
        filtroEstado.value = "";

        mostrarInventario();

    });

    // Inicializar
    mostrarInventario();

});
