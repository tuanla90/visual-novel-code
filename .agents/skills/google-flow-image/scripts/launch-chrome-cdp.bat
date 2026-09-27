@echo off
setlocal

set PORT=9222
set FLOW_DATA_DIR=D:\Users\tuanla2\.chrome_flow
set PROFILE_DIR=Profile 1
set URL=https://flow.google.com

echo ========================================================
echo Launching Chrome for Google Flow (Port %PORT%)
echo User Data: %FLOW_DATA_DIR%
echo Profile:   %PROFILE_DIR% (Tuấn - nocodeapp.solution@gmail.com)
echo URL:       %URL%
echo ========================================================

start "" "chrome.exe" --remote-debugging-port=%PORT% --user-data-dir="%FLOW_DATA_DIR%" --profile-directory="%PROFILE_DIR%" "%URL%"
echo Chrome started with Profile 1!
endlocal
