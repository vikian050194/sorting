export default class BaseAnimation {
    get key() {
        throw new Error("not implemented");
    }

    select() {
        // eslint-disable-next-line no-unused-vars
        return (index, action, progress) => {
            const color = index === 0 ? "FF0000" : "00FF00";

            const style = {
                borderColor: `#${color}`
            };

            return style;
        };
    }
}
