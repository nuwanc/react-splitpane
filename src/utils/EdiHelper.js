import Store from './Store';

function getSegments(message, ignoreTransactions) {
    let segments = [];
    let segment = {};

    if (message.ISA != null) {
        //is interchange
        let isa = message.ISA;
        segment = {};
        segment.name = isa.n;
        segment.path = isa.p;
        segment.element = isa.e;
        segment.schema = Store.lookupHeaderPath(isa.p);
        segments.push(segment);
        let groups = message.group.length;
        for (let i = 0; i < groups; i++) {
            let gs = message.group[i].GS;
            segment = {};
            segment.name = gs.n;
            segment.path = gs.p;
            segment.element = gs.e;
            segment.schema = Store.lookupHeaderPath(gs.p);
            segments.push(segment);
            if (!ignoreTransactions) {
                let transactions = message.group[i].transaction.length;
                for (let j = 0; j < transactions; j++) {
                    let transaction = message.group[i].transaction[j];
                    processSegments(transaction.c, segments);
                }
            }
            let ge = message.group[i].GE;
            segment = {};
            segment.name = ge.n;
            segment.path = ge.p;
            segment.element = ge.e;
            segment.schema = Store.lookupHeaderPath(ge.p);
            segments.push(segment);
        }
        let iea = message.IEA;
        segment = {};
        segment.name = iea.n;
        segment.path = iea.p;
        segment.element = iea.e;
        segment.schema = Store.lookupHeaderPath(iea.p);
        segments.push(segment);

    } else if (message.GS != null) {
        let gs = message.GS;
        segment = {};
        segment.name = gs.n;
        segment.path = gs.p;
        segment.element = gs.e;
        segment.schema = Store.lookupHeaderPath(gs.p);
        segments.push(segment);
        if (!ignoreTransactions) {
            let transactions = message.transaction.length;
            for (let j = 0; j < transactions; j++) {
                let transaction = message.transaction[j];
                processSegments(transaction.c, segments);
            }
        }
        let ge = message.GE;
        segment = {};
        segment.name = ge.n;
        segment.path = ge.p;
        segment.element = ge.e;
        segment.schema = Store.lookupHeaderPath(ge.p);
        segments.push(segment);
    } else if (message.ST != null) {
        processSegments(message.c, segments);
    }

    return segments;
}

function processSegments(children, segments) {
    let segment = {};
    children.forEach((v, i) => {
        segment = {};
        if (v.t && v.t === 'segment') {
            segment.name = v.n;
            segment.path = v.p;
            segment.element = v.e;
            segment.schema = Store.lookupSegmentPath(v.p); //getSchemaDetails(v.t + ":" + v.n);
            segments.push(segment);
        } else {
            if (v.c) {
                processSegments(v.c, segments);
            }
        }
    })
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

export { getSegments, getSchemaDetails, serverPathToJsonPath };