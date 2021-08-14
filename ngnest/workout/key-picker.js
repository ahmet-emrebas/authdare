
/**
 * 
 * @param {item[]} arr 
 * @param {(item)=>item[<GroupField>]} g 
 * @returns 
 */
function groupBy ( arr, g ) {
    let len = arr.length
    for ( let i = 0; i < len; i++ ) {
        const a = arr.pop();
        const b = g( a );
        const c = arr.find( e => e.d == b )
        if ( c ) {
            c.e.push( a )
        } else {
            arr.unshift( ( {
                d: g( a ),
                e: [ a ]
            } ) )
        }
    }
    return arr.map( e => ( { [ e.d ]: e.e } ) ).reduce( ( p, c ) => ( { ...p, ...c } ) );
}


const result = groupBy( [
    { name: 'a', group: 1 },
    { name: "b", group: 1 },
    { name: "c", group: 10 }
], ( item ) => item.group );


console.log( result );


