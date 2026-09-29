@echo off
cd /d %~dp0
echo ============================================
echo  Vibe Coding UI Component Dictionary
echo  Browser will open at http://localhost:5173/
echo  Press Ctrl+C or close this window to stop
echo ============================================
npm run dev -- --open
pause
