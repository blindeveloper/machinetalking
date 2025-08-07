# S3 Bucket for House Price Prediction Model
resource "aws_s3_bucket" "model_bucket" {
  bucket = "house-price-prediction-model-bucket"
}

resource "aws_s3_object" "model_file" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "model_1744724704225.pkl"
  source = "./bundles/model_1744724704225.pkl"
}

# S3 Bucket for Linear Regression Model
resource "aws_s3_bucket" "lr_model_bucket" {
  bucket = "linear-regression-model-bucket-20250807"
}

resource "aws_s3_object" "lr_model_file" {
  bucket = aws_s3_bucket.lr_model_bucket.id
  key    = "model.pth"
  source = "./models/linear_regression/saved_models/model.pth"
}