// biquadFilter

export const biquadFilterController = (audioCtx, selectorType, frequency, detune, Q, gain) => {
    const biquadFilterNode = audioCtx.createBiquadFilter();

    const typeSelector = document.querySelector(selectorType);
    const frequencyControl = document.querySelector(frequency);
    const detuneControl = document.querySelector(detune);
    const QControl = document.querySelector(Q);
    const gainControl = document.querySelector(gain);

    typeSelector.addEventListener('change', (event) => {
        biquadFilterNode.type = event.target.value;
    }, false);

    frequencyControl.addEventListener('input', (event) => {
        biquadFilterNode.frequency.value = event.target.value;
    }, false);

    detuneControl.addEventListener('input', (event) => {
        biquadFilterNode.detune.value = event.target.value;
    }, false);

    QControl.addEventListener('input', (event) => {
        biquadFilterNode.Q.value = event.target.value;
    }, false);

    gainControl.addEventListener('input', (event) => {
        biquadFilterNode.gain.value = event.target.value;
    }, false);

    return biquadFilterNode
}
