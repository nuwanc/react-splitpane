
function isEmptyArrayOrString(value) {
    if (typeof value === 'undefined' || value === null) {
        return true;
    } else {
        if (Array.isArray(value) && value.length === 0) {
            return true;
        } else if ( typeof value === 'string' && value.trim() === ""){
            return true;
        }
    }
    return false;
}

function isNotEmptyArrayOrString(value) {
    if (typeof value === 'undefined' || value === null) {
        return false;
    } else {
        if (Array.isArray(value) && value.length === 0) {
            return false;
        } else if ( typeof value === 'string' && value.trim() === ""){
            return false;
        }
    }
    return true;
}


export {isEmptyArrayOrString,isNotEmptyArrayOrString};