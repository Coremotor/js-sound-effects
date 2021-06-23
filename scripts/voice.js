import {gainController} from "../scripts/gain.js";
import {pannerController} from "../scripts/panner.js";
import {delayController} from "../scripts/delay.js";

export const voiceFn = async () => {
    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})

        const voiceAudioCtx = new AudioContext
        const voice = await voiceAudioCtx.createMediaStreamSource(stream)

        voice
            .connect(gainController(voiceAudioCtx, '.js-control-voice-volume'))
            .connect(pannerController(voiceAudioCtx, '.js-control-voice-panner'))
            .connect(delayController(voiceAudioCtx, '.js-control-voice-delay'))
            .connect(voiceAudioCtx.destination)

        const voiceOffButton = document.querySelector('.js-btn-voice-off')
        voiceOffButton.addEventListener('click', () => {
            voiceAudioCtx.suspend()
        })
    }
}