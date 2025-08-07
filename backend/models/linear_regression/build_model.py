# Device agnostic version
import torch
from torch import nn
# import matplotlib.pyplot as plt
from pathlib import Path

MODEL_PATH = Path("saved_models")
MODEL_SAVE_PATH = MODEL_PATH / "model.pth"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# def plot_data(train_data,
#                      train_labels,
#                      test_data,
#                      test_labels,
#                      predictions=None):
#   """
#   PLots training data, test data and compares predictions.
#   """
#   plt.figure(figsize=(10, 7))
#   # Are there predictions?
#   if predictions is not None:
#     plt.scatter(test_data, predictions, c="r", s=4, label="Predictions")
#   # Plot training data in blue
#   plt.scatter(train_data, train_labels, c="b", s=4, label="Training data")
#   # Plot testing data in green
#   plt.scatter(test_data, test_labels, c="y", s=4, label="Testing data")
  
#   # Show the legends
#   plt.legend(prop={"size":14})
#   plt.show()

def get_data():
  #===============================================================================
  # DATA PREP
  #===============================================================================
  # create data sample using linear regression formula
  weight = 0.7
  bias = 0.3

  # create range values
  start = 0
  end = 1
  step = 0.02

  # create X and y (features and lables)
  X = torch.arange(start, end, step).unsqueeze(dim=1)
  y = weight * X + bias
  X[:10], y[:10]

  # split data
  train_split = int(0.8 * len(X))
  X_train, y_train = X[:train_split], y[:train_split]
  X_test, y_test = X[train_split:], y[train_split:]

  X_train, y_train, X_test, y_test = [t.to(DEVICE) for t in (X_train, y_train, X_test, y_test)]
  return X_train, y_train, X_test, y_test

class LinearRegressionModelV2(nn.Module):
  def __init__(self):
    super().__init__()
    # use nn.Linear() for creating model params
    self.linear_layer = nn.Linear(in_features=1,
                                  out_features=1)
  def forward(self, x:torch.Tensor) -> torch.Tensor:
    return self.linear_layer(x)

def get_initial_model():
  torch.manual_seed(42)
  return LinearRegressionModelV2().to(DEVICE)

def training_step(model, optimizer, loss_fn, X_train):  
  model.train()

  # 1. forward pass
  y_pred = model(X_train)

  # 2. calculate loss (goes forward through the network)
  loss_train = loss_fn(y_pred, y_train)

  # 3. optimzer zero grad because by default
  # optimizers will accumulate gradients behind the sceen
  optimizer.zero_grad() #every epoch will start from fresh

  # 4. perform backpropagation (goes back through the network)
  loss_train.backward()

  # 5. optimizer step
  optimizer.step()
  return loss_train

def test_step(model, loss_fn, X_test, y_test):
  model.eval() #good practise for cleaning params
  with torch.inference_mode(): #good practise for speed
    pred_test = model(X_test)
    loss_test = loss_fn(pred_test, y_test)
  return loss_test

def get_trained_model(model, X_train, X_test):
  loss_fn = nn.L1Loss() # same a MAE (mean absolute error)

  # setup optimizer (stacastic gradient descent || Adam)
  optimizer = torch.optim.SGD(params=model.parameters(), lr=0.01)
  # put data on target device

  torch.manual_seed(42)
  epochs = 100

  for epoch in range(epochs):
    loss_train = training_step(model, optimizer, loss_fn, X_train)
    loss_test = test_step(model, loss_fn, X_test, y_test)
    if epoch % 10 == 0:
        print(f"Epoch: {epoch} | train loss: {loss_train} | test loss: {loss_test}")
  return model

def get_model_predictions(model, X_test):
  # turn model in eval mode
  model.eval()

  # make predictions on test data
  with torch.inference_mode():
    return model(X_test)

def save_model(model):
  # 1. create model directory
  MODEL_PATH.mkdir(parents=True, exist_ok=True)
  # 2. create model save path
  
  # 3. Save the model state dict
  print("Saving...")
  torch.save(obj=model.state_dict(), f=MODEL_SAVE_PATH)

def get_loaded_model():
  # creating new instance of model
  loaded_model = LinearRegressionModelV2()
  # load saved model
  loaded_model.load_state_dict(torch.load(MODEL_SAVE_PATH))
  # put the loaded model on a device
  loaded_model.to(DEVICE)
  return loaded_model

def evaluate_loaded_model(loaded_model, X_test, y_preds):
  loaded_model.eval()
  with torch.inference_mode():
    loaded_model_preds = loaded_model(X_test)
    print(f"Loaded model predictions: {loaded_model_preds[:10]}")
    print(f"Original test labels: {y_preds[:10]}")
    print(f"Loaded model predictions equal to original: {loaded_model_preds == y_preds}")

def get_model_single_number_prediction(model, number):
  model.eval()
  with torch.inference_mode():
    number_tensor = torch.tensor([float(number)]).unsqueeze(dim=1)
    return model(number_tensor)


X_train, y_train, X_test, y_test = get_data()
# plot_data(X_train, y_train, X_test, y_test)

initial_model = get_initial_model()
trained_model = get_trained_model(initial_model, X_train, X_test)

y_preds = get_model_predictions(trained_model, X_test)
# plot_data(X_train, y_train, X_test, y_test, predictions=y_preds.cpu())

save_model(trained_model)
loaded_model = get_loaded_model()
loaded_y_preds = get_model_predictions(loaded_model, X_test)
# plot_data(X_train, y_train, X_test, y_test, predictions=loaded_y_preds.cpu())
pred = get_model_single_number_prediction(loaded_model, 200)
print("pred: ", pred)