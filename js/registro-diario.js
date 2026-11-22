
// ==========================================
// MEGA ESTRUCTURAS - REGISTRO DIARIO
// Datos originales del Excel: 91 registros
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const STORAGE_KEY = "mega_registro_diario_v1";

    const datosExcel = [
        ["2026-11-07","Sábado","11:42 a. m.","Visita / servicio","Carlos Huón","Llegó un carro para colocar silicona en los costados de un furgón chico."],
        ["2026-11-07","Sábado","11:42 a. m.","Recepción de material","No indicado","Se recibieron 2 cilindros."],
        ["2026-11-09","Lunes","No indicado","Visita / mantenimiento","Señor Chaucha","Vino para darle un mantenimiento a una carroceria de camión"],
        ["2026-11-09","Lunes","No indicado","Visita / cotización","Luis Alonso; recomendado por Abel Anhuasco (su primo)","Solicita cotización para un furgón de 7 toneladas."],
        ["2026-11-09","Lunes","No indicado","Recepción / entrega","No indicado","Vinieron a dejar los bidones de agua."],
        ["2026-11-09","Lunes","12:36 p. m.","Visita","Empresa de enfrente","Vinieron personas de la empresa ubicada al frente."],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Francisco ","Entrega de guantes blancos."],
        ["2026-11-10","Martes","No indicado","Visita / repuesto","No indicado","Llegó un jebe de puerta y “zapatos de pasamano”."],
        ["2026-11-10","Martes","No indicado","Observación de stock","No indicado","Se anotó falta de disco escareador"],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Jesús Peto","Entrega de tapa oído."],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Jesús ","Entrega de guantes blancos"],
        ["2026-11-10","Martes","9:50 a. m.","Recojo de vehículo","Empresa Kalpa","Llegaron a recoger una furgoneta que había ingresado por mantenimiento."],
        ["2026-11-10","Martes","10:18 a. m.","Entrega / movimiento","No indicado","Se registraron 2 botellas de mezcla."],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Víctor Silva","Entrega de guantes blancos."],
        ["2026-11-10","Martes","10:53 a. m.","Visita / recojo de vehículo","Personas de Puente Piedra; empresa de alimentos generales","Llegaron para recoger un camión y darle mantenimiento al termostín"],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Sebastián","Entrega de guantes blancos."],
        ["2026-11-10","Martes","No indicado","Recepción de material","No indicado","Llegó material Poxica 37 con su diluyente y thinner Índigo 21"],
        ["2026-11-10","Martes","No indicado","Entrega de EPP","Armengol","Entrega de guantes blancos y lentes transparentes."],
        ["2026-11-11","Miércoles","No indicado","Entrega de EPP","Toño","Entrega de lentes negros."],
        ["2026-11-11","Miércoles","No indicado","Recepción / visita","No indicado","Llegó material de ambulancia."],
        ["2026-11-11","Miércoles","No indicado","Observación de stock","No indicado","falta lija de 2000"],
        ["2026-11-11","Miércoles","12:40 p.m","Recepción de material","No indicado","Llegó 1 plancha delgada y tubos galvanizados rectangular 7; también 10 planchas / tubos galvanizados redondo 20"],
        ["2026-11-11","Miércoles","3:10 p. m.","Recepción de material","No indicado","Llegaron 10 kilos de soldadura de acero."],
        ["2026-11-11","Miércoles","No indicado","Observación de stock","No indicado","Se anotó que faltan hojas para sierra."],
        ["2026-11-11","Miércoles","3:20 p. m.","Recojo de vehículo","Jesús Medrano","Vino a recoger su vehículo “3.5” (vino buscando a Javier)."],
        ["2026-11-11","Miércoles","3:55 p. m.","Recojo de material","Gálvez Bruce ","Llegaron a recoger 2 bolsas de suspensión."],
        ["2026-11-11","Miércoles","4:23 p. m.","Visita","Dos personas (sin identificar)","Vinieron 2 chicas."],
        ["2026-11-11","Miércoles","No indicado","Recepción de material","Empresa JN","Dejó 50 planchas."],
        ["2026-11-12","Jueves","No indicado","Entrega de EPP / material","Marlón","Máscara kit para pintar."],
        ["2026-11-12","Jueves","No indicado","Entrega de EPP","Jhoney","Entrega de guantes blancos."],
        ["2026-11-12","Jueves","7:58 a. m.","Recojo de material","No indicado","Vinieron a recoger planchas al doblador"],
        ["2026-11-12","Jueves","No indicado","Entrega de EPP","Orlando","Entrega de guantes plomos."],
        ["2026-11-12","Jueves","No indicado","Entrega de EPP","Jair","Entrega de guantes plomos."],
        ["2026-11-12","Jueves","9:01 a. m.","Visita / servicio","Empresa Chapi","Vinieron para que coloquen riel."],
        ["2026-11-12","Jueves","No indicado","Visita / mantenimiento","Empresa Kalpa","Vinieron para darle mantenimiento a un furgón."],
        ["2026-11-12","Jueves","No indicado","Entrega de herramienta","Sebastián","Entrega de pistola para soplete."],
        ["2026-11-12","Jueves","11:15 a.m","Recepción de material","Aceros Arequipa","Llegaron 6 tubos galvanizados de 6 metros."],
        ["2026-11-12","Jueves","12:40 p. m. ","Recepción de material","Aceros Arequipa","Llegó tubos galbanizados rectangular (1.5 *  2.5 * 5 * 6) 48; tubo galbanizado cuadrado 5; tubo galbanizado rectangular (2 * 4 * 8 *6) 12; tubo galbanizado redondo 50."],
        ["2026-11-12","Jueves","1:40 p.m","Recepción de material","Aceros Arequipa","Llegaron 3 planchas."],
        ["2026-11-12","Jueves","2:40 p. m.","Préstamo / salida de herramienta","Jair","Se llevaron una llave de taladro y dado para autoperforante"],
        ["2026-11-12","Jueves","No indicado","Salida / préstamo de material","Córdova","Llevó una puntilla y un disco de amoladora "],
        ["2026-11-12","Jueves","No indicado","Recepción de material","No indicado","Pintura:  verde 30; aluminio fino 4; azul electrico 3; azul naval 4; azul ultramar 4; rojo bermellón 4; rojo oxido 8."],
        ["2026-11-13","Viernes","No indicado","Entrega de EPP","Samir","Entrega de tapa oído."],
        ["2026-11-13","Viernes","No indicado","Entrega de EPP","Víctor","Entrega de tapa oído."],
        ["2026-11-13","Viernes","No indicado","Entrega de EPP","Jonathan","Entrega de guantes blancos."],
        ["2026-11-13","Viernes","9:20 a. m.","Recojo de vehículo","Empresa Kalpa","Vinieron a recoger un carro H-100 "],
        ["2026-11-13","Viernes","No indicado","Entrega de EPP","No indicado","Entrega de tapa oído."],
        ["2026-11-13","Viernes","12:00 p. m.","Recojo de material","Empresa Kukuyá ","Vinieron a recoger una plancha."],
        ["2026-11-13","Viernes","No indicado","Préstamo / salida de herramienta","Victor","Prestamo de broca grande"],
        ["2026-11-13","Viernes","No indicado","Visita / cotización","Raul","Cotizar un camión para hacer un eje retractil (vino en dia de ayer)"],
        ["2026-11-13","Viernes","No indicado","Préstamo / salida de herramienta","victor","entrega de huincha para pasa cable"],
        ["2026-11-13","Viernes","4:52 p.m","Recepción de material","Aceros Arequipa","Legó 1 plancha"],
        ["2026-11-14","Sábado","8:20 a.m","Visita / servicio","Jesús","Vino para que le modifiquen una carrocería (indica que vino ayer)"],
        ["2026-11-14","Sábado","No indicado","Entrega de EPP","Elias","entrega de guantes blancos"],
        ["2026-11-14","Sábado","No indicado","Préstamo / salida de herramienta","Armengol","se llevo el dado para autoperforante"],
        ["2026-11-14","Sábado","No indicado","Devolución de material","Cordova","devolvió los 2 discos de madera"],
        ["2026-11-14","Sábado","No indicado","Observación de stock","No indicado","falta cintillo 4*8"],
        ["2026-11-14","Sábado","11:50 a.m","Préstamo / salida de herramienta","Cordova (toño)","prestamo de disco para madera"],
        ["2026-11-16","Lunes","No indicado","Entrega de EPP","Jhoney","entrega de lentes transparentes"],
        ["2026-11-16","Lunes","No indicado","Entrega de EPP","cristian(bancho)","entrega de guantes rojos"],
        ["2026-11-16","Lunes","No indicado","Observación de stock","No indicado","falta bisagra de acero"],
        ["2026-11-16","Lunes","No indicado","Préstamo / salida de herramienta","Victor","entrega de llave de taladro"],
        ["2026-11-16","Lunes","9:28 a.m","Visita / cotización","Benancio (recomendado por agustín)","vino para cotizar una furgón H-100"],
        ["2026-11-16","Lunes","No indicado","Préstamo / salida de herramienta","Jair","Entrega de la broca mas grande"],
        ["2026-11-16","Lunes","No indicado","Entrega de EPP","Kevin","Entrega de guantes rojos"],
        ["2026-11-16","Lunes","No indicado","Préstamo / salida de herramienta","Cristian (ambulancia)","entrega de broca de 35 mm y su guia"],
        ["2026-11-17","Martes","No indicado","Entrega de EPP","Orlando","Entrega de tapa oído."],
        ["2026-11-17","Martes","10:50 a.m","Recepción de material","No indicado","llego visagra mariposa"],
        ["2026-11-17","Martes","11:20 a.m","Recepción de material","ELCOPE","llegó cables: rojos 5 ; negro 5; azul 5; verde 5; amarillo 5; blanco 5."],
        ["2026-11-17","Martes","2:58 p.m","Visita / servicio","Polioretano Peru","vino para su revisión de rampa"],
        ["2026-11-17","Martes","4:00 p.m","Recepción de material","Indigo Química","llegó pintura: negro 100; blanco 80"],
        ["2026-11-17","Martes","No indicado","Entrega de EPP","Gerly","Entrega de lentes negros."],
        ["2026-11-17","Martes","17:32 p.m","Devolución de material","Armengol","devolvió el dado para el autoperforante"],
        ["2026-11-17","Martes","No indicado","Devolución de material","Cristian (ambulancia)","devolvió la broca de 35 mm y su guía"],
        ["2026-11-17","Martes","17:42 p.m","Recepción de material","No indicado","Llegó un rollo de piso para ambulancia"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Erick","entrega de tapa oido"],
        ["2026-11-18","Miercoles","8:25 a.m","Recepción de material","Aceros Arequipa","llegó 30 planchas"],
        ["2026-11-18","Miercoles","No indicado","Préstamo / salida de herramienta","Alan","entrega de disco de madera"],
        ["2026-11-18","Miercoles","No indicado","Devolución de material","Alan","devolvió el disco de madera"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Nando","entrega de huincha de 5 metros"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Jhoney","entrega de guantes rojos"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Kevin","entrega de lentes negros"],
        ["2026-11-18","Miercoles","10:18 a.m","Visita / mantenimiento","Magallanes","vino para instalación de una puerta"],
        ["2026-11-18","Miercoles","No indicado","Préstamo / salida de herramienta","victor","entrega de sacabocado de 25 mm"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Cristian (ambulancia)","entrega de guantes blancos"],
        ["2026-11-18","Miercoles","11:15 a.m","Recepción de material","No indicado","llegaron 30 bidones de agua y el dispensador"],
        ["2026-11-18","Miercoles","12:30 p.m","Recepción de material","Aceros Arequipa","llegó tubo galbanizado rectangular (2.0 * 4.0 * 8.0 * 6 m) 10; plancha delgada 20; tubo galbanizado cuadrado 55; tubo galvabizado rectangular (1.5 * 2.5 * 5 * 6)  9; plancha (3.9 * 1.20 m * 2.40 m) 11; plancha (4.5 * 1.50 m * 3 m) 5 "],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Harly","entrega de guantes rojos"],
        ["2026-11-18","Miercoles","No indicado","Recepción de material","No indicado","llegó thinner extra Oro 30"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Huasco","entrega de guantes blancos"],
        ["2026-11-18","Miercoles","No indicado","Entrega de EPP","Erick","entrega de lentes transparentes"]
    ];

    // Cargar datos iniciales solo una vez
    function obtenerRegistros() {

        const guardados = localStorage.getItem(STORAGE_KEY);

        if (guardados) {
            try {
                return JSON.parse(guardados);
            } catch (error) {
                console.error("Error leyendo registros:", error);
            }
        }

        const iniciales = datosExcel.map((fila, indice) => ({
            id: `EXCEL-${indice + 1}`,
            fecha: fila[0],
            dia: fila[1],
            hora: fila[2],
            tipo: fila[3],
            persona: fila[4],
            detalle: fila[5]
        }));

        localStorage.setItem(STORAGE_KEY, JSON.stringify(iniciales));

        return iniciales;
    }

    function guardarRegistros(registros) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registros));
    }

    function obtenerDia(fecha) {

        const dias = [
            "Domingo", "Lunes", "Martes", "Miércoles",
            "Jueves", "Viernes", "Sábado"
        ];

        const [anio, mes, dia] = fecha.split("-").map(Number);

        return dias[new Date(anio, mes - 1, dia).getDay()];
    }

    function formatoFecha(fecha) {

        const [anio, mes, dia] = fecha.split("-");

        return `${dia}/${mes}/${anio}`;
    }

    const tabla = document.getElementById("tablaRegistros");
    const buscador = document.getElementById("buscarRegistro");
    const filtroFecha = document.getElementById("filtrarFecha");
    const filtroTipo = document.getElementById("filtrarTipo");

    const totalRegistros = document.getElementById("totalRegistros");
    const fechaInicial = document.getElementById("fechaInicial");
    const fechaFinal = document.getElementById("fechaFinal");
    const registrosVisibles = document.getElementById("registrosVisibles");

    const modal = document.getElementById("modalRegistro");
    const form = document.getElementById("formRegistro");

    function cargarTipos(registros) {

        const seleccionActual = filtroTipo.value;
        const tipos = [...new Set(registros.map(r => r.tipo))];

        filtroTipo.innerHTML =
            '<option value="">Todos los movimientos</option>';

        tipos.forEach(tipo => {

            const opcion = document.createElement("option");
            opcion.value = tipo;
            opcion.textContent = tipo;

            filtroTipo.appendChild(opcion);

        });

        filtroTipo.value = seleccionActual;

        const datalist = document.getElementById("tiposMovimiento");
        datalist.innerHTML = "";

        tipos.forEach(tipo => {

            const opcion = document.createElement("option");
            opcion.value = tipo;
            datalist.appendChild(opcion);

        });
    }

    function crearCelda(fila, texto) {

        const celda = document.createElement("td");
        celda.textContent = texto || "";
        fila.appendChild(celda);

    }

    function mostrarRegistros() {

        const registros = obtenerRegistros();

        const texto = buscador.value.toLowerCase().trim();
        const fecha = filtroFecha.value;
        const tipo = filtroTipo.value;

        const filtrados = registros.filter(registro => {

            const contenido = [
                registro.fecha,
                registro.dia,
                registro.hora,
                registro.tipo,
                registro.persona,
                registro.detalle
            ].join(" ").toLowerCase();

            return (
                contenido.includes(texto) &&
                (!fecha || registro.fecha === fecha) &&
                (!tipo || registro.tipo === tipo)
            );

        });

        tabla.innerHTML = "";

        filtrados.forEach(registro => {

            const fila = document.createElement("tr");

            crearCelda(fila, formatoFecha(registro.fecha));
            crearCelda(fila, registro.dia);
            crearCelda(fila, registro.hora);
            crearCelda(fila, registro.tipo);
            crearCelda(fila, registro.persona);
            crearCelda(fila, registro.detalle);

            tabla.appendChild(fila);

        });

        if (filtrados.length === 0) {

            const fila = document.createElement("tr");
            const celda = document.createElement("td");

            celda.colSpan = 6;
            celda.textContent = "No se encontraron registros.";
            celda.className = "empty-message";

            fila.appendChild(celda);
            tabla.appendChild(fila);

        }

        totalRegistros.textContent = registros.length;

        registrosVisibles.textContent =
            `${filtrados.length} de ${registros.length} registros`;

        const fechas = registros.map(r => r.fecha).sort();

        fechaInicial.textContent =
            fechas.length ? formatoFecha(fechas[0]) : "—";

        fechaFinal.textContent =
            fechas.length ? formatoFecha(fechas[fechas.length - 1]) : "—";

        cargarTipos(registros);

    }

    // Abrir y cerrar formulario
    function abrirModal() {
        modal.classList.add("show");
        document.getElementById("nuevaFecha").value =
            new Date().toLocaleDateString("en-CA");
    }

    function cerrarModal() {
        modal.classList.remove("show");
        form.reset();
    }

    document.getElementById("btnNuevoRegistro")
        .addEventListener("click", abrirModal);

    document.getElementById("btnCerrarModal")
        .addEventListener("click", cerrarModal);

    document.getElementById("btnCancelar")
        .addEventListener("click", cerrarModal);

    modal.addEventListener("click", event => {
        if (event.target === modal) cerrarModal();
    });

    // Guardar nuevo registro
    form.addEventListener("submit", event => {

        event.preventDefault();

        const fecha = document.getElementById("nuevaFecha").value;
        const horaValor = document.getElementById("nuevaHora").value;

        const nuevo = {

            id: `NUEVO-${Date.now()}`,
            fecha,
            dia: obtenerDia(fecha),
            hora: horaValor
                ? new Date(`2000-01-01T${horaValor}`)
                    .toLocaleTimeString("es-PE", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true
                    })
                : "No indicado",

            tipo: document.getElementById("nuevoTipo").value.trim(),

            persona: document.getElementById("nuevaPersona").value.trim()
                || "No indicado",

            detalle: document.getElementById("nuevoDetalle").value.trim()

        };

        const registros = obtenerRegistros();

        registros.push(nuevo);

        guardarRegistros(registros);

        cerrarModal();
        mostrarRegistros();

        alert("Registro guardado correctamente.");

    });

    // Filtros
    buscador.addEventListener("input", mostrarRegistros);
    filtroFecha.addEventListener("change", mostrarRegistros);
    filtroTipo.addEventListener("change", mostrarRegistros);

    document.getElementById("btnLimpiarFiltros")
        .addEventListener("click", () => {

            buscador.value = "";
            filtroFecha.value = "";
            filtroTipo.value = "";

            mostrarRegistros();

        });

    // Inicializar
    mostrarRegistros();

});
