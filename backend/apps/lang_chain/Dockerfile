# Use the official AWS Lambda Python base image
FROM public.ecr.aws/lambda/python:3.11

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py ${LAMBDA_TASK_ROOT}

# Set the command to your FastAPI handler (via Mangum)
CMD ["app.handler"]