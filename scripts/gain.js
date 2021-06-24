// volume

export const gainController = (audioCtx, selector) => {
    const gainNode = audioCtx.createGain();

    const volumeControl = document.querySelector(selector);

    volumeControl.addEventListener('input', (event) => {
        gainNode.gain.value = event.target.value;
    }, false);

    return gainNode
}