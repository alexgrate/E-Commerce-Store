#!/usr/bin/env bash
pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
```

## 4. Create `Procfile` inside your `backend` folder
```
web: gunicorn backend.wsgi:application