FROM python:3.14-alpine

WORKDIR /app

# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip pipenv

COPY Pipfile Pipfile.lock /app/
RUN pipenv install --system --deploy


COPY . /app/

EXPOSE 8000

CMD ["sh", "-c", "python manage.py import_wnt_tags && python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8001"]
