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
1. Write lambda in app.py
2. Create new ECR container
3. Add new lambda
4. Deploy lambda image to ECR using ./build_and_push_lambda.sh
5. Test lambda