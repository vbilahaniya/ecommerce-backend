pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REPO = "440422120931.dkr.ecr.ap-south-1.amazonaws.com/ecommerce_backend"
        IMAGE_TAG = "latest"
        KUBECONFIG = "/var/lib/jenkins/.kube/config"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/vbilahaniya/ecommerce-backend.git'
            }
        }

        stage('Authenticate with ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Push Image to ECR') {
            steps {
                script {
                    sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    sh "kubectl apply -f deployment.yaml"
                    sh "kubectl apply -f service.yaml"
					sh "kubectl apply -f config.yaml"
                }
            }
        }
    }
}
