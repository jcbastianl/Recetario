#!/bin/bash

# Script de deployment para Render
echo "🚀 Iniciando deployment..."

# Ejecutar migraciones
echo "📊 Ejecutando migraciones..."
python manage.py migrate --no-input

# Crear superusuario si no existe (opcional)
echo "👤 Verificando superusuario..."
python manage.py shell << EOF
from django.contrib.auth.models import User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@recetario.com', 'admin123')
    print('Superusuario creado: admin/admin123')
else:
    print('Superusuario ya existe')
EOF

# Recolectar archivos estáticos
echo "📁 Recolectando archivos estáticos..."
python manage.py collectstatic --no-input

echo "✅ Deployment completado!"
