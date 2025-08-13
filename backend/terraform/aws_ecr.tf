# 1️⃣ Create ECR repository for the Lambda image
resource "aws_ecr_repository" "pytorch_repo" {
  name = var.repository_name
}

# 5️⃣ Output ECR repo URL
output "ecr_repo_url" {
  value = aws_ecr_repository.pytorch_repo.repository_url
}