# AWS Deployment Plan for VivaMarket E-commerce Application

This document outlines the architecture and deployment plan for the VivaMarket e-commerce application on AWS infrastructure.

## Architecture Overview

![AWS Architecture Diagram](https://d1.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/load-balanced-microservices-containers-on-aws-ra.007a0cb4e5bdf61efe6f9c13fb90405e47f2fcc2.png)

### Key Components:

1. **Frontend (Next.js Application)**
   - Hosted on AWS Amplify or Vercel with AWS integration
   - CloudFront CDN for global content delivery

2. **Backend Services (Node.js)**
   - API Gateway for REST endpoints
   - Lambda functions for serverless execution
   - ECS/Fargate for containerized services

3. **Database Layer**
   - DynamoDB for product catalog and user preferences
   - RDS (PostgreSQL) for transactional data (orders, payments)

4. **Authentication**
   - Amazon Cognito for user management
   - JWT token-based authentication

5. **Storage**
   - S3 for static assets and product images
   - ElastiCache for session management

6. **DevOps**
   - CodePipeline for CI/CD
   - CloudFormation for infrastructure as code
   - CloudWatch for monitoring and logging

## Deployment Steps

### 1. Infrastructure Setup

```bash
# Set up core infrastructure with CloudFormation
aws cloudformation create-stack \
  --stack-name vivamarket-infra \
  --template-body file://infra-templates/core-infra.yaml \
  --capabilities CAPABILITY_IAM

# Create networking resources
aws cloudformation create-stack \
  --stack-name vivamarket-network \
  --template-body file://infra-templates/network.yaml
```

### 2. Database Provisioning

```bash
# Set up DynamoDB tables
aws dynamodb create-table \
  --table-name products \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier vivamarket-db \
  --db-instance-class db.t3.small \
  --engine postgres \
  --allocated-storage 20
```

### 3. S3 Bucket for Assets

```bash
# Create bucket for static assets
aws s3 mb s3://vivamarket-assets

# Configure bucket for website hosting
aws s3 website s3://vivamarket-assets \
  --index-document index.html
```

### 4. CI/CD Pipeline

```bash
# Create CodePipeline for frontend
aws codepipeline create-pipeline \
  --pipeline-name vivamarket-frontend-pipeline \
  --pipeline-definition file://pipeline-defs/frontend-pipeline.json

# Create CodePipeline for backend
aws codepipeline create-pipeline \
  --pipeline-name vivamarket-backend-pipeline \
  --pipeline-definition file://pipeline-defs/backend-pipeline.json
```

### 5. Backend Deployment

```bash
# Deploy API Gateway
aws apigateway import-rest-api \
  --body file://api-specs/vivamarket-api.yaml

# Deploy Lambda functions
aws lambda create-function \
  --function-name get-products \
  --runtime nodejs18.x \
  --role arn:aws:iam::123456789012:role/lambda-execution \
  --handler index.handler \
  --zip-file fileb://dist/get-products.zip
```

### 6. Frontend Deployment

```bash
# Build Next.js application
npm run build

# Deploy to S3
aws s3 sync out/ s3://vivamarket-frontend

# Create CloudFront distribution
aws cloudfront create-distribution \
  --origin-domain-name vivamarket-frontend.s3.amazonaws.com
```

## Monitoring and Scaling

### CloudWatch Alarms

```bash
# Create CPU utilization alarm
aws cloudwatch put-metric-alarm \
  --alarm-name high-cpu-utilization \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 70 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2 \
  --alarm-actions arn:aws:sns:us-east-1:123456789012:notify-ops
```

### Auto-Scaling

```bash
# Create auto-scaling policy
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name vivamarket-backend-asg \
  --policy-name cpu-scaling-policy \
  --policy-type TargetTrackingScaling \
  --target-tracking-configuration file://scaling-policies/cpu-target.json
```

## Estimated Costs

| Service               | Monthly Cost (Estimated) |
|-----------------------|--------------------------|
| EC2/ECS               | $80-120                  |
| RDS                   | $30-50                   |
| DynamoDB              | $20-40                   |
| S3 + CloudFront       | $15-30                   |
| API Gateway + Lambda  | $10-20                   |
| Other Services        | $25-40                   |
| **Total (Estimated)** | **$180-300**             |

## Security Considerations

1. Implement WAF for web application protection
2. Use IAM roles with least privilege principle
3. Enable CloudTrail for comprehensive audit logs
4. Implement VPC security groups and network ACLs
5. Enable encryption at rest for all data storage
6. Set up GuardDuty for threat detection

## Disaster Recovery

- Use multi-region deployment for critical components
- Implement daily automated backups for databases
- Document recovery procedures for each service
- Set up cross-region replication for S3 buckets
- Create Recovery Time Objective (RTO) and Recovery Point Objective (RPO) standards