# Installation process:
**Init new virtual environment**
`python3 -m venv venv`

**Activate the virtual environment**
`source venv/bin/activate`

**Install Libraries from requirements.txt**
`pip3 install -r requirements.txt`

**Run**
`python3 build_model.py`

**Infra**
1. Upload model to S3 bucket using tf
2. Create Lambda function
    2-a. Get model from S3 bucket
    2-b. Use model for predictions
3. Convert Lambda Function to zip file using `build_lr_lmb.sh` script
4. Upload Lambda to AWS using tf