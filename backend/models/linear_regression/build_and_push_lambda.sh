#!/usr/bin/env bash
set -euo pipefail

# --- CONFIG ---
AWS_REGION="eu-central-1"
ACCOUNT_ID="815033077205"
REPO_NAME="pytorch-lambda"
# IMAGE_TAG="latest"
IMAGE_TAG=$(date +%Y%m%d%H%M%S)  # timestamp tag
LAMBDA_ARCH="arm64"   # or x86_64 if using AMD64

# --- DETERMINE PLATFORM ---
if [[ "$LAMBDA_ARCH" == "arm64" ]]; then
    PLATFORM="linux/arm64"
elif [[ "$LAMBDA_ARCH" == "x86_64" ]]; then
    PLATFORM="linux/amd64"
else
    echo "❌ Unknown architecture: $LAMBDA_ARCH"
    exit 1
fi

# --- ECR LOGIN ---
echo "🔑 Logging in to ECR..."
aws ecr get-login-password --region "$AWS_REGION" \
    | docker login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# # --- ENSURE REPO EXISTS ---
# if ! aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
#     echo "📦 Creating ECR repository..."
#     aws ecr create-repository --repository-name "$REPO_NAME" --region "$AWS_REGION" >/dev/null
# fi

# --- BUILD IN DOCKER V2 FORMAT ---
echo "🏗 Building image for $PLATFORM..."
DOCKER_BUILDKIT=0 docker build  --no-cache --platform="$PLATFORM" -t "$REPO_NAME" .

# --- TAG IMAGE ---
IMAGE_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${IMAGE_TAG}"
docker tag "$REPO_NAME:latest" "$IMAGE_URI"

# --- PUSH IMAGE ---
echo "🚀 Pushing image to ECR..."
docker push "$IMAGE_URI"

echo "✅ Build & push complete!"
echo "🔗 Image URI: $IMAGE_URI"