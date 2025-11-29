const DATOS_GLOBALES = {
  "proyectos": [
    {
      "id": "peque",
      "titulo": "PEQUE",
      "cliente": "Ilustración Creativa",
      "year": "2024",
      "servicios": ["Ilustración"],
      "herramientas": ["Procreate",],
      "descripcion": "Fanzine ilustrado para el curso de Ilustración Creativa.",
      "desafio": "Conectar con un público adulto evocando la nostalgia.",
      "solucion": "Un estilo de ilustración colorido y sencillo. Guiño a creencias colectivas durante la infancia.",
      "cita": "Peque capturó la curiosidad de la infancia.",
      "imagen": "PEQUE.jpg",
      "galeria": [
        "peque1.jpg",
        "peque2.jpg",
        "peque3.jpg",
        "peque4.jpg",
        "peque5.jpg",
        "peque6.jpg"
      ],
      "categoria": "Ilustración",
      "filtro": "editorial ilustracion",
      "claseTamano": "item-large"
    },
    {
      "id": "codu",
      "titulo": "CODU",
      "cliente": "Coddou Brothers",
      "year": "2025",
      "servicios": ["Branding", "Diseño Web"],
      "herramientas": ["Shopify", "Adobe Illustrator", "Adobe Photoshop"],
      "descripcion": "Diseño web integral en Shopify y branding estratégico.",
      "desafio": "Trasladar una visión artística abstracta a una marca comercial sólida.",
      "solucion": "Un branding minimalista con toques urbanos y energéticos.",
      "cita": "Lograron traducir nuestra visión artística abstracta en una plataforma funcional.",
      "imagen": "codu.jpg",
      "galeria": [
        "codu1.jpg",
        "codu2.jpg",
        "codu3.jpg",
        "codu4.jpg",
        "codu5.jpg",
        "codu6.jpg"
      ],
      "categoria": "Branding Web",
      "filtro": "branding web",
      "claseTamano": "item-large"
    },
    {
      "id": "adaptógenos",
      "titulo": "Adaptógenos",
      "cliente": "BeHealthy",
      "year": "2024",
      "servicios": ["Diseño de Packaging", "Mockups"],
      "herramientas": ["Adobe Illustrator", "Adobe Photoshop"],
      "descripcion": "Rediseño de colección de goteros de hongos adaptógenos.",
      "desafio": "Mejorar la legibilidad y presentación premium.",
      "solucion": "Diseño de etiquetas minimalistas con un sistema de color codificado.",
      "cita": "La nueva colección se ve increíblemente profesional en la web.",
      "imagen": "hongos.jpg",
      "galeria": [
        "hongos2.jpg"
        
      ],
      "categoria": "Packaging",
      "filtro": "packaging",
      "claseTamano": "item-normal"
    },
    {
      "id": "night-boost",
      "titulo": "NIGHT BOOST",
      "cliente": "BeHealthy Chile",
      "year": "2024",
      "servicios": ["Diseño de Packaging","Mockup"],
      "herramientas": ["Adobe Illustrator", "Adobe Photoshop"],
      "descripcion": "Diseño de etiqueta para la línea 'Boost' enfocado en el descanso profundo.",
      "desafio": "Transmitir la sensación de 'sueño profundo' y relajación nocturna.",
      "solucion": "Una etiqueta que utiliza tonos nocturnos y gradientes suaves.",
      "cita": "La etiqueta comunica exactamente lo que hace el producto: descanso reparador.",
      "imagen": "nightboost.jpg",
      "galeria": [
        "nightboost1.jpg",
        "nightboost2.jpg"
      ],
      "categoria": "Packaging",
      "filtro": "packaging",
      "claseTamano": "item-normal"
    },
    {
      "id": "alma",
      "titulo": "ALMA",
      "cliente": "Fundación Alma Chile",
      "year": "2025",
      "servicios": ["Branding", "Ecosistema Visual", "Manual de Marca"],
      "herramientas": ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop", "Canva"],
      "descripcion": "Creación de un ecosistema visual unificado.",
      "desafio": "Unificar una identidad visual fragmentada.",
      "solucion": "Una identidad cohesiva que conecta emocionalmente.",
      "cita": "La nueva identidad nos ha permitido conectar con donantes.",
      "imagen": "alma.jpg",
      "galeria": [
        "alma1.jpg",
        "alma3.jpg",
        "alma4.jpg",
        "alma5.jpg"
      ],
      "categoria": "Branding",
      "filtro": "branding",
      "claseTamano": "item-large"
    },
    {
      "id": "broderie",
      "titulo": "BRODERIE",
      "cliente": "Broderie Chile",
      "year": "2025",
      "servicios": ["Diseño Web", "Branding", "Estrategia E-commerce"],
      "herramientas": ["Shopify", "Meta Business Suite", "Adobe Photoshop", "Adobe Illustrator"],
      "descripcion": "Digitalización de marca de pijamas y ropa de cama.",
      "desafio": "Insertar en el mapa digital a una marca tradicional.",
      "solucion": "Un sitio web minimalista y funcional.",
      "cita": "Después de 12 años, por fin tenemos una sucursal digital.",
      "imagen": "broderie.jpg",
      "galeria": [
        "broderie1.jpg",
        "broderie2.jpg",
        "broderie3.jpg"
      ],
      "categoria": "Diseño Web",
      "filtro": "web branding",
      "claseTamano": "item-large"
    },
    {
      "id": "behealthy",
      "titulo": "BEHEALTHY",
      "cliente": "BeHealthy Chile",
      "year": "2024",
      "servicios": ["Rebranding", "Manual de Marca", "Estrategia Digital"],
      "herramientas": ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
      "descripcion": "Rebranding integral para transformar una marca anticuada.",
      "desafio": "La marca original era poco práctica.",
      "solucion": "Se desarrolló una identidad minimalista y fresca.",
      "cita": "Pasamos de vernos como un producto genérico a ser una marca de bienestar moderna.",
      "imagen": "behealthy.jpg",
      "galeria": [
        "behealthy2.jpg",
        "behealthy3.jpg",
        "behealthy4.jpg",
        "behealthy5.jpg"
      ],
      "categoria": "Branding",
      "filtro": "branding",
      "claseTamano": "item-large"
    },
    {
      "id": "detox",
      "titulo": "DETOX",
      "cliente": "BeHealthy Chile",
      "year": "2025",
      "servicios": ["Diseño de Packaging", "Identidad Visual", "Social Media"],
      "herramientas": ["Adobe Illustrator", "Adobe Photoshop", "Adobe After Effects"],
      "descripcion": "Lanzamiento de verano para producto exclusivo web: Gomitas de Vinagre de Manzana sabor Pera. Diseño de empaque y campaña de difusión digital.",
      "desafio": "Crear un empaque que gritara 'Verano' y 'Frescura' para un público joven, diferenciándose de los suplementos tradicionales aburridos y medicinales.",
      "solucion": "Un diseño de packaging vibrante, 'trendy' y lleno de energía, aplicando la nueva identidad de marca.",
      "cita": "El diseño capturó perfectamente la vibra veraniega que buscábamos.",
      "imagen": "detox.jpg",
      "galeria": [
        "detox3.jpg",
        "detox4.jpg",
        "detox1.jpg"
      ],
      "categoria": "Packaging",
      "filtro": "packaging branding",
      "claseTamano": "item-normal"
    },
    {
      "id": "halloween",
      "titulo": "HALLOWEEN",
      "cliente": "Ilustración Creativa",
      "year": "2024",
      "servicios": ["Ilustración", "Pattern Design", "Papelería"],
      "herramientas": ["Procreate", "Adobe Illustrator", "Adobe Photoshop"],
      "descripcion": "Propuesta de papelería (papel de regalo y tarjetas).",
      "desafio": "Alejarse del Halloween típico de terror genérico.",
      "solucion": "Una estética 'Cute & Glamorous'.",
      "cita": "Una propuesta fresca, diferente y con mucho estilo.",
      "imagen": "hallo1.jpg",
      "galeria": [
        "hallo2.jpg",
        "hallo3.jpg",
        "hallo4.jpg"
      ],
      "categoria": "Ilustración",
      "filtro": "ilustracion",
      "claseTamano": "item-wide"
    },
    {
      "id": "prints",
      "titulo": "PRINTS",
      "cliente": "Pasion proyect",
      "year": "2025",
      "servicios": ["Ilustración"],
      "herramientas": ["Procreate"],
      "descripcion": "Prints para emprendimiento personal.",
      "desafio": "",
      "solucion": "",
      "cita": "",
      "imagen": "print1.jpg",
      "galeria": [
        "print2.jpg",
        "print3.jpg"
      ],
      "categoria": "Ilustración",
      "filtro": "ilustracion",
      "claseTamano": "item-large"
    },
    {
      "id": "new-look",
      "titulo": "NEW LOOK",
      "cliente": "New Life",
      "year": "2025",
      "servicios": ["Dirección de Arte", "Fotografía", "Edición"],
      "herramientas": ["Cámara Digital", "Adobe Photoshop"],
      "descripcion": "Colección de moda upcycling inspirada en los 60s.",
      "desafio": "Capturar la esencia retro y la calidad de las prendas recicladas.",
      "solucion": "Dirección de arte y fotografía que resaltan las texturas.",
      "imagen": "NEWLOOK.jpg",
      "galeria": [
        "NEWLOOK1.jpg",
        "NEWLOOK2.jpg"
      ],
      "categoria": "Fotografía",
      "filtro": "fotografía",
      "claseTamano": "item-normal"
    }
  ],
  "servicios": [
    { 
      "titulo": "Diseño Web", 
      "descripcion": "Sitios que venden por sí solos.", 
      "icono": "ph-desktop", 
      "herramientas": ["Shopify", "WordPress", "HTML/CSS"],
      "filtro": "web" 
    },
    { 
      "titulo": "Branding", 
      "descripcion": "Sistemas de identidad completos.", 
      "icono": "ph-pencil-circle", 
      "herramientas": ["Illustrator", "Figma", "InDesign"],
      "filtro": "branding" 
    },
    { 
      "titulo": "Packaging", 
      "descripcion": "Diseño estructural y gráfico.", 
      "icono": "ph-package", 
      "herramientas": ["Illustrator", "Photoshop", "Dielines"],
      "filtro": "packaging" 
    },
    { 
      "titulo": "Fotografía", 
      "descripcion": "Dirección de arte y captura digital.", 
      "icono": "ph-camera", 
      "herramientas": ["Cámara Digital", "Photoshop", "Lightroom"],
      "filtro": "fotografia" 
    },
    { 
      "titulo": "Ilustración", 
      "descripcion": "Diseño de personajes y patrones.", 
      "icono": "ph-paint-brush", 
      "herramientas": ["Procreate", "Illustrator"],
      "filtro": "ilustracion" 
    }
  ]
};