# 🚀 Guía Rápida: Publicar Recetario App GRATIS

## ✅ ¡Listo para Publicar!

Tu aplicación ya está **100% preparada** para despliegue gratuito. Solo necesitas seguir estos pasos:

---

## 📋 OPCIÓN 1: Railway + Vercel (RECOMENDADO)

### 🎯 **5 Pasos Simples:**

#### 1️⃣ **Subir a GitHub** (1 minuto)
```bash
# Si no tienes repositorio en GitHub, créalo:
# - Ve a github.com → New Repository
# - Nombre: recetario-fullstack
# - Público o Privado (ambos funcionan)

# Conectar tu proyecto local:
git remote add origin https://github.com/TU-USUARIO/recetario-fullstack.git
git push -u origin main
```

#### 2️⃣ **Desplegar Backend en Railway** (3 minutos)
```
1. 🌐 Ve a: https://railway.app
2. 📝 Sign up with GitHub
3. 🚀 "Deploy from GitHub repo"
4. 📁 Selecciona: recetario-fullstack
5. 🗄️ Add PostgreSQL database
6. ⚙️ Variables de entorno:
   SECRET_KEY=clave_super_secreta_aqui
   DEBUG=False
   SMTP_SERVER=sandbox.smtp.mailtrap.io
   SMTP_PORT=587
   SMTP_USER=tu_user_mailtrap
   SMTP_PASSWORD=tu_password_mailtrap
   SMTP_FROM=noreply@recetario.com
   CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

#### 3️⃣ **Desplegar Frontend en Vercel** (2 minutos)
```
1. 🌐 Ve a: https://vercel.com
2. 📝 Sign up with GitHub  
3. 🚀 "New Project"
4. 📁 Import: recetario-fullstack
5. 📂 Root Directory: frontend
6. ⚙️ Environment Variable:
   VITE_API_URL=https://tu-backend.up.railway.app
```

#### 4️⃣ **Actualizar CORS** (1 minuto)
```
Ir a Railway → Variables → Agregar:
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

#### 5️⃣ **¡Funciona!** ✨
```
🎉 Tu app está en línea:
Frontend: https://recetario-XXXXX.vercel.app
Backend: https://recetario-XXXXX.up.railway.app/api
```

---

## 💰 **Costo Total: $0.00**
## ⏱️ **Tiempo Total: ~10 minutos**

---

## 📋 OPCIÓN 2: Todo en Railway (Alternativa)

Si prefieres una sola plataforma:

```
1. 🌐 Ve a: https://railway.app
2. 📝 Deploy from GitHub  
3. 🗄️ Add PostgreSQL
4. ⚙️ Configure variables (mismas que arriba)
5. 🌍 Tu app: https://recetario.up.railway.app
```

---

## 🔧 **URLs que Obtendrás:**

### 📱 **Para tu Portfolio:**
```
🌐 Demo: https://recetario-demo.vercel.app
📖 Código: https://github.com/tu-usuario/recetario-fullstack
📚 API: https://recetario-api.up.railway.app/api/docs
```

### 💼 **Para tu CV:**
```markdown
## Recetario App - Full Stack Web Application
**Demo:** https://recetario-demo.vercel.app  
**GitHub:** https://github.com/tu-usuario/recetario-fullstack  
**Tecnologías:** Vue.js 3, Django REST, PostgreSQL, Railway, Vercel
```

---

## 🎯 **Checklist Final:**

- [ ] ✅ Código subido a GitHub
- [ ] ✅ Backend desplegado en Railway  
- [ ] ✅ Frontend desplegado en Vercel
- [ ] ✅ Base de datos funcionando
- [ ] ✅ Email de contacto funcionando
- [ ] ✅ CORS configurado correctamente
- [ ] ✅ URLs actualizadas en portfolio/CV

---

## 🆘 **Si algo no funciona:**

### ❌ **Error de CORS:**
```
Solución: Verificar CORS_ALLOWED_ORIGINS en Railway
```

### ❌ **Error de Base de Datos:**
```
Solución: Verificar que PostgreSQL está agregada en Railway
```

### ❌ **Error de Build:**
```
Frontend: Verificar VITE_API_URL apunta al backend correcto
Backend: Verificar requirements.txt incluye todas las dependencias
```

---

## 🎉 **¡Listo para Impresionar!**

Tu aplicación ya tiene:
- ✨ Interfaz moderna y responsive
- 🔐 Sistema de autenticación
- 📊 CRUD completo de categorías y recetas
- 📧 Sistema de contacto funcional
- 🗄️ Base de datos en la nube
- 📱 Desplegada profesionalmente
- 🆓 **Completamente GRATIS**

**¡Perfecto para tu portfolio de desarrollador!** 🚀
