# House price prediction Lambda Function
resource "aws_lambda_function" "house_price_prediction_lambda" {
  function_name    = "house-price-prediction"
  runtime          = "python3.9"
  handler          = "house_price_prediction_lambda.lambda_handler"
  role             = aws_iam_role.lambda_role.arn
  timeout          = 60
  memory_size      = 512
  architectures    = ["arm64"]  # Define the architecture (e.g., x86_64 or arm64)

  filename         = "../bundles/lr_lmb_17545851743N.zip"  # Package your Lambda code into a ZIP file
  source_code_hash = filebase64sha256("../bundles/lr_lmb_17545851743N.zip")

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

# Linear regression Lambda Function
resource "aws_lambda_function" "lr_lambda" {
  function_name    = "lr-prediction"
  runtime          = "python3.9"
  handler          = "lr_lambda.lambda_handler"
  role             = aws_iam_role.lambda_role.arn
  timeout          = 60
  memory_size      = 512
  architectures    = ["arm64"]  # Define the architecture (e.g., x86_64 or arm64)

  filename         = "../bundles/lr_lmb_17545851743N.zip"  # Package your Lambda code into a ZIP file
  source_code_hash = filebase64sha256("../bundles/lr_lmb_17545851743N.zip")

  environment {
    variables = {
      LR_MODEL_S3_BUCKET = aws_s3_bucket.lr_model_bucket.id
      LR_MODEL_S3_KEY    = "model.pth"
    }
  }
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.house_price_prediction_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*"
}