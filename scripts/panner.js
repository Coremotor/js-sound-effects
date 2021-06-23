// panning

export const pannerController = (audioCtx, selector) => {
    const pannerOptions = {pan: 0};

    const pannerNode = new StereoPannerNode(audioCtx, pannerOptions);

    const pannerControl = document.querySelector(selector);

    pannerControl.addEventListener('input', (event) => {
        pannerNode.pan.value = event.target.value;
    }, false);

    console.log(pannerNode)
    return pannerNode
}
