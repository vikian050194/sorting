export default class BaseAnimation {
    get key() {
        throw new Error("not implemented");
    }

    select() {
        // eslint-disable-next-line no-unused-vars
        return (index, action, progress) => {
            let color = "FFFF00";

            if (action.index.length === 2) {
                color = index === action.index[0] ? "FF0000" : "0000FF";
            }

            const style = {
                borderColor: `#${color}`
            };

            return style;
        };
    }

    reset() {
        // eslint-disable-next-line no-unused-vars
        return (index, action, progress) => {
            const color = "000000";

            const style = {
                borderColor: `#${color}`
            };

            return style;
        };
    }
}
