import JSPath from 'jspath';
import Store from './Store';
import * as EdiHelper from './EdiHelper';
import * as Utilities from './Utilities';

function findInDocument(text, node, exact, matchCase) {
    return new Promise((resolve, reject) => {
        let results = new Set();
        let json = JSPath.apply(node, Store.message);
        let segments = EdiHelper.getSegments(json, false);
        for (let i = 0, length = segments.length; i < length; i++) {
            let segment = segments[i];
            if (segment.element) {
                for (let i = 0, length = segment.element.length; i < length; i++) {
                    let element = segment.element[i];
                    let regex;
                    if (exact === false && matchCase === false) {
                        regex = new RegExp(text, "i");
                    } else if (exact === true && matchCase === true) {
                        regex = new RegExp('^'+text+'$');
                    } else if (exact === true && matchCase === false) {
                        regex = new RegExp('^'+text+'$',"i");
                    } else if (exact === false && matchCase === true) {
                        regex = new RegExp(text);
                    }
                    if (Utilities.isNotEmptyString(element)) {
                        if (element.match(regex) !== null) {
                            results.add(segment);
                        }
                    }
                    if ( i === length - 1) {
                        if (segment.name.match(regex) !== null) {
                            results.add(segment);
                        }
                    }
                }
            }
        }
        if (results.size > 0) {
            resolve(results);
        } else {
            reject(true);
        }
        
    })
}

export { findInDocument };