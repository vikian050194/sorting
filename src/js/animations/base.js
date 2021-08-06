export default class BaseAnimation {
    get key(){
        throw new Error("not implemented");
    }

    setAnimationName (animation, name) {
        return animation.replace("{NAME}", name);
    }
}
