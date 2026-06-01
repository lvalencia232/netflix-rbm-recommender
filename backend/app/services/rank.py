import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def rank_content(user_vector, candidate_items, embeddings):

    # se detectan las peliculas que ya vio el usuario
    seen_items = np.where(user_vector == 1)[False]

    # se toman los embeddings de las peliculas ya vistas y se obtiene un vector de preferencias
    user_profile = embeddings[seen_items].mean(axis=0)

    # por medio del producto punto se puede saber que tanto se parece una pelicula a otra
    # K(X, Y) = <X, Y> / (||X||*||Y||)
    sims = cosine_similarity(
        [user_profile],
        embeddings[candidate_items]
    )[0]

    # se ordenan las peliculas mas relevantes
    ranked = [x for _, x in sorted(zip(sims, candidate_items), reverse=True)]
    
    return ranked