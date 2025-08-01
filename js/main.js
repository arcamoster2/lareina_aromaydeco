
    // Sonido de cascada (ruta actualizada)
    let audio;
    document.getElementById('playSound').addEventListener('click', () => {
      if (!audio) {
        audio = new Audio('sounds/tibetan.mp3');
        audio.loop = true;
      }
      audio.play();
    });
  
  
  
    // Mostrar categorías destacadas desde localStorage
    // Ejemplo de productos por categoría (puedes administrar esto desde el admin en el futuro)
    // Estructura: { categoria: [ {nombre, descripcion, foto}, ... ] }
    const productosPorCategoria = JSON.parse(localStorage.getItem('productosPorCategoria') || '{}');

    function mostrarCategoriasDestacadas() {
      const galeria = document.querySelector('.galeria');
      if (!galeria) return;
      const categorias = JSON.parse(localStorage.getItem('categoriasDestacadas') || '[]');
      if (categorias.length === 0) {
        galeria.innerHTML = '<p>No hay categorías destacadas cargadas.</p>';
        return;
      }
      galeria.innerHTML = categorias.map((cat, idx) => `
        <div class="producto" data-categoria="${cat.nombre}">
          <img src="${cat.foto || 'images/logo.png'}" alt="${cat.nombre}">
          <p>${cat.nombre}</p>
          <small>${cat.descripcion}</small>
        </div>
      `).join('');

      // Agrega evento click a cada categoría
      document.querySelectorAll('.galeria .producto').forEach(el => {
        el.addEventListener('click', function() {
          mostrarProductosCategoria(this.getAttribute('data-categoria'));
        });
      });
    }

    function mostrarProductosCategoria(nombreCategoria) {
      const contenedor = document.getElementById('productos-categoria');
      const productosPorCategoria = JSON.parse(localStorage.getItem('productosPorCategoria') || '{}');
      const productos = productosPorCategoria[nombreCategoria] || [];
      if (productos.length === 0) {
        contenedor.innerHTML = `<h4>${nombreCategoria}</h4><p>No hay productos para esta categoría.</p>`;
        contenedor.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      contenedor.innerHTML = `
        <h4>Productos de ${nombreCategoria} <span style="font-size:1rem;color:#b48b6b;">(${productos.length} encontrado${productos.length === 1 ? '' : 's'})</span></h4>
        <div class="galeria">
          ${productos.map(prod => `
            <div class="producto">
              <img src="${prod.foto || 'images/logo.png'}" alt="${prod.nombre}">
              <p>${prod.nombre}</p>
              <small>${prod.descripcion}</small>
              <p style="font-weight:bold;color:#6b4c3b;">$${prod.precio || '0'}</p>
            </div>
          `).join('')}
        </div>
      `;
      contenedor.scrollIntoView({ behavior: 'smooth' });
    }

    mostrarCategoriasDestacadas();

    // Mostrar imágenes del carrusel desde localStorage
    function mostrarCarousel() {
      const carouselInner = document.querySelector('.carousel-inner');
      const imgs = JSON.parse(localStorage.getItem('carouselImgs') || '[]');
      if (!carouselInner) return;
      if (imgs.length === 0) {
        carouselInner.innerHTML = '<img src="5160549.jpg" alt="Imagen por defecto">';
      } else {
        carouselInner.innerHTML = imgs.map(img => `<img src="${img}" alt="Imagen carrusel">`).join('');
      }
    }
    mostrarCarousel();

    // Carousel simple automático
    const carouselInner = document.querySelector('.carousel-inner');
    let index = 0;
    setInterval(() => {
      if (!carouselInner || !carouselInner.children.length) return;
      index = (index + 1) % carouselInner.children.length;
      carouselInner.style.transform = `translateX(-${index * 100}%)`;
    }, 4000);
  