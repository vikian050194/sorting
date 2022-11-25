export default class BaseSort {
    get key() {
        throw new Error("not implemented");
    }

    sort() {
        throw new Error("not implemented");
    }

    swap(e, i, j) {
        let temp = e[i];
        e[i] = e[j];
        e[j] = temp;
    }
}
