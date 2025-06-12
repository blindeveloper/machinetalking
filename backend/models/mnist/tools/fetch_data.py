from sklearn.datasets import fetch_openml
def fetch_data():
    mnist = fetch_openml('mnist_784', as_frame=False)
    print("Fetching MNIST data...")
    print('======>mnist:', mnist)