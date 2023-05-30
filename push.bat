@echo off

echo AutoPush github
set /p input= Type the commit
git add .
git commit -m "%input%"
git push

pause
