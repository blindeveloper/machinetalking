from tools.fetch_data import fetch_data
from tools.plot_digit import plot_digit
import matplotlib.pyplot as plt
from sklearn.linear_model import SGDClassifier
from sklearn.model_selection import cross_val_score
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

def generate_model():
    # Fetch the MNIST dataset
    raw_data = fetch_data()
    # Print the shape of the data and target
    X, y = raw_data.data, raw_data.target
    some_digit = X[0]
    plot_digit(some_digit)
    # Display the some digit
    # plt.show()
    

    # We should always create a test set and set it aside before inspecting the data closely. 
    # The MNIST dataset returned by fetch_openml() is actually already split into a training set 
    # (the first 60,000 images) and a test set (the last 10,000 images)
    X_train, X_test, y_train, y_test = X[:60000], X[60000:], y[:60000], y[60000:]

    # TRAINING A BINARY CLASSIFIER=================================================================
    # Let’s simplify the problem for now and only try to identify one digit—for example, the number 5.
    # First we’ll create the target vectors for this classification task: 
    y_train_5 = (y_train == '5')  # True for all 5s, False for all other digits
    y_test_5 = (y_test == '5')
    # Now let’s pick a classifier and train it. A good place to start is with a stochastic gradient descent
    sgd_clf = SGDClassifier(random_state=42, n_jobs=-1)
    sgd_clf.fit(X_train, y_train_5)
    # Now we can use it to detect images of the number 5
    print(f"Is some digit is 5?: {y[0]}", sgd_clf.predict([some_digit]))
    # The classifier guesses that this image represents a 5 (True). 
    # Looks like it guessed right in this particular case! 
    # Now, let’s evaluate this model’s performance. 
    
    # PERFORMANCE MEASURES=================================================================
    # Measuring Accuracy Using Cross-Validation

    # Lets use k-fold cross-validation with three folds.
    # k-fold cross-validation means splitting the training set into k folds (in this case, three), 
    # then training the model k times, 
    # holding out a different fold each time for evaluation

    # cross_val_score_values = cross_val_score(sgd_clf, X_train, y_train_5, cv=3, scoring="accuracy")
    # [0.95035 0.96035 0.9604 ]
    # Above 95% accuracy (ratio of correct predictions) on all cross-validation folds? 
    # Now let’s look at a dummy classifier that just classifies every single image 
    # in the most frequent class, which in this case is the negative class (i.e., non 5)
    # dummy_clf = DummyClassifier()
    # dummy_clf.fit(X_train, y_train_5)
    # print(any(dummy_clf.predict(X_train)))  # prints False: no 5s detected

    # print(cross_val_score(dummy_clf, X_train, y_train_5, cv=3, scoring="accuracy"))
    # array([0.90965, 0.90965, 0.90965]) 
    # over 90% accuracy! This is simply because only about 10% of the images are 5s, 
    # so if we always guess that an image is not a 5, 
    # we will be right about 90% of the time. 
    # Accuracy is generally not the preferred performance measure for classifiers, 
    # especially when we are dealing with skewed datasets 
    # (i.e., when some classes are much more frequent than others). 
    # A much better way to evaluate the performance of a classifier 
    # is to look at the confusion matrix (CM).
    
    # Measuring Accuracy Using Confusion Matrices
    # The general idea of a confusion matrix 
    # is to count the number of times instances of class A are classified as class B, 
    # for all A/B pairs. For example, to know the number of times the classifier 
    # confused images of 8s with 0s, we would look at row #8, column #0 of the confusion matrix.

    # Just like the cross_val_score() function, cross_val_predict() performs k-fold cross-validation,
    # but instead of returning the evaluation scores, it returns the predictions made on each test fold. 
    # This means that we get a clean prediction for each instance in the training set
    y_train_pred = cross_val_predict(sgd_clf, X_train, y_train_5, cv=3)   

    # Now we are ready to get the confusion matrix using the confusion_matrix() function. 
    # Lets pass it the target classes (y_train_5) and the predicted classes (y_train_pred): 
    # cm = confusion_matrix(y_train_5, y_train_pred)
    # [
    #   [53892,   687], 
    #   [1891,  3530]
    # ]
    # The first row of this matrix considers non-5 images (the negative class): 
    # 53,892 of them were correctly classified as non-5s (they are called true negatives), 
    # while the remaining 687 were wrongly classified as 5s (false positives, also called type I errors). 
    # The second row considers the images of 5s (the positive class): 
    # 1,891 were wrongly classified as non-5s (false negatives, also called type II errors), 
    # while the remaining 3,530 were correctly classified as 5s (true positives).

    # A perfect classifier would only have true positives and true negatives, 
    # so its confusion matrix would have nonzero values only on its main diagonal (top left to bottom right): 
    y_train_perfect_predictions = y_train_5  # pretend we reached perfection
    cm_pretended = confusion_matrix(y_train_5, y_train_perfect_predictions)
    print('======>cm_pretended:', cm_pretended)
    # array([[54579,     0],
    #        [    0,  5421]])

    # Precision and Recall

    
    precision_score_value = precision_score(y_train_5, y_train_pred)  # == 3530 / (687 + 3530)
    print('======>precision_score_value:', precision_score_value)
    # 0.8370879772350012
    recall_score_value = recall_score(y_train_5, y_train_pred)  # == 3530 / (1891 + 3530)
    print('======>recall_score_value:', recall_score_value)
    # 0.6511713705958311

    # Now our 5-detector does not look as shiny as it did when we looked at its accuracy. 
    # When it claims an image represents a 5, it is correct only 83.7% of the time. 
    # Moreover, it only detects 65.1% of the 5s.

    
    f1_score_value = f1_score(y_train_5, y_train_pred)
    print('======>f1_score_value:', f1_score_value)
    # 0.7325171197343846




generate_model()