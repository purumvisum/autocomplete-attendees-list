//https://stackoverflow.com/questions/69956977/html-contenteditable-keep-caret-position-when-inner-html-changes
// get the cursor position from .editor start
export function getCursorPosition(parent:any, node:any, offset:any, stat:any) {
    if (stat.done) return stat;

    var currentNode = null;
    if (parent.childNodes.length === 0) {
        stat.pos += parent.textContent.length;
    } else {
        for (var i = 0; i < parent.childNodes.length && !stat.done; i++) {
            currentNode = parent.childNodes[i];
            if (currentNode === node) {
                stat.pos += offset;
                stat.done = true;
                return stat;
            } else
                getCursorPosition(currentNode, node, offset, stat);
        }
    }
    return stat;
}

//find the child node and relative position and set it on range
export function setCursorPosition(parent:any, range:any, stat:any) {
    if (stat.done) return range;
    let currentNode = null;
    if (parent.childNodes.length === 0) {
        if (parent.textContent.length >= stat.pos) {
            range.setStart(parent, stat.pos);
            stat.done = true;
        } else {
            stat.pos = stat.pos - parent.textContent.length;
        }
    } else {
        for (var i = 0; i < parent.childNodes.length && !stat.done; i++) {
            currentNode = parent.childNodes[i];
            setCursorPosition(currentNode, range, stat);
        }
    }
    return range;
}

export function restoreCaretPosition (sel:any, element: any, pos: any) {
    sel.removeAllRanges();
    let range = setCursorPosition(document.querySelector('[contenteditable]'), document.createRange(), {  pos: pos.pos + 1, done: false});
    range.collapse(true);
    // @ts-ignore
    sel.addRange(range);
}
