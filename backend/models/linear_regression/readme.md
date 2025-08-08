# Installation process:
**Init new virtual environment**
`python3 -m venv venv`

**Activate the virtual environment**
`source venv/bin/activate`

**Install Libraries from requirements.txt**
`pip3 install -r requirements.txt`

**Run**
`python3 build_model.py`

**Infra guide**
1. Upload model to S3 bucket using tf
2. Create Lambda function .py file
3. Convert Lambda Function to .zip file using `build_lr_lmb.sh` script
4. Upload Lambda to AWS using tf
5. Generate layer file for packages using `build_lr_external_packages_layer.sh` script (f.e. with torch)
6. Create and upload layer to AWS using tf
7. Connect layer with lambda using tf
8. Read model from S3 bucket (all packages should be in layers)
9. Use model for predictions 