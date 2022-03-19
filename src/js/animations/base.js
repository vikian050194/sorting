export default class BaseAnimation {
    get key() {
        throw new Error("not implemented");
    }

    select() {
        return (index, action, progress = 0) => {
            if (progress > 1) {
                progress = 1;
            }
            let color = Math.floor(255 * progress).toString(16);
            if (color.length == 1) {
                color = `0${color}`;
            }
            const style = {
                borderColor: `#${color}${color}00`
            };

            return style;
        };
    }
}
