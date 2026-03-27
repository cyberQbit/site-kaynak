$batPath = "$env:TEMP\DevSwift.bat"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/cyberQbit/DevSwift/main/DevSwift.bat" -OutFile $batPath -UseBasicParsing
Start-Process -FilePath $batPath
