web: python3 manage.py migrate --no-input && python3 manage.py collectstatic --no-input && cd backend && gunicorn backend.wsgi:application --host 0.0.0.0 --port $PORT
release: python3 manage.py migrate --no-input
