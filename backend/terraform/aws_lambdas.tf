# House price prediction Lambda Function
resource "aws_lambda_function" "house_price_prediction_lambda" {
  function_name    = "house-price-prediction"
  runtime          = "python3.9"
  handler          = "house_price_prediction_lambda.lambda_handler"
  role             = aws_iam_role.lambda_role.arn
  timeout          = 60
  memory_size      = 512
  architectures    = ["arm64"]  # Define the architecture (e.g., x86_64 or arm64)

  filename         = "../bundles/house_price_prediction/house_price_prediction_lmb_17546523183N.zip"  # Package your Lambda code into a ZIP file
  source_code_hash = filebase64sha256("../bundles/house_price_prediction/house_price_prediction_lmb_17546523183N.zip")

  environment {
    variables = {
      MODEL_S3_BUCKET = aws_s3_bucket.model_bucket.id
      MODEL_S3_KEY    = "model_1744724704225.pkl"
    }
  }
  layers = [
    aws_lambda_layer_version.external_packages_layer.arn,
    aws_lambda_layer_version.internal_packages_layer.arn,
  ]
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.house_price_prediction_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*"
}

# Lambda function (using ECR container image)
resource "aws_lambda_function" "pytorch_lambda" {
  function_name = var.lambda_function_name
  package_type  = "Image"
  architectures    = ["arm64"]

  image_uri     = "${aws_ecr_repository.pytorch_repo.repository_url}:${var.image_tag}"
  role          = aws_iam_role.lambda_role.arn
  timeout       = 900 # Max for Lambda
  memory_size   = 3008
}