export default function (object: object) {
    return JSON.stringify(object)
        .replace(/"(\w+)":/g, '$1=')
        //surround numbers that come directly after an equals with curly braces
        .replace(/=(\d+)/g, '={$1}')
        //replace commas with space
        .replace(/,/g, ' ')
        //remove curly braces from beginning and end
        .replace(/^\{|}$/g, '');
}