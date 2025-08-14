# 🍳 Recetario - Plataforma de Recetas Culinarias

Una aplicación web moderna para compartir y descubrir recetas culinarias, desarrollada con Vue.js 3 y Django REST Framework.

## 📸 Capturas de Pantalla

*[Las capturas de pantalla se agregarán aquí próximamente]*

<!-- 
Agregar aquí las imágenes cuando estén disponibles:
- ![Home Page](screenshots/home.png)
- ![Recetas](screenshots/recetas.png)
- ![Panel Admin](screenshots/panel.png)
- ![Gestión Categorías](screenshots/categorias.png)
-->

## 🚀 Características Principales

- **📱 Interfaz Responsiva**: Diseño adaptable para desktop y móvil
- **👤 Sistema de Autenticación**: Registro, login y gestión de usuarios
- **🍽️ Gestión de Recetas**: Crear, editar, eliminar y visualizar recetas
- **📂 Categorías**: Sistema completo de gestión de categorías de recetas
- **📧 Sistema de Contacto**: Formulario de contacto con envío de emails via Mailtrap
- **🔍 Búsqueda**: Funcionalidad de búsqueda de recetas
- **📊 Panel de Administración**: Dashboard para gestionar contenido
- **🎨 Diseño Moderno**: Interfaz atractiva y fácil de usar

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue.js 3** - Framework JavaScript progresivo
- **Vue Router** - Enrutamiento SPA
- **Pinia** - Gestión de estado
- **Vee-Validate + Yup** - Validación de formularios
- **Axios** - Cliente HTTP
- **Bootstrap** - Framework CSS
- **Vite** - Build tool y dev server

### Backend
- **Django 5.1** - Framework web de Python
- **Django REST Framework** - API REST
- **Django CORS Headers** - Manejo de CORS
- **SQLite/PostgreSQL** - Base de datos
- **Python Dotenv** - Variables de entorno
- **drf-yasg** - Documentación automática de API

### Herramientas Adicionales
- **Mailtrap** - Servicio de email para desarrollo
- **Font Awesome** - Iconografía
- **FancyBox** - Galería de imágenes

## 📋 Requisitos Previos

- **Node.js** 16+ y npm
- **Python** 3.8+
- **Git**

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/jcbastianl/Recetario.git
cd Recetario
```

### 2. Configurar Backend (Django)

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Linux/Mac:
source venv/bin/activate
# En Windows:
venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor de desarrollo
python manage.py runserver
```

### 3. Configurar Frontend (Vue.js)

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL de tu API

# Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ Variables de Entorno

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=tu_secret_key_aqui
BASE_URL=http://localhost:8000/
BASE_URL_FRONTEND=http://localhost:5173/
DATABASE_SERVER=127.0.0.1
DATABASE_PORT=3306
DATABASE_USER=tu_usuario
DATABASE_PASSWORD=tu_password
DATABASE_BD=django_db
USE_SQLITE=1
SMTP_SERVER=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=tu_mailtrap_user
SMTP_PASSWORD=tu_mailtrap_password
SMTP_FROM=noreply@recetario.com
MAILTRAP_TOKEN=tu_mailtrap_token
MAILTRAP_INBOX_ID=tu_inbox_id
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:8000/api/v1/
```

## 📚 Estructura del Proyecto

```
Recetario/
├── backend/                 # API Django
│   ├── backend/            # Configuración principal
│   ├── categorias/         # App de categorías
│   ├── contacto/           # App de contacto
│   ├── recetas/            # App de recetas
│   ├── seguridad/          # App de autenticación
│   ├── utilidades/         # Utilidades (email, etc.)
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # Aplicación Vue.js
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── views/          # Páginas/Vistas
│   │   ├── services/       # Servicios API
│   │   ├── stores/         # Gestión de estado
│   │   ├── router/         # Configuración de rutas
│   │   └── schemas/        # Esquemas de validación
│   ├── public/             # Archivos estáticos
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔌 API Endpoints

### Autenticación
- `POST /api/v1/login/` - Iniciar sesión
- `POST /api/v1/registro/` - Registro de usuario

### Recetas
- `GET /api/v1/recetas/` - Listar recetas
- `POST /api/v1/recetas/` - Crear receta
- `GET /api/v1/recetas/{id}/` - Obtener receta
- `PUT /api/v1/recetas/{id}/` - Actualizar receta
- `DELETE /api/v1/recetas/{id}/` - Eliminar receta

### Categorías
- `GET /api/v1/categorias/` - Listar categorías
- `POST /api/v1/categorias/` - Crear categoría
- `PUT /api/v1/categorias/{id}/` - Actualizar categoría
- `DELETE /api/v1/categorias/{id}/` - Eliminar categoría

### Contacto
- `POST /api/v1/contacto/` - Enviar mensaje de contacto

## 📖 Documentación de la API

Una vez iniciado el servidor backend, puedes acceder a la documentación interactiva en:
- **Swagger UI**: http://localhost:8000/documentacion/
- **ReDoc**: http://localhost:8000/redoc/

## 🧪 Testing

### Backend
```bash
cd backend
python manage.py test
```

### Frontend
```bash
cd frontend
npm run test
```

## 📦 Build para Producción

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
python manage.py collectstatic
```

## 🚀 Deployment

### Opciones Recomendadas:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Railway, Render, DigitalOcean
- **Base de Datos**: PostgreSQL (Heroku Postgres, Railway, etc.)

### Variables de Entorno para Producción:
```env
DEBUG=False
ALLOWED_HOSTS=tu-dominio.com
DATABASE_URL=postgresql://...
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Joseph Balcazar**
- GitHub: [@jcbastianl](https://github.com/jcbastianl)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tu-perfil)

## 🙏 Agradecimientos

- Comunidad de Vue.js y Django
- Todos los desarrolladores que han contribuido con las librerías utilizadas
- [Mailtrap](https://mailtrap.io) por el servicio de email para desarrollo

## 📞 Soporte

Si tienes alguna pregunta o problema, no dudes en:
- Abrir un [Issue](https://github.com/jcbastianl/Recetario/issues)
- Contactar a través del formulario de contacto en la aplicación
- Enviar un email a: [tu-email@ejemplo.com]

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
