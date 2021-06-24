// waveShaper

export const waveShaperController = (audioCtx, distortion, overSample) => {
    const waveShaperNode = audioCtx.createWaveShaper();

    const distortionControl = document.querySelector(distortion);
    const overSampleControl = document.querySelector(overSample);

    waveShaperNode.curve = makeDistortionCurve(distortionControl.value);
    waveShaperNode.oversample = overSampleControl.value;

    overSampleControl.addEventListener('input', (event) => {
        waveShaperNode.oversample = event.target.value;
    }, false);

    distortionControl.addEventListener('input', (event) => {
        waveShaperNode.curve = makeDistortionCurve(event.target.value);
    }, false);

    return waveShaperNode
}

function makeDistortionCurve(amount) {
    let k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
}

