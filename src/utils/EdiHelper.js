function getSegments(message) {
    let segments = [];
    let segment = {};

    if (message.ISA != null) {
        //is interchange
        let isa = message.ISA;
        segment = {};
        segment.name = isa.name;
        segment.element = isa.element;
        segments.push(segment);
        let groups = message.group.length;
        for (let i = 0; i < groups; i++) {
            let gs = message.group[i].GS;
            segment = {};
            segment.name = gs.name;
            segment.element = gs.element;
            segments.push(segment);
            let transactions = message.group[i].transaction.length;
            for (let j = 0; j < transactions; j++) {
                let transaction = message.group[i].transaction[j];
                let st = transaction.ST;
                segment = {};
                segment.name = st.name;
                segment.element = st.element;
                segments.push(segment);
                processSegments(transaction.children,segments);
                let se = transaction.SE;
                segment = {};
                segment.name = se.name;
                segment.element = se.element;
                segments.push(segment);
            }
            let ge = message.group[i].GE;
            segment = {};
            segment.name = ge.name;
            segment.element = ge.element;
            segments.push(segment);
        }
        let iea = message.IEA;
        segment = {};
        segment.name = iea.name;
        segment.element = iea.element;
        segments.push(segment);

    } else if (message.GS != null) {
        let gs = message.GS;
        segment = {};
        segment.name = gs.name;
        segment.element = gs.element;
        segments.push(segment);
        let transactions = message.transaction.length;
        for (let j = 0; j < transactions; j++) {
            let transaction = message.transaction[j];
            let st = transaction.ST;
            segment = {};
            segment.name = st.name;
            segment.element = st.element;
            segments.push(segment);
            processSegments(transaction.children,segments);
            let se = transaction.SE;
            segment = {};
            segment.name = se.name;
            segment.element = se.element;
            segments.push(segment);
        }
        let ge = message.GE;
        segment = {};
        segment.name = ge.name;
        segment.element = ge.element;
        segments.push(segment);
    } else if (message.ST != null) {
        let st = message.ST;
        segment = {};
        segment.name = st.name;
        segment.element = st.element;
        segments.push(segment);
        processSegments(message.children,segments);
        let se = message.SE;
        segment = {};
        segment.name = se.name;
        segment.element = se.element;
        segments.push(segment);
    }

    return segments;
}

function processSegments(children, segments) {
    let segment = {};
    children.forEach((v, i) => {
        if (v.type && v.type === 's') {
            segment.name = v.name;
            segment.element = v.element;
            segments.push(segment);
        } else {
            if (v.children) {
                processSegments(v.children,segments);
            }
        }
    })
}

export {getSegments};