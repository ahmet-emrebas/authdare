const { mkdir } = require( "original-fs" )

const createDir = document.getElementById( 'create-dir' )

createDir.addEventListener( 'click', () => {
    mkdir( 'Folder', ( err ) => {
        console.error( err );
    } );
} )


