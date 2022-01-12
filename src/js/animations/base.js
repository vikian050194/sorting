export default class BaseAnimation {
    get key(){
        throw new Error("not implemented");
    }

    select() {
        return (index, action, progress = 0) => {
            const color = Math.floor(255 * progress).toString(16);
            const style = {
                borderColor: `#${color}${color}00`
            };

            return style;
        };
    }
}
