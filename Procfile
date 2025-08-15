web: cd backend && python3 manage.py migrate --no-input && python3 manage.py collectstatic --no-input && gunicorn backend.wsgi:application --host 0.0.0.0 --port $PORT
release: cd backend && python3 manage.py migrate --no-input
