FROM public.ecr.aws/lambda/python:3.9

# Install PyTorch
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

# Copy function code
COPY app.py ${LAMBDA_TASK_ROOT}

# Command for Lambda
CMD ["app.lambda_handler"]