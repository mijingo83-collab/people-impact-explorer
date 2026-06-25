param(
  [string]$RepoUrl = "",
  [string]$Branch = "main",
  [string]$CommitMessage = "Publish People Impact Explorer report"
)

$ErrorActionPreference = "Stop"

$git = "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin\git.exe"
$defaultRepoUrl = "https://github.com/mijingo83-collab/people-impact-explorer.git"

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
  $RepoUrl = Read-Host "GitHub repository URL (.git)"
}

if ([string]::IsNullOrWhiteSpace($RepoUrl)) {
  $RepoUrl = $defaultRepoUrl
}

if (-not (Test-Path $git)) {
  throw "Git executable not found: $git"
}

$userName = (& $git config user.name 2>$null)
$userEmail = (& $git config user.email 2>$null)

if ([string]::IsNullOrWhiteSpace($userName) -or [string]::IsNullOrWhiteSpace($userEmail)) {
  throw "Git user.name / user.email is not configured. Run: git config --global user.name ""Your Name"" and git config --global user.email ""you@example.com"""
}

Write-Host "Using git: $git"
Write-Host "Working directory: $(Get-Location)"
Write-Host "Repository URL: $RepoUrl"

if (-not (Test-Path ".git\HEAD")) {
  Write-Host "Initializing git repository..."
  & $git init
  if ($LASTEXITCODE -ne 0) { throw "git init failed." }
}

Write-Host "Setting branch to $Branch ..."
& $git branch -M $Branch
if ($LASTEXITCODE -ne 0) { throw "git branch failed." }

$hasOrigin = $false
try {
  $originUrl = & $git remote get-url origin 2>$null
  if ($LASTEXITCODE -eq 0 -and $originUrl) {
    $hasOrigin = $true
  }
} catch {
  $hasOrigin = $false
}

if ($hasOrigin) {
  Write-Host "Updating origin remote..."
  & $git remote set-url origin $RepoUrl
  if ($LASTEXITCODE -ne 0) { throw "git remote set-url failed." }
} else {
  Write-Host "Adding origin remote..."
  & $git remote add origin $RepoUrl
  if ($LASTEXITCODE -ne 0) { throw "git remote add failed." }
}

Write-Host "Staging files..."
& $git add .
if ($LASTEXITCODE -ne 0) { throw "git add failed." }

try {
  & $git diff --cached --quiet
  if ($LASTEXITCODE -eq 0) {
    Write-Host "No staged changes to commit."
  }
} catch {
}

& $git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creating commit..."
  & $git commit -m $CommitMessage
  if ($LASTEXITCODE -ne 0) { throw "git commit failed." }
} else {
  Write-Host "Skipping commit because there are no staged changes."
}

Write-Host "Pushing to origin/$Branch ..."
& $git push -u origin $Branch
if ($LASTEXITCODE -ne 0) { throw "git push failed." }

Write-Host ""
Write-Host "Done."
Write-Host "If GitHub Pages is enabled, expected URLs:"
Write-Host "https://mijingo83-collab.github.io/people-impact-explorer/"
Write-Host "https://mijingo83-collab.github.io/people-impact-explorer/outputs/latest.html"
