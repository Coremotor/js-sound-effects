export const recordFn = async () => {
    const recordBtn = document.querySelector('.js-btn-record-start')
    const stopRecordBtn = document.querySelector('.js-btn-record-stop')
    const soundClips = document.querySelector('.js-sound-clips')

    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');

        let chunks = [];

        const stream = await navigator.mediaDevices.getUserMedia({audio: true})

        let mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        recordBtn.style.background = "red";
        recordBtn.style.color = "black";

        stopRecordBtn.onclick = function () {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            recordBtn.style.background = "";
            recordBtn.style.color = "";
        }

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        }

        mediaRecorder.onstop = function (e) {
            console.log("data available after MediaRecorder.stop() called.");

            let clipName = prompt('Enter a name for your sound clip');

            let clipContainer = document.createElement('article');
            let clipLabel = document.createElement('p');
            let audio = document.createElement('audio');
            let deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.innerHTML = "Delete";
            clipLabel.innerHTML = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            let file = new File(chunks,'file', {'type': 'audio/ogg; codecs=opus'});
            chunks = [];
            audio.src = URL.createObjectURL(file);
            console.log("recorder stopped");

            deleteButton.onclick = function (e) {
                let evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            }
        }
    }
}


