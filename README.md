# 1Week Challenge API

A RESTful API built with Fastify, Prisma ORM, and MySQL — fully containerized with Docker.

---

## 📋 Prerequisites

### 1. Install Docker Desktop

Download and install Docker Desktop for your OS:

- **Windows** — https://docs.docker.com/desktop/install/windows-install/
- **Mac** — https://docs.docker.com/desktop/install/mac-install/
- **Linux** — https://docs.docker.com/desktop/install/linux-install/

After installing, verify Docker is running:

```bash
docker --version
docker compose version
```

---

### 2. Check Required Ports

Make sure the following ports are **not in use** on your machine before starting:

| Port | Service |
|------|---------|
| `3000` | API App |
| `3306` | MySQL Database |
| `8080` | phpMyAdmin |

**Windows (PowerShell):**
```powershell
netstat -ano | findstr :3000
netstat -ano | findstr :3306
netstat -ano | findstr :8080
```

**Mac/Linux:**
```bash
lsof -i :3000
lsof -i :3306
lsof -i :8080
```

If any port is in use, stop the process using it before continuing.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jraay12/1week-challenge.git
cd 1week-challenge
```

### 2. Setup environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Then open `.env` and replace the contents with the following:

```env
DATABASE_URL="mysql://root:qwerty@db:3306/challenge-db"
PORT=3000
DATABASE_USER="root"
DATABASE_PASSWORD="qwerty"
DATABASE_NAME="challenge-db"
DATABASE_HOST="db"
DATABASE_PORT=3306

ACCESS_TOKEN_SECRET=f9c076cba94bc86a75c4cb23dc9f12a8d5d127f29560cbc2199f85f66b02dd09db72d5b930f362e21478de8301ad8709e182c457f87b7362bd887bcb4264de85
REFRESH_TOKEN_SECRET=936d87318506a89e2592a0d999f8885769ea7fc983b802276284d9ed30fc42064a8f68a04937b26ac685173acb88cd9d034a1c847b8f1e43eaa7f40b10b39ad1
COOKIE_TOKEN_SECRET=51c1bcca7e031bf62bc6cd7d553d9acb7d64c43406519ece768f5b9aeee40eab1e31a8a27378b095ed24046bcdde4609f1c52338f29b54f825a8b0cc9bc4ce30
```

### 3. Make sure Docker Desktop is running

Open Docker Desktop and ensure it is running before proceeding.

### 4. Start the containers

```bash
docker compose up -d --build
```

This will automatically:
- Build the app image
- Start MySQL, the API, and phpMyAdmin
- Run Prisma migrations

---

## ✅ Verify It's Running

Once the containers are up, open your browser and visit:

```
http://localhost:3000/health
```

If you see a healthy response, the backend is up and running! 🎉

---

## 🌐 Available Services

| Service | URL |
|---------|-----|
| API | http://localhost:3000 |
| Health Check | http://localhost:3000/health |
| phpMyAdmin | http://localhost:8080 |

---

## 🧪 Testing with Postman

A Postman collection is included in the repository for testing all available endpoints.

### Import the collection

1. Open **Postman**
2. Click **Import**
3. Select the file: `./postman/1week challenge.postman_collection.json`
4. The collection will appear in your Postman sidebar ready to use

> Make sure the API is running at `http://localhost:3000` before sending requests.

---

## 🛠️ Useful Commands

### View logs
```bash
docker logs mata-challenge-app
```

### Follow logs in real time
```bash
docker logs -f mata-challenge-app
```

### Enter the container shell
```bash
docker exec -it mata-challenge-app sh
```

### Stop all containers
```bash
docker compose down
```

### Stop and reset the database
```bash
docker compose down -v
```

### Rebuild after code changes
```bash
docker compose down
docker compose up -d --build
```

---

## ❓ Troubleshooting

**Docker command not found**
- Make sure Docker Desktop is installed and running

**Port already in use**
- Check and stop any process using ports `3000`, `3306`, or `8080`

**App can't connect to database**
- Make sure `DATABASE_HOST=db` in your `.env` (not `localhost`)
- Check logs: `docker logs mata-challenge-app`

**Migration errors / database issues**
- Reset everything: `docker compose down -v && docker compose up -d --build`
