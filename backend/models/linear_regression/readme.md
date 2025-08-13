# local Installation process:
**Init new virtual environment**
`python3 -m venv venv`

**Activate the virtual environment**
`source venv/bin/activate`

**Install Libraries from requirements.txt**
`pip3 install -r requirements.txt`

**Run**
`python3 build_model.py`

# Prod infra guide
0. Generate model locally using prev steps
1. Upload model to S3 bucket using tf
2. Write lambda in app.py
3. Make Docker file with instructions to contain image with pytorch
4. Run build_and_push_lambda script to build and push image with pytorch and lambda to AWS ECR
5. Copy image tag from console and paste it in lambda variables tf file
6. Run terraform apply to set new lambda alive
7. Test lambda