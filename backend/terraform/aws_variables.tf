variable "aws_region" {
  description = "The AWS region to deploy resources into"
  type        = string
  default     = "eu-central-1"
}

variable "repository_name" {
  default = "pytorch-lambda"
}

variable "lambda_function_name" {
  default = "pytorch-lambda-fn"
}

variable "image_tag" {
  default = "20250903215442"
}