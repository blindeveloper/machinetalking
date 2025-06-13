# S3 Bucket for Model Storage
resource "aws_s3_bucket" "model_bucket" {
  bucket = "house-price-prediction-model-bucket"
}

resource "aws_s3_object" "model_file" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "model_1744724704225.pkl"
  source = "./bundles/model_1744724704225.pkl"
}