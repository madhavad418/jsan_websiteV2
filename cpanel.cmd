@echo off
REM cPanel deploy wrapper  runs the JS deploy script with all passed args.
REM Usage (cmd):        cpanel --prod
REM Usage (PowerShell): .\cpanel --prod
node "%~dp0scripts\cpanel-deploy.js" %*
