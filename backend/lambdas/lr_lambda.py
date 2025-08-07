import boto3
import torch
from torch import nn
s3 = boto3.client("s3")

class LinearRegressionModelV2(nn.Module):
  def __init__(self):
    super().__init__()
    # use nn.Linear() for creating model params
    self.linear_layer = nn.Linear(in_features=1, out_features=1)
  def forward(self, x:torch.Tensor) -> torch.Tensor:
    return self.linear_layer(x)

def get_loaded_model():
  # creating new instance of model
  MODEL_SAVE_PATH = '/tmp/model.pkl'
  loaded_model = LinearRegressionModelV2()
  # load saved model
  loaded_model.load_state_dict(torch.load(MODEL_SAVE_PATH))
  # put the loaded model on a device
  loaded_model.to('cpu')
  return loaded_model

model = get_loaded_model()

def lambda_handler(event, context):
    try:
        return {
            "statusCode": 200,
            "body": "TEST"
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": "BOOM"
        }