# 🌐 Guía de Despliegue Gratuito - Recetario App

## 📋 Resumen de Opciones

### 🎯 **Recomendación Principal: GitHub + Vercel + Railway**
- **Frontend**: GitHub Pages o Vercel (Gratis)
- **Backend**: Railway (Gratis hasta 500 horas/mes)
- **Base de datos**: PostgreSQL incluida en Railway

---

## 🏗️ Opción 1: Despliegue Completo con Railway

### ✅ Ventajas:
- ✨ Completamente gratuito para proyectos pequeños
- 🗄️ Base de datos PostgreSQL incluida
- 🔄 Auto-deploy desde GitHub
- 🌍 URLs personalizadas
- 📊 500 horas gratis al mes (suficiente para portafolio)

### 📝 Pasos:

#### 1. Preparar el proyecto para Railway:

**Crear `railway.json` en la raíz:**
```json
{
  "version": 2,
  "build": {
    "command": "cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate"
  },
  "deploy": {
    "startCommand": "cd backend && python manage.py runserver 0.0.0.0:$PORT",
    "healthcheckPath": "/api/health/"
  }
}
```

**Agregar a `backend/requirements.txt`:**
```
gunicorn==21.2.0
psycopg2-binary==2.9.7
whitenoise==6.5.0
```

**Configurar `backend/settings.py` para producción:**
```python
import os
import dj_database_url

# Railway configuration
if 'RAILWAY_ENVIRONMENT' in os.environ:
    DEBUG = False
    ALLOWED_HOSTS = ['*']
    
    # Database configuration for Railway
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }
    
    # Static files
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    
    # CORS for production
    CORS_ALLOWED_ORIGINS = [
        "https://tu-app.up.railway.app",
        "https://tu-frontend.vercel.app",
    ]
```

#### 2. Desplegar:
1. 🌐 Ve a [Railway.app](https://railway.app)
2. 📝 Conecta tu cuenta de GitHub
3. 🚀 Selecciona el repositorio "Recetario"
4. 🗄️ Agrega una base de datos PostgreSQL
5. ⚙️ Configura las variables de entorno:
   ```
   DATABASE_URL=postgresql://...  (Auto-generada)
   SECRET_KEY=tu_clave_secreta_super_segura
   DEBUG=False
   MAILTRAP_TOKEN=tu_token
   MAILTRAP_INBOX_ID=tu_inbox_id
   ```

---

## 🎨 Opción 2: Frontend en Vercel + Backend en Railway

### Frontend en Vercel:

**Crear `vercel.json` en `frontend/`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

**Actualizar `frontend/.env.production`:**
```
VITE_API_URL=https://tu-backend.up.railway.app/api
```

### Pasos:
1. 🌐 Ve a [Vercel.com](https://vercel.com)
2. 📝 Conecta GitHub
3. 📁 Selecciona el folder `frontend`
4. 🔧 Configura build: `npm run build`
5. 📂 Output directory: `dist`

---

## 📦 Opción 3: Todo en Render (Alternativa)

### ✅ Ventajas:
- 🆓 Completamente gratuito
- 🗄️ PostgreSQL gratuita
- 🔄 Auto-deploy
- 🌍 SSL incluido

**Crear `render.yaml`:**
```yaml
services:
  - type: web
    name: recetario-backend
    env: python
    buildCommand: "cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate"
    startCommand: "cd backend && gunicorn backend.wsgi:application"
    envVars:
      - key: DEBUG
        value: False
      - key: SECRET_KEY
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: recetario-db
          property: connectionString

  - type: web
    name: recetario-frontend
    env: node
    buildCommand: "cd frontend && npm ci && npm run build"
    startCommand: "cd frontend && npm run preview"
    
databases:
  - name: recetario-db
    databaseName: recetario
    user: recetario_user
```

---

## 🎯 Recomendación Final

### 🥇 **Para Portafolio Profesional:**
```
GitHub → Railway (Backend + DB) → Vercel (Frontend)
```

### 💰 **Costo:** $0.00
### ⏱️ **Tiempo de setup:** ~30 minutos
### 🔗 **URLs resultantes:**
- Frontend: `https://recetario-app.vercel.app`
- Backend: `https://recetario-api.up.railway.app`

---

## 📱 URLs del Proyecto

### 🔗 Repositorio:
```
https://github.com/tu-usuario/recetario-fullstack
```

### 🌐 Demo en Vivo:
```
https://recetario-demo.vercel.app
```

### 📖 Documentación API:
```
https://recetario-api.up.railway.app/api/docs/
```

---

## 🚀 Script de Despliegue Rápido

```bash
# 1. Push a GitHub
git push origin main

# 2. Conectar a Railway
# - Ir a railway.app
# - New Project → Deploy from GitHub
# - Seleccionar repositorio

# 3. Conectar a Vercel  
# - Ir a vercel.com
# - New Project → Import Git Repository
# - Seleccionar frontend folder

# 4. ¡Listo! Tu app está en línea 🎉
```

---

¡Tu aplicación estará disponible en minutos y completamente gratis para uso de portafolio!
