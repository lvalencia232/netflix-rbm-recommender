from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.recommendation import recommendation_rbm
import pandas as pd
import numpy as np
import joblib

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)

MODELS_DIR = BASE_DIR / "models"
DATA_DIR = BASE_DIR / "data"

# =========================================
# LOAD MODEL
# =========================================

print("Loading RBM model...")

rbm = joblib.load(
    MODELS_DIR / "rbm_model.pkl"
)

print("Loading matrices...")

user_item_matrix = np.load(
    DATA_DIR / "user_item_matrix.npy"
)

print("Loading dataset...")

df = pd.read_csv(
    DATA_DIR / "netflix_titles.csv"
).reset_index(drop=True)

df["title_lower"] = (
    df["title"]
    .fillna("")
    .str.lower()
)

# =========================================
# FASTAPI
# =========================================

app = FastAPI(
    title="Netflix RBM API",
)

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================
# REQUEST MODEL
# =========================================

class MovieRequest(BaseModel):
    movies: list[int]

# =========================================
# ROOT
# =========================================

@app.get("/")

async def root():

    return {
        "message":
            "RBM API funcionando 🚀"
    }

# =========================================
# SEARCH
# =========================================

@app.get("/search")

async def search_movies(
    query: str = ""
):

    query = (
        query
        .strip()
        .lower()
    )

    # =========================
    # VALIDATION
    # =========================

    if len(query) < 2:

        return {
            "movies": []
        }

    # =========================
    # FAST FILTER
    # =========================

    results = df.loc[
        df["title_lower"]
        .str.contains(
            query,
            na=False
        ),
        [
            "title",
            "type",
            "rating",
            "release_year",
        ],
    ].head(5)

    # =========================
    # BUILD RESPONSE
    # =========================

    movies = [
        {
            "id": int(idx),

            "title":
                row["title"],

            "type":
                row["type"],

            "rating":
                row["rating"],

            "release_year":
                int(
                    row["release_year"]
                ),
        }

        for idx, row
        in results.iterrows()
    ]

    return {
        "movies": movies
    }

# =========================================
# RECOMMEND
# =========================================

@app.post("/recommend")

async def recommend_movies(
    request: MovieRequest
):

    if not request.movies:

        return {
            "recommendations": []
        }

    n_items = len(df)

    user_vector = np.zeros(
        n_items,
        dtype=np.float32
    )

    # =========================
    # BUILD USER VECTOR
    # =========================

    valid_movies = [
        movie_id
        for movie_id
        in request.movies
        if 0 <= movie_id < n_items
    ]

    user_vector[valid_movies] = 1

    # =========================
    # MODEL INFERENCE
    # =========================

    recommendations, scores = (
        recommendation_rbm(
            rbm,
            user_vector,
            top_k=10,
        )
    )

    # =========================
    # BUILD RESPONSE
    # =========================

    results = []

    for idx, score in zip(
        recommendations,
        scores
    ):

        movie = df.iloc[idx]

        results.append({

            "id":
                int(idx),

            "title":
                movie["title"],

            "type":
                movie["type"],

            "rating":
                movie["rating"],

            "release_year":
                int(
                    movie[
                        "release_year"
                    ]
                ),

            "score":
                round(
                    float(score),
                    4
                ),
        })

    return {
        "recommendations":
            results
    }