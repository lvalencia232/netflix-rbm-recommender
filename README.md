# 🎬 Netflix RBM Recommender

A movie recommendation system inspired by Netflix, powered by a **Restricted Boltzmann Machine (RBM)** to generate personalized recommendations based on user-selected movies.

---

## 🚀 Overview

This project demonstrates the implementation of a recommendation system using Machine Learning techniques. Users can select movies they enjoy, and the trained RBM model predicts other movies they are likely to be interested in.

The application consists of:

- A **Next.js** frontend for user interaction.
- A **FastAPI** backend exposing recommendation endpoints.
- A trained **Restricted Boltzmann Machine (RBM)** model for generating recommendations.

---

## 🏗️ Architecture

```text
Next.js Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
Restricted Boltzmann Machine
        │
        ▼
Movie Recommendations
```

---

## 🛠️ Technologies

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- Python
- NumPy
- Pandas
- Joblib

### Machine Learning

- Restricted Boltzmann Machine (RBM)

---

## 📂 Dataset

This project uses the Netflix Titles dataset, which contains information about movies and TV shows available on Netflix, including:

- Title
- Content Type
- Release Year
- Rating

---

## 🧠 How It Works

1. The user selects one or more movies.
2. A user-item vector is created from the selected movies.
3. The RBM processes the input vector.
4. The model estimates preference probabilities for unseen movies.
5. The top recommendations are returned to the frontend.

---

## ✨ Features

- Movie search functionality
- Real-time movie selection
- Personalized recommendations
- FastAPI REST API
- Responsive user interface
- Clean component-based architecture

---

## 📸 Screenshots

### Home Page

![RBM Preview 1](https://github.com/lvalencia232/netflix-rbm-recommender/blob/main/images/RBM1.png)

### Movie Selection

![RBM Preview 3](https://github.com/lvalencia232/netflix-rbm-recommender/blob/main/images/RBM2.png)

### Recommendations

![RBM Preview 3](https://github.com/lvalencia232/netflix-rbm-recommender/blob/main/images/RBM3.png)

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/netflix-rbm-recommender.git

cd netflix-rbm-recommender
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔧 Environment Variables

Create a `.env.local` file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

An example configuration is provided in:

```text
.env.example
```

---

## 📁 Project Structure

```text
netflix-rbm-recommender/
│
├── backend/
│   ├── models/
│   ├── services/
│   ├── data/
│   └── main.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── public/
│
├── images/
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🎯 Learning Objectives

This project was built to explore:

- Recommendation Systems
- Unsupervised Learning
- Restricted Boltzmann Machines
- Full-Stack Machine Learning Applications

---
