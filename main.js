const{app,BrowserWindow} = require('electron')
const createWindow=()=>{
const win=new BrowserWindow({
    width:478,
    height:340,
    autoHideMenuBar:true,
    resizable:false,
    icon: __dirname + './favicon.ico',
})

win.loadFile('index.html')
}
app.whenReady().then(()=>{
createWindow()
})
app.on('window-all-closed',()=>{
if(process.platform!=='darwin')app.quit()
})