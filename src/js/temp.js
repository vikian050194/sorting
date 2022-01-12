// const firstElement = document.getElementsByClassName("element-container")[0];
// const height = firstElement.clientHeight;
// const width = firstElement.clientWidth;
// const border = firstElement.clientTop;
// const margin = parseInt((firstElement.currentStyle || window.getComputedStyle(firstElement)).marginTop);

// [].forEach.call(document.getElementsByClassName("element-container"), function (e) {
//     e.style.animationDuration = this.animationDuration + "ms";
// }, this);

// let leftId = null;
// let leftIndex = null;
// let rightId = null;
// let rightIndex = null;
// let countOfFinishedAnimations = 2;

// let tick = (e) => {
//     if (e) {
//         countOfFinishedAnimations++;

//         if (e.target.id === leftId) {
//             setElementOrder(leftId, rightIndex);
//         }

//         if (e.target.id === rightId) {
//             setElementOrder(rightId, leftIndex);
//         }

//         if (index === actions.length) {
//             return;
//         }
//     }

//     if (countOfFinishedAnimations === 2) {
//         countOfFinishedAnimations = 0;

//         if (leftId && rightId) {
//             removeElementAnimation(leftId);
//             removeElementAnimation(rightId);
//         }

//         leftId = document.querySelector(`[style*="order: ${leftIndex}"]`).getAttribute("id");
//         rightId = document.querySelector(`[style*="order: ${rightIndex}"]`).getAttribute("id");

//         insertAnimation({
//             leftIndex,
//             rightIndex,
//             height,
//             width,
//             margin,
//             border,
//             animationType: this.animationType,
//             animationDuration: this.animationDuration
//         }, leftId, rightId);
//     }
// };