export default function (object: object) {
    return JSON.stringify(object)
        .replace(/"(\w+)":/g, '$1=')
        //surround numbers with curly braces
        .replace(/\d+/g, '{$&}')
        //replace commas with space
        .replace(/,/g, ' ')
        //remove curly braces from beginning and end
        .replace(/^\{|}$/g, '');
}