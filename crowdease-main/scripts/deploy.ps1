# CrowdEase Deployment Orchestrator
# Automates GitHub Sync and Google Cloud Run Deployment

param (
    [string]$GithubUrl = "https://github.com/CyberKitty30/crowdease.git",
    [string]$ProjectId = "<YOUR_GCP_PROJECT_ID>",
    [string]$Region = "us-central1",
    [string]$ServiceName = "crowdease-digital-twin"
)

Write-Host "--- CrowdEase Production Orchestration ---" -ForegroundColor Cyan

# 1. Check for Git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Please install Git to continue."
    exit
}

# 2. Sync to GitHub
Write-Host "Step 1: Synchronizing with GitHub..." -ForegroundColor Yellow
if (!(Test-Path .git)) {
    git init
    git remote add origin $GithubUrl
}
git add .
git commit -m "chore: production readiness and deployment scripts"
git branch -M main
git push -u origin main

# 3. Check for gcloud
if (!(Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Warning "gcloud CLI not detected. Skipping Cloud Run deployment."
    Write-Host "To deploy manually, install the Google Cloud SDK and run:"
    Write-Host "gcloud builds submit --tag gcr.io/$ProjectId/$ServiceName"
    Write-Host "gcloud run deploy $ServiceName --image gcr.io/$ProjectId/$ServiceName --platform managed --region $Region --allow-unauthenticated"
    exit
}

# 4. Deploy to Cloud Run
Write-Host "Step 2: Deploying to Google Cloud Run..." -ForegroundColor Yellow
gcloud config set project $ProjectId
gcloud builds submit --tag gcr.io/$ProjectId/$ServiceName
gcloud run deploy $ServiceName `
    --image gcr.io/$ProjectId/$ServiceName `
    --platform managed `
    --region $Region `
    --allow-unauthenticated `
    --port 8080

Write-Host "--- Deployment Process Complete ---" -ForegroundColor Green
