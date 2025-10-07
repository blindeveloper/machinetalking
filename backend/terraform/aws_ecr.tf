# 1️⃣ Create ECR repository for the Lambda image
resource "aws_ecr_repository" "pytorch_repo" {
  name = var.repository_name
}

# 5️⃣ Output ECR repo URL
output "ecr_repo_url" {
  value = aws_ecr_repository.pytorch_repo.repository_url
}

resource "aws_ecr_repository" "lang_chain_repo" {
  name = "lang_chain_lambda"
}

output "langchain_ecr_repo_url" {
  value = aws_ecr_repository.lang_chain_repo.repository_url
}