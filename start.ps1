#!/usr/bin/env pwsh
# start.ps1 — Start Healytics backend + frontend together
# Usage: .\start.ps1

Write-Host "`n🚀 Starting Healytics..." -ForegroundColor Cyan

# Start backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔧 Healytics Backend — http://localhost:3001' -ForegroundColor Green; node server.js"

# Wait a moment for backend to start
Start-Sleep 2

# Start frontend in current window
Write-Host "🎨 Starting frontend at http://localhost:8080 ..." -ForegroundColor Green
Set-Location $PSScriptRoot
npm run dev
