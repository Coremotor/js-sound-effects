//compressor

export const compressorController = (audioCtx, threshold, knee, ratio, attack, release) => {
    const compressorNode = audioCtx.createDynamicsCompressor()

    const thresholdControl = document.querySelector(threshold);
    const kneeControl = document.querySelector(knee);
    const ratioControl = document.querySelector(ratio);
    const attackControl = document.querySelector(attack);
    const releaseControl = document.querySelector(release);

    thresholdControl.addEventListener('input', (event) => {
        compressorNode.threshold.value = event.target.value;
    }, false);

    kneeControl.addEventListener('input', (event) => {
        compressorNode.knee.value = event.target.value;
    }, false);

    ratioControl.addEventListener('input', (event) => {
        compressorNode.ratio.value = event.target.value;
    }, false);

    attackControl.addEventListener('input', (event) => {
        compressorNode.attack.value = event.target.value;
    }, false);

    releaseControl.addEventListener('input', (event) => {
        compressorNode.release.value = event.target.value;
    }, false);

    return compressorNode
}

