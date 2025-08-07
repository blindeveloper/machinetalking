resource "aws_cloudwatch_log_metric_filter" "error_filter" {
  name           = "lambda-error-filter"
  log_group_name = "/aws/lambda/house-price-prediction"

  pattern = "ERROR"

  metric_transformation {
    name      = "LambdaErrorCount"
    namespace = "LambdaLogMetrics"
    value     = "1"
  }
}

resource "aws_cloudwatch_metric_alarm" "lambda_error_alarm" {
  alarm_name          = "lambda-error-alarm"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = aws_cloudwatch_log_metric_filter.error_filter.metric_transformation[0].name
  namespace           = aws_cloudwatch_log_metric_filter.error_filter.metric_transformation[0].namespace
  period              = 60
  statistic           = "Sum"
  threshold           = 1
  alarm_description   = "Triggered when Lambda logs contain 'ERROR'"

  alarm_actions       = [aws_sns_topic.alerts.arn]
}

resource "aws_sns_topic" "alerts" {
  name = "lambda-error-alerts"
}

resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "m.shavkunov@gmail.com"
}