@echo off 
set ServiceName=CheckinService
set ServiceDescription="Checkin Service"
set ServiceLocation=%CD%\..\CheckinService.exe
echo.
echo   Service location: %ServiceLocation%
echo. 
echo       * * * * * * * * * * * * * * * * * * * * * * * * 
echo       *                                             *
echo       *      Creating Service '%ServiceName%'
echo       *                                             *
echo       * * * * * * * * * * * * * * * * * * * * * * * * 
echo.  
echo. 
sc create %ServiceName% binPath= %ServiceLocation%
sc description %ServiceName% %ServiceDescription%
sc config %ServiceName% start= AUTO
echo.  

PAUSE
