# 🧑‍💼 Supervisor Notification Module

This project is a full-stack application built as part of a coding challenge. It consists of a **React + Vite + TypeScript** frontend and a **Node.js + Express** backend microservice. The application allows users to submit their contact information to supervisors and optionally be notified via email or phone.

---

## 🧩 Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Validation**: Express Validator
- **Deployment**: Docker + Docker Compose

---

## 📁 Project Structure

. ├── backend │ ├── src │ ├── Dockerfile │ └── ... ├── frontend │ ├── src │ ├── Dockerfile │ └── ... └── docker-compose.yml



---

## ⚙️ Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

You can run the application either locally or via Docker.

---

## 🧪 1. Clone the Repository

```bash
git clone https://github.com/your-username/supervisor-notification-module.git
cd supervisor-notification-module


🖥️ 2. Run Locally Without Docker
🟡 Backend Setup
cd backend
npm install
npm run dev
# Runs on http://localhost:5000


🟣 Frontend Setup

cd frontend
npm install
npm run dev
# Runs on http://localhost:5173



🐳 3. Run With Docker (Recommended)
This is the simplest way to run the entire app.

docker-compose up --build


📌 Services Exposed

Service	URL
Frontend	http://localhost:5173
Backend	http://localhost:5000
✏️ Features
Supervisor list is dynamically fetched from a third-party API.

Supervisor names are filtered and sorted.

Users can choose to be notified via email and/or phone.

Form includes real-time validation.

Fully styled using Tailwind CSS.

🛠️ API Endpoints
GET /api/supervisors
Returns a list of supervisors formatted as:
"<jurisdiction> - <lastName>, <firstName>"

Jurisdictions with numbers are excluded.

POST /api/submit
Accepts form data: firstName, lastName, email?, phoneNumber?, supervisor

Validates inputs:

Required: firstName, lastName, supervisor

Email & phone optional but validated if provided

Prints valid submissions to the console


