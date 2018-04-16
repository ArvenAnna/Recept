export const isDescendantOf = (element, parent) => {
    if(!parent || !element) {
        return false;
    }
    if (parent.isSameNode(element)) {
        return true;
    }
    if (parent.hasChildNodes()) {
        const nodeList = parent.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
            if (isDescendantOf(element, nodeList[i])) {
                return true;
            }
        }
        return false;
    } else {
        return false;
    }
}