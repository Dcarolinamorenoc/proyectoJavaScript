document.addEventListener("DOMContentLoaded", function () {
    let currentColumn = 1; // Variable para mantener el seguimiento de la columna actual
  
    function mostrarColumna(columna) {
      // Ocultar todas las columnas
      document.getElementById('columna1').style.display = 'none';
      document.getElementById('columna2').style.display = 'none';
      document.getElementById('columna3').style.display = 'none';
  
      // Mostrar la columna seleccionada
      if (columna === 1) {
        document.getElementById('columna1').style.display = 'block';
      } else if (columna === 2) {
        document.getElementById('columna2').style.display = 'block';
      } else if (columna === 3) {
        document.getElementById('columna3').style.display = 'block';
      }
  
      currentColumn = columna; // Actualizar la columna actual
    }
  
    // Asignar eventos a los botones del footer
    document.querySelectorAll('.menu__mobile button').forEach((button, index) => {
      button.addEventListener('click', () => {
        mostrarColumna(index + 1); // Mostrar la columna correspondiente al botón
      });
    });
  
    // Mostrar la primera columna al cargar la página solo si está en vista móvil
    if (window.innerWidth <= 768) {
      mostrarColumna(currentColumn);
    }
  
    // Escuchar cambios de tamaño de ventana para aplicar correctamente las reglas
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        // En vista de escritorio, mostrar todas las columnas
        document.getElementById('columna1').style.display = 'block';
        document.getElementById('columna2').style.display = 'block';
        document.getElementById('columna3').style.display = 'block';
      } else {
        // En vista móvil, mostrar solo la columna actual
        mostrarColumna(currentColumn);
      }
    });
  }); 