!macro customInstall
    ; Create drawio application in the registry
    WriteRegStr HKCR "Applications\drawio.exe\shell\open\command" "" '"C:\Program Files\draw.io\draw.io.exe" "%1"'
!macroend

!macro customUnInstall
    ; Remove drawio application from the registry
    DeleteRegKey HKCR "Applications\drawio.exe"
!macroend