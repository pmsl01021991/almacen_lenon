
// ==========================================
// MEGA ESTRUCTURAS - DASHBOARD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // Elementos principales
    const pageTitle = document.querySelector(".topbar h1");
    const welcomeTitle = document.querySelector(".welcome-section h2");
    const welcomeDescription = document.querySelector(".welcome-section p");

    // Información del Dashboard
    const dashboard = {
        title: "Control de almacén",
        description: "Administra las existencias, registra entregas y consulta los movimientos del almacén."
    };

    // Actualizar Dashboard
    if (pageTitle && welcomeTitle && welcomeDescription) {
        pageTitle.textContent = "Dashboard";
        welcomeTitle.textContent = dashboard.title;
        welcomeDescription.textContent = dashboard.description;
    }

    // Botones de acceso rápido
    const quickButtons = document.querySelectorAll(".quick-button");

    quickButtons.forEach(button => {
        button.addEventListener("click", () => {

            const buttonText = button.textContent.trim().toLowerCase();

            if (buttonText.includes("inventario")) {
                window.location.href = "inventario.html";
            }

            if (buttonText.includes("entrada")) {
                window.location.href = "entrada.html";
            }

        });
    });

});
