import {gainController} from '../scripts/gain.js'
import {pannerController} from '../scripts/panner.js'
import {delayController} from '../scripts/delay.js'
import {biquadFilterController} from '../scripts/biquadFilter.js'
import {convolverController} from '../scripts/convolver.js'
import {compressorController} from '../scripts/compressor.js'
import {waveShaperController} from '../scripts/waveShaper.js'
import {voiceFn} from '../scripts/voice.js'
import {recordFn} from '../scripts/record.js'

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
const audioElement = document.querySelector('.js-audio');
const track = audioCtx.createMediaElementSource(audioElement);

//progress bar values
audioElement.addEventListener('timeupdate' , () => {
    progressElement.setAttribute('max', track.mediaElement.duration.toString())
    progressElement.setAttribute('value', track.mediaElement.currentTime.toString())
})

//get control elements
const playButton = document.querySelector('.js-btn-play');
const pauseButton = document.querySelector('.js-btn-pause');
const voiceButton = document.querySelector('.js-btn-voice-on')
const voiceRecordButton = document.querySelector('.js-btn-record-start')
const progressElement = document.querySelector('.js-progress');
const biquadFilterCheckbox = document.querySelector('.js-bq-filter-checkbox');
const convolverCheckbox = document.querySelector('.js-convolver-on-off-checkbox');
const compressorCheckbox = document.querySelector('.js-compressor-on-off-checkbox');
const waveShaperCheckbox = document.querySelector('.js-waveShaper-on-off-checkbox');


//creating nodes
const bqFilterNode = biquadFilterController(
    audioCtx,
    '.js-biquadFilter-select-type',
    '.js-control-frequency',
    '.js-control-detune',
    '.js-control-Q',
    '.js-control-gain'
    )
const gainNode = await gainController(audioCtx, '.js-control-volume')
const pannerNode = await pannerController(audioCtx, '.js-control-panner')
const delayNode = await delayController(audioCtx, '.js-control-delay')
// const gain = gainConvolverController(audioCtx, '.js-control-convolver-volume')
const convolverNode = await convolverController(audioCtx, '.js-reverb-select-type')
const waveShaperNode = await waveShaperController(audioCtx, '.js-control-distortion', '.js-oversample-select-type')
const compressorNode = await compressorController(audioCtx,
    '.js-control-threshold',
    '.js-control-knee',
    '.js-control-ratio',
    '.js-control-attack',
    '.js-control-release',
    )

//no-off biquadFilter
biquadFilterCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        convolverCheckbox.setAttribute('disabled', 'true')
        compressorCheckbox.setAttribute('disabled', 'true')
        waveShaperCheckbox.setAttribute('disabled', 'true')

        delayNode.disconnect(audioCtx.destination);
        delayNode.connect(bqFilterNode);
        bqFilterNode.connect(audioCtx.destination);
    }

    if (!e.target.checked) {
        convolverCheckbox.removeAttribute('disabled')
        compressorCheckbox.removeAttribute('disabled')
        waveShaperCheckbox.removeAttribute('disabled')

        bqFilterNode.disconnect(audioCtx.destination);
        delayNode.disconnect(bqFilterNode);
        delayNode.connect(audioCtx.destination)
    }
})

//no-off waveShaper
waveShaperCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        convolverCheckbox.setAttribute('disabled', 'true')
        compressorCheckbox.setAttribute('disabled', 'true')
        biquadFilterCheckbox.setAttribute('disabled', 'true')

        delayNode.disconnect(audioCtx.destination);
        delayNode.connect(waveShaperNode);
        waveShaperNode.connect(audioCtx.destination);
    }

    if (!e.target.checked) {
        convolverCheckbox.removeAttribute('disabled')
        compressorCheckbox.removeAttribute('disabled')
        biquadFilterCheckbox.removeAttribute('disabled')

        waveShaperNode.disconnect(audioCtx.destination);
        delayNode.disconnect(waveShaperNode);
        delayNode.connect(audioCtx.destination)
    }
})

//no-off convolver
convolverCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        biquadFilterCheckbox.setAttribute('disabled', 'true')
        compressorCheckbox.setAttribute('disabled', 'true')
        waveShaperCheckbox.setAttribute('disabled', 'true')

        delayNode.disconnect(audioCtx.destination);
        delayNode.connect(convolverNode);
        convolverNode.connect(audioCtx.destination);
    }

    if (!e.target.checked) {
        biquadFilterCheckbox.removeAttribute('disabled')
        compressorCheckbox.removeAttribute('disabled')
        waveShaperCheckbox.removeAttribute('disabled')

        delayNode.disconnect(convolverNode);
        convolverNode.disconnect(audioCtx.destination);
        delayNode.connect(audioCtx.destination);
    }
})

//no-off compressor
compressorCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        biquadFilterCheckbox.setAttribute('disabled', 'true')
        convolverCheckbox.setAttribute('disabled', 'true')

        delayNode.disconnect(audioCtx.destination);
        delayNode.connect(compressorNode);
        compressorNode.connect(audioCtx.destination);
    }

    if (!e.target.checked) {
        biquadFilterCheckbox.removeAttribute('disabled')
        convolverCheckbox.removeAttribute('disabled')

        delayNode.disconnect(compressorNode);
        compressorNode.disconnect(audioCtx.destination);
        delayNode.connect(audioCtx.destination);
    }
})

//connecting graphs
track.connect(gainNode)
gainNode.connect(pannerNode)
pannerNode.connect(delayNode)
delayNode.connect(audioCtx.destination)

// const source = delayNode.createMediaElementSource(myAudio)


//add listener on play button
playButton.addEventListener('click', async () => {
    await audioCtx.resume();
    audioElement.play();
}, false)

//add listener on pause button
pauseButton.addEventListener('click', async () => {
    await audioCtx.suspend();
    audioElement.pause();
}, false)

//add listener on voice button
voiceButton.addEventListener('click', voiceFn, false)

voiceRecordButton.addEventListener('click', recordFn, false)

