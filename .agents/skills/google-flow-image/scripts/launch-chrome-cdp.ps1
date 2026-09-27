<#
.SYNOPSIS
  Launch Google Chrome with Remote Debugging enabled (CDP port 9222)
  for Google Flow (labs.google/fx/tools/flow).

.DESCRIPTION
  Uses a dedicated user data profile (~/.chrome-cdp-profile) so that it can run
  alongside existing Chrome windows without conflict and persist your Google login.
#>

[CmdletBinding()]
param(
  [int]$Port = 9222,
  [string]$ProfileDir = "$env:USERPROFILE\.chrome-cdp-profile",
  [string]$Url = "https://labs.google/fx/tools/flow"
)

$ChromeCandidates = @(
  "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$ChromePath = $null
foreach ($path in $ChromeCandidates) {
  if (Test-Path $path) {
    $ChromePath = $path
    break
  }
}

if (-not $ChromePath) {
  Write-Error "Google Chrome executable not found in standard paths."
  exit 1
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Launching Chrome with CDP on port $Port" -ForegroundColor Green
Write-Host " Profile: $ProfileDir" -ForegroundColor Yellow
Write-Host " URL:     $Url" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not (Test-Path $ProfileDir)) {
  New-Item -ItemType Directory -Path $ProfileDir -Force | Out-Null
}

$Args = @(
  "--remote-debugging-port=$Port",
  "--user-data-dir=`"$ProfileDir`"",
  "--no-first-run",
  "--no-default-browser-check",
  "`"$Url`""
)

Start-Process -FilePath $ChromePath -ArgumentList ($Args -join " ")
Write-Host "Chrome launched! Please log in with your Google account on the browser if needed." -ForegroundColor Green
