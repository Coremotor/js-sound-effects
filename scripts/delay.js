// delay

export const delayController = (audioCtx, selector) => {
    const delayNode = audioCtx.createDelay(5);

    const delayControl = document.querySelector(selector);

    delayControl.addEventListener('input', (event) => {
        delayNode.delayTime.value = event.target.value;
    }, false);

    console.log(delayNode)
    return delayNode
}