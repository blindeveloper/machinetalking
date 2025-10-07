resource "random_id" "bucket_suffix" {
  byte_length = 4
}

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
  bucket = "linear-regression-model-bucket-${random_id.bucket_suffix.hex}"
}

resource "aws_s3_object" "lr_model_file" {
  bucket = aws_s3_bucket.lr_model_bucket.id
  key    = "model.pth"
  source = "../apps/linear_regression/saved_apps/model.pth"
}