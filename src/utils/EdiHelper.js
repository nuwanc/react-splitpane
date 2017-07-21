import Store from './Store';

function getSegments(message, ignoreTransactions) {
    let segments = [];

    if (message.ISA != null || message.UNB != null) {
        //is interchange
        let isa = message.ISA || message.UNB;
        segments.push(processSegment(isa));
        let groups = message.group.length;
        for (let i = 0; i < groups; i++) {
            let gs = message.group[i].GS ||  message.group[i].UNG;
            segments.push(processSegment(gs));
            if (!ignoreTransactions) {
                let transactions = message.group[i].transaction.length;
                for (let j = 0; j < transactions; j++) {
                    let transaction = message.group[i].transaction[j];
                    processSegments(transaction.c, segments);
                }
            }
            let ge = message.group[i].GE ||  message.group[i].UNE;
            segments.push(processSegment(ge));
        }
        let iea = message.IEA || message.UNZ;
        segments.push(processSegment(iea));

    } else if (message.GS != null || message.UNG != null) {
        let gs = message.GS || message.UNG;
        segments.push(processSegment(gs));
        if (!ignoreTransactions) {
            let transactions = message.transaction.length;
            for (let j = 0; j < transactions; j++) {
                let transaction = message.transaction[j];
                processSegments(transaction.c, segments);
            }
        }
        let ge = message.GE || message.UNE;
        segments.push(processSegment(ge));
    } else if (message.ST != null || message.UNH) {
        processSegments(message.c, segments);
    }

    return segments;
}

function processSegment(inSegment, isHeader = true) {
    let segment = {};

    if (inSegment !== undefined && inSegment !== null) {
        segment.name = inSegment.n;
        segment.path = inSegment.p;
        segment.element = inSegment.e;
        if (isHeader) {
            segment.schema = Store.lookupHeaderPath(inSegment.p);
        } else {
            segment.schema = Store.lookupSegmentPath(inSegment.p);
        }
        return segment;
    } else {
        segment.name = " ";
        segment.path = " ";
        segment.element = [];
        segment.schema = {};
        return segment;
    }
}


function processSegments(children, segments) {
    let segment = {};
    children.forEach((v, i) => {
        segment = {};
        if (v.t && v.t === 'segment') {
            segment.name = v.n;
            segment.path = v.p;
            segment.element = v.e;
            segment.schema = Store.lookupSegmentPath(v.p);
            segments.push(segment);
        } else {
            if (v.c) {
                processSegments(v.c, segments);
            }
        }
    })
}

function segmentPathToRootPath(segmentPath) {
    let paths = segmentPath.split("/");
    if (paths.length > 3) {
        return paths.slice(0,3).join("/");
    } else {
        if (paths.length === 3) {
            if (paths[1] === paths[2]) {
                return paths.slice(0,2).join("/");
            } else {
                return paths.join("/");
            }
        } else if (paths.length === 2) {
            if (paths[0] === paths[1]){
                return paths.slice(0,1).join("/");
            } else {
                return paths.join("/");
            }
        }
    }
}

function serverPathToJsonPath(serverPath) {
    //ISA[1]/GS[1]/856[1]/BSN[1]
    //ISA[1]/GS[1]/GS[1]/2
    //ISA[1]/ISA[1]
    //ISA[1]/GS[1]/GS[1]
    let paths = serverPath.split("/");
    if (paths.length > 3) {
        let indexes = [];
        paths.forEach((v, i) => {
            indexes.push(v.substring(v.indexOf("[") + 1, v.indexOf("]")));
        })
        let jsonPath = "";
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0:
                    jsonPath = jsonPath + ".interchange[" + (indexes[i] - 1) + "]";
                    break;
                case 1:
                    jsonPath = jsonPath + ".group[" + (indexes[i] - 1) + "]";
                    break;
                case 2:
                    jsonPath = jsonPath + ".transaction[" + (indexes[i] - 1) + "]";
                    break;
                default:
                    jsonPath = "";
                    break;
            }
        }
        return jsonPath;
    } else {
        let jsonPath = "";
        if (paths.length === 2) {
            if (paths[0] === paths[1]) {
                let index = paths[1].substring(paths[1].indexOf("[")+1,paths[1].indexOf("]"));
                jsonPath = jsonPath + ".interchange[" + (index - 1) + "]";
            }
            return jsonPath;
        } 
        if (paths.length === 3) {
            if (paths[1] === paths[2]) {
                let index = paths[1].substring(paths[1].indexOf("[")+1,paths[1].indexOf("]"));
                jsonPath = jsonPath + ".interchange[" + (index - 1) + "]";
                index = paths[2].substring(paths[2].indexOf("[")+1,paths[2].indexOf("]"));
                jsonPath = jsonPath + ".group[" + (index - 1) +"]";
            }
            return jsonPath;
        }
    }

    return null;
}

function getSchemaDetails(name) {
    let type = name.split(":")[0];
    let elements;
    switch (type) {
        case 'code':
            elements = Store.schema["code"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let code = elements[i];
                if (code.name === name) {
                    return code;
                }
            }
            break;
        case 'simple':
            elements = Store.schema["simple"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let simple = elements[i];
                if (simple.name === name) {
                    return simple;
                }
            }
            break;
        case 'composite':
            elements = Store.schema["composite"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let composite = elements[i];
                if (composite.name === name) {
                    return composite;
                }
            }
            break;
        case 'mpcode':
            elements = Store.schema["mpcode"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let mpcode = elements[i];
                if (mpcode.name === name) {
                    return mpcode;
                }
            }
            break;
        case 'segment':
            elements = Store.schema["segment"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let segment = elements[i];
                if (segment.name === name) {
                    return segment;
                }
            }
            break;
        case 'loop':
            elements = Store.schema["loop"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let loop = elements[i];
                if (loop.name === name) {
                    return loop;
                }
            }
            break;
        case 'transaction':
            elements = Store.schema["transaction"];
            for (let i = 0, len = elements.length; i < len; i++) {
                let transaction = elements[i];
                if (transaction.name === name) {
                    return transaction;
                }
            }
            break;
        default:
            return null;
    }
}


export { getSegments, getSchemaDetails, serverPathToJsonPath, processSegment, segmentPathToRootPath };