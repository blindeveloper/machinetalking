## Frontend
## Backend
### AWS is used for serverless setup
### Terraform integration
AWS services are controlled by terraform, splitted by separate terraform files for easier management.
### Scripts
All the operations with backend are happening from script folder.
There multiple scripts for model, lambdas and aws layers build.
### Training and building model
### Deploying model
### Logging
Lambda is connected to CloudWatch via dedicated log group for monitoring of events happening in lambda.
### Monitoring
AWS cloudwatch log metric are tuned in the way to send notifications in case of any errors happening in lambda layer. 