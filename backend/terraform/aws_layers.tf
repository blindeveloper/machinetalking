# =============================================Uploading of Layers to S3
# Upload external_packages_layer to S3
resource "aws_s3_object" "external_packages_layer" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "external_pkgs_layer_17448089863N.zip"
  source = "../bundles/external_pkgs_layer_17448089863N.zip" # Path to your local zip file
  etag   = filemd5("../bundles/external_pkgs_layer_17448089863N.zip")
}

# Upload internal_packages_layer to S3
resource "aws_s3_object" "internal_packages_layer" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "internal_packages_layer_17447254283N.zip"
  source = "../bundles/internal_packages_layer_17447254283N.zip" # Path to your local zip file
  etag   = filemd5("../bundles/internal_packages_layer_17447254283N.zip")
}

# =============================================Creation of Layers
#  Create the Lambda Layer with Terraform
resource "aws_lambda_layer_version" "external_packages_layer" {
  layer_name          = "external-packages-layer"
  description         = "Lambda with external packages"
  compatible_runtimes = ["python3.8","python3.9"] # Specify the runtimes
  s3_bucket           = aws_s3_bucket.model_bucket.id
  s3_key              = aws_s3_object.external_packages_layer.key
}

#  Create the build_model_layer Layer with Terraform
resource "aws_lambda_layer_version" "internal_packages_layer" {
  layer_name          = "internal-packages-layer"
  description         = "Lambda layer with internal packages codebase"
  compatible_runtimes = ["python3.8","python3.9"] # Specify the runtimes
  s3_bucket           = aws_s3_bucket.model_bucket.id
  s3_key              = aws_s3_object.internal_packages_layer.key
}
