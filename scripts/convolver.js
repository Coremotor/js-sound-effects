// convolver

export const convolverController = async (audioCtx, reverbSelect) => {
    const convolverNode = audioCtx.createConvolver()

    const reverbControl = document.querySelector(reverbSelect);
    let response     = await fetch(reverbControl.value);
    let arraybuffer  = await response.arrayBuffer();
    convolverNode.buffer = await audioCtx.decodeAudioData(arraybuffer);

    reverbControl.addEventListener('change', async (event) => {
        let response     = await fetch(event.target.value);
        let arraybuffer  = await response.arrayBuffer();
        convolverNode.buffer = await audioCtx.decodeAudioData(arraybuffer);
        console.log(convolverNode)
    }, false);

    console.log(convolverNode)

    return convolverNode
}

// convolver-volume

export const gainConvolverController = (audioCtx, selector) => {
    const gainConvolverNode = audioCtx.createGain();

    const volumeControl = document.querySelector(selector);

    volumeControl.addEventListener('input', (event) => {
        gainConvolverNode.gain.value = event.target.value;
    }, false);

    console.log(gainConvolverNode)
    return gainConvolverNode

}