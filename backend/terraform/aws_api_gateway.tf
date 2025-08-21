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

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.house_price_prediction_lambda.invoke_arn
}

output "api_gateway_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

resource "aws_apigatewayv2_route" "lambda_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /house_price/predict"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}