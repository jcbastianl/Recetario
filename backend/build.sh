#!/bin/bash

# Render Build Script para Django
echo "🔨 Iniciando build process..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
pip install -r requirements.txt

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones..."
python manage.py migrate --no-input

# Crear superusuario
echo "👤 Configurando admin..."
python manage.py shell << 'EOF'
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@recetario.app', 'AdminRecetario2025!')
    print('✅ Superusuario creado')
else:
    print('ℹ️ Superusuario ya existe')
EOF

# Recolectar archivos estáticos
echo "📁 Recolectando estáticos..."
python manage.py collectstatic --no-input

echo "✅ Build completado!"
