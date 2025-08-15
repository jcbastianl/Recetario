FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements first (for better caching)
COPY backend/requirements.txt ./backend/

# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy application code
COPY . .

# Make manage.py executable
RUN chmod +x manage.py

# Collect static files (this might fail first time, that's ok)
RUN python manage.py collectstatic --no-input || true

# Expose port
EXPOSE 8000

# Start command
CMD ["sh", "-c", "python manage.py migrate --no-input && cd backend && python -m gunicorn backend.wsgi:application --host 0.0.0.0 --port $PORT"]
