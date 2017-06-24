function getSegments(message) {
    let segments = [];
    let segment = {};

    if (message.ISA != null) {
        //is interchange
        let isa = message.ISA;
        segment = {};
        segment.name = isa.n;
        segment.path = isa.p;
        segment.element = isa.e;
        segments.push(segment);
        let groups = message.group.length;
        for (let i = 0; i < groups; i++) {
            let gs = message.group[i].GS;
            segment = {};
            segment.name = gs.n;
            segment.path = gs.p;
            segment.element = gs.e;
            segments.push(segment);
            let transactions = message.group[i].transaction.length;
            for (let j = 0; j < transactions; j++) {
                let transaction = message.group[i].transaction[j];
                processSegments(transaction.c,segments);
            }
            let ge = message.group[i].GE;
            segment = {};
            segment.name = ge.n;
            segment.path = ge.p;
            segment.element = ge.e;
            segments.push(segment);
        }
        let iea = message.IEA;
        segment = {};
        segment.name = iea.n;
        segment.path = iea.p;
        segment.element = iea.e;
        segments.push(segment);

    } else if (message.GS != null) {
        let gs = message.GS;
        segment = {};
        segment.name = gs.n;
        segment.path = gs.p;
        segment.element = gs.e;
        segments.push(segment);
        let transactions = message.transaction.length;
        for (let j = 0; j < transactions; j++) {
            let transaction = message.transaction[j];
            processSegments(transaction.c,segments);
        }
        let ge = message.GE;
        segment = {};
        segment.name = ge.n;
        segment.path = ge.p;
        segment.element = ge.e;
        segments.push(segment);
    } else if (message.ST != null) {
        processSegments(message.c,segments);
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
            segments.push(segment);
        } else {
            if (v.c) {
                processSegments(v.c,segments);
            }
        }
    })
}

export {getSegments};