# =============================================Uploading of Layers to S3
# Upload external_packages_layer to S3
resource "aws_s3_object" "external_packages_layer" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "house_price_pred_external_pkgs_layer_17546537043N"
  source = "../bundles/house_price_prediction/house_price_pred_external_pkgs_layer_17546537043N.zip" # Path to your local zip file
  etag   = filemd5("../bundles/house_price_prediction/house_price_pred_external_pkgs_layer_17546537043N.zip")
}

# Upload internal_packages_layer to S3
resource "aws_s3_object" "internal_packages_layer" {
  bucket = aws_s3_bucket.model_bucket.id
  key    = "house_price_pred_internal_packages_layer_17546531453N"
  source = "../bundles/house_price_prediction/house_price_pred_internal_packages_layer_17546531453N.zip" # Path to your local zip file
  etag   = filemd5("../bundles/house_price_prediction/house_price_pred_internal_packages_layer_17546531453N.zip")
}

# Upload LR external_packages_layer to S3
resource "aws_s3_object" "lr_external_packages_layer" {
  bucket = aws_s3_bucket.lr_model_bucket.id
  key    = "lin_reg_external_pkgs_layer_17546471283N"
  source = "../bundles/linear_regression/lin_reg_external_pkgs_layer_17546471283N.zip" # Path to your local zip file
  etag   = filemd5("../bundles/linear_regression/lin_reg_external_pkgs_layer_17546471283N.zip")
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

#  Create the lr_external_packages_layer Layer with Terraform
resource "aws_lambda_layer_version" "lr_external_packages_layer" {
  layer_name          = "lr-external-packages-layer"
  description         = "Lambda layer with external packages codebase"
  compatible_runtimes = ["python3.8","python3.9"] # Specify the runtimes
  s3_bucket           = aws_s3_bucket.lr_model_bucket.id
  s3_key              = aws_s3_object.lr_external_packages_layer.key
}
