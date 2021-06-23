import {gainController} from '../scripts/gain.js'
import {pannerController} from '../scripts/panner.js'
import {delayController} from '../scripts/delay.js'
import {biquadFilterController} from '../scripts/biquadFilter.js'
import {convolverController, gainConvolverController} from '../scripts/convolver.js'
import {voiceFn} from '../scripts/voice.js'

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

console.log(audioCtx.state)

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
const progressElement = document.querySelector('.js-progress');
const biquadFilterCheckbox = document.querySelector('.js-bq-filter-checkbox');
// const convolverCheckbox = document.querySelector('.js-convolver-on-off-checkbox');


//creating nodes
const bqFilterNode = biquadFilterController(
    audioCtx,
    '.js-biquadFilter-select-type',
    '.js-control-frequency',
    '.js-control-detune',
    '.js-control-Q',
    '.js-control-gain'
    )
const gainNode = gainController(audioCtx, '.js-control-volume')
const pannerNode = pannerController(audioCtx, '.js-control-panner')
const delayNode = delayController(audioCtx, '.js-control-delay')
// const gain = gainConvolverController(audioCtx, '.js-control-convolver-volume')
const convolverNode = await convolverController(audioCtx, '.js-reverb-select-type')


//no-off biquadFilter
biquadFilterCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        track
            .connect(bqFilterNode)
            .connect(audioCtx.destination);
    }

    if (!e.target.checked) {
        bqFilterNode.disconnect()
    }
})

//connecting graphs
track
    .connect(gainNode)
    .connect(pannerNode)
    .connect(delayNode)
    // .connect(convolverNode)
    .connect(audioCtx.destination);


//add listener on play button
playButton.addEventListener('click', async () => {
    await audioCtx.resume();
    console.log(audioCtx.state)
    audioElement.play();
}, false)

//add listener on pause button
pauseButton.addEventListener('click', async () => {
    await audioCtx.suspend();
    console.log(audioCtx.state)
    audioElement.pause();
}, false)

//add listener on voice button
voiceButton.addEventListener('click', voiceFn, false)

