from sklearn.datasets import fetch_openml
def fetch_data():
    return fetch_openml('mnist_784', as_frame=False)