# API Gateway
resource "aws_apigatewayv2_api" "http_api" {
  name          = "ml-api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["https://machinetalking.com", "http://localhost:5173"]
    allow_headers = ["Content-Type", "Authorization"]
    allow_methods = ["POST", "OPTIONS"]
    max_age       = 3600
  }
}

# CloudWatch Log Group for API Gateway
resource "aws_cloudwatch_log_group" "http_api_logs" {
  name              = "/aws/apigateway/ml-api"
  retention_in_days = 14
}

# Enable access logging for API Gateway Stage
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.http_api_logs.arn
    format = jsonencode({
      requestId        = "$context.requestId"
      requestTimeEpoch = "$context.requestTimeEpoch"
      httpMethod       = "$context.httpMethod"
      routeKey         = "$context.routeKey"
      status           = "$context.status"
      integrationError = "$context.integrationErrorMessage"
      errorMessage     = "$context.error.message"
    })
  }

  default_route_settings {
    detailed_metrics_enabled = true
    throttling_burst_limit = 1000
    throttling_rate_limit  = 500
  }
}

# This line tells API Gateway which role to use for logs
output "api_gateway_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}
# =============================================
# lambda connections
# =============================================
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.house_price_prediction_lambda.invoke_arn
}

resource "aws_apigatewayv2_integration" "pytorch_lambda_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.pytorch_lambda.invoke_arn
}
# =============================================
# Route mappings
# =============================================
resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /house_price/predict"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "lin_reg_predict" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /lin_reg/predict"
  target    = "integrations/${aws_apigatewayv2_integration.pytorch_lambda_integration.id}"
}