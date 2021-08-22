const { app, BrowserWindow } = require( 'electron' )
const { join } = require( 'path' );

async function createWindow () {
    const win = new BrowserWindow( {
        width: 800,
        height: 800,
        darkTheme: true,
        webPreferences: {
            preload: join( __dirname, 'preload.js' )
        }
    } )

    await win.loadFile( join( __dirname, 'public', 'index.html' ) );
}


app.whenReady().then( () => {
    createWindow()

    app.on( 'activate', function () {
        if ( BrowserWindow.getAllWindows().length === 0 ) createWindow()
    } )

} ).catch( err => {
    console.error( err );
} )