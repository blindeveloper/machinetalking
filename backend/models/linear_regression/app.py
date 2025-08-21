# Lambda function to load a linear regression model and make predictions
import boto3
import torch
from torch import nn
s3 = boto3.client("s3")
import json

MODEL_SAVE_PATH = '/tmp/model.pth'

class LinearRegressionModelV2(nn.Module):
  def __init__(self):
    super().__init__()
    # use nn.Linear() for creating model params
    self.linear_layer = nn.Linear(in_features=1, out_features=1)
  def forward(self, x:torch.Tensor) -> torch.Tensor:
    return self.linear_layer(x)


def get_loaded_model():
    # Download from S3 before loading
    s3.download_file("linear-regression-model-bucket-11fb2517", "model.pth", MODEL_SAVE_PATH)

    loaded_model = LinearRegressionModelV2()
    loaded_model.load_state_dict(torch.load(MODEL_SAVE_PATH, map_location='cpu'))
    return loaded_model

def get_model_single_number_prediction(model, number):
  model.eval()
  with torch.inference_mode():
    number_tensor = torch.tensor([float(number)]).unsqueeze(dim=1)
    return model(number_tensor)

def lambda_handler(event, context):
    try:
        model = get_loaded_model()
        body = json.loads(event["body"])
        if "numerical_value" not in body:
          return {
              "statusCode": 400,
              "body": "Missing 'numerical_value' in request body"
          }
        pred = get_model_single_number_prediction(model, body["numerical_value"])
        return {
            "statusCode": 200,
            "body": pred.item()  # Convert tensor to a Python number
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": "something went wrong: " + str(e)
        }