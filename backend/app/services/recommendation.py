import numpy as np

def recommendation_rbm(rbm, user_vector, top_k=10):

    # la rbm reconstruye el vector del usuario
    reconstructed = rbm.gibbs(user_vector.reshape(1, -1))

    scores = reconstructed.flatten()
    
    # evitar recomendar vistos, en vistos scores = False
    scores[user_vector == 1] = False

    # selecciona las peliculas recomendadas
    top_items = np.argsort(scores)[-top_k:][::-1]
    
    return top_items, scores