/**
 * Map entities classes to key value object that can be access like entities[users],entities[products]
 * @example
 * Given    [{ groupID:632, name:"ahmet", age:30}, { groupID:571  name:"Muhammed", age:40}]
 * When     When I run ``` mapArrayByKey(given, (item)=>item.groupID)
 * Then     { 632:{...name:'ahmet'}, 571:{...name:"Muhammed"}}
 */
export function groupByOverride<T>(arr: T[], keypicker: (item: T) => keyof T) {
    return arr
        .map((e) => {
            const key = keypicker(e);
            return {
                [key]: e,
            };
        })
        .reduce((p, c) => ({ ...p, ...c }));
}
