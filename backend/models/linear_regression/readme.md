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
1. Generate model locally using prev steps
2. Create new S3 bucked
3. Create new ECR container
4. Upload model to S3 bucket using tf
5. Write lambda in app.py
6. Make Docker file with instructions to contain image with pytorch
7. Make build_and_push_lambda script to build and push image with pytorch and lambda to AWS ECR
8. run build_and_push_lambda
9. Copy image tag from console and paste it in lambda variables tf file
10. Run terraform apply to set new lambda alive
11. Test lambda