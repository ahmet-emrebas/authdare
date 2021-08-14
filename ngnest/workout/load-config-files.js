const fs = require( 'fs' );
const yaml = require( 'js-yaml' );
const { join } = require( 'path' );


function loadConfigFiles ( dirname = './config' ) {
    const config = fs.readdirSync( dirname )
        .map( e => e.match( /conf|env|config/, 'i' ).input )
        .filter( e => e )
        .map( e => {

            return {
                type: e.split( '.' ).pop(),
                content: fs.readFileSync( join( dirname, e ) ).toString()
            };
        } )
        .map( ( { type, content } ) => {
            // console.log( type, content )


            if ( type == 'yaml' ) return yaml.load( content );
            if ( type == 'json' ) return JSON.parse( content );
            if ( type == 'env' || type == 'config' || type == 'conf' )
                return content.split( '\n' ).map( e => e.split( '=' ) )
                    .filter( e => e.length >= 2 )
                    .map( e => {
                        return { [ e[ 0 ].trim() ]: e[ 1 ].trim() }
                    } ).reduce( ( a, b ) => ( { ...a, ...b } ) )
        } )
        .filter( e => e )
        .reduce( ( a, b ) => ( { ...a, ...b } ) )
}

loadConfigFiles( './assets/config' )