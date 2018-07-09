import { Component, Method } from '@stencil/core';
import jsQR from 'jsqr';

@Component({
    tag: 'lumavate-qr-scanner',
    styleUrl: 'lumavate-qr-scanner.scss'
})
export class LumavateQrScanner {
    constraints = {
        // video: { width: { exact: 960 }, height: { exact: 540 } }
        video: true,
        //this defaults to rear phone camera when possible
        facingMode: "environment"
    }

    filterIndex: any = 0
    idx = 0

    @Method()
    handleSuccess = (stream) => {
        let video: any = document.querySelector('video')
        video.srcObject = stream
        video.setAttribute("playsinline", true)
        requestAnimationFrame(this.tick)
        return navigator.mediaDevices.enumerateDevices()
    }

    @Method()
    handleError(error) {
        console.error('Error setting up qrCode Scanner', error)
    }
    componentWillLoad() {
        navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError);
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(this.handleError)
    }

    @Method()
    tick = () => {
        let video: any = document.querySelector('video')
        let canvasElement: any = document.getElementById('canvas')
        let canvas = canvasElement.getContext('2d')
        let outputContainer = document.getElementById("output");
        let outputMessage = document.getElementById("outputMessage");
        let outputData = document.getElementById("outputData");

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.hidden = false;
            outputContainer.hidden = false;
            canvasElement.height = video.videoHeight;
            canvasElement.width = video.videoWidth;
            canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
            if (this.idx % 10 == 0) {
                let imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    let leftMiddle = {
                        x: (code.location.bottomLeftCorner.x + code.location.topLeftCorner.x) / 2,
                        y: (code.location.bottomLeftCorner.y + code.location.topLeftCorner.y) / 2
                    }

                    let rightMiddle = {
                        x: (code.location.bottomRightCorner.x + code.location.topRightCorner.x) / 2,
                        y: (code.location.bottomRightCorner.y + code.location.topRightCorner.y) / 2
                    }

                    let topMiddle = {
                        x: (code.location.topLeftCorner.x + code.location.topRightCorner.x) / 2,
                        y: (code.location.topLeftCorner.y + code.location.topRightCorner.y) / 2
                    }


                    let bottomMiddle = {
                        x: (code.location.bottomRightCorner.x + code.location.bottomLeftCorner.x) / 2,
                        y: (code.location.bottomRightCorner.y + code.location.bottomLeftCorner.y) / 2
                    }


                    this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
                    this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
                    this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
                    this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
                    this.drawLine(leftMiddle, rightMiddle, "#FF3B58")
                    this.drawLine(topMiddle, bottomMiddle, "#FF3B58")
                    outputMessage.hidden = true;
                    outputData.parentElement.hidden = false;
                    outputData.innerText = code.data;
                }
            } else {
                outputMessage.hidden = false;
                outputData.parentElement.hidden = true;
            }
        }
        if(this.idx <=60){
            this.idx++
        }else{
            this.idx = 0
        }
        requestAnimationFrame(this.tick)
    }

    @Method()
    drawLine(begin, end, color) {
        let canvasElement: any = document.getElementById('canvas')
        let canvas = canvasElement.getContext('2d')
        canvas.beginPath();
        canvas.moveTo(begin.x, begin.y);
        canvas.lineTo(end.x, end.y);
        canvas.lineWidth = 4;
        canvas.strokeStyle = color;
        canvas.stroke();
    }

    @Method()
    gotDevices = (deviceInfos) => {
        let videoSelect: any = document.querySelector('select#videoSource')
        let selectors = [videoSelect];
        // Handles being called several times to update labels. Preserve values.
        let values = selectors.map(function (select) {
            return select.value;
        });
        selectors.forEach(function (select) {
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
        });
        for (let i = 0; i !== deviceInfos.length; ++i) {
            let deviceInfo = deviceInfos[i];
            let option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'videoinput') {
                option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
                videoSelect.appendChild(option);
            }
        }
        selectors.forEach(function (select, selectorIndex) {
            if (Array.prototype.slice.call(select.childNodes).some(function (n) {
                return n.value === values[selectorIndex];
            })) {
                select.value = values[selectorIndex];
            }
        });
    }

    @Method()
    start() {
        let videoSelect: HTMLSelectElement = document.querySelector('select#videoSource')
        let videoSource = videoSelect.value;
        console.log(videoSource)
        let constraints = {
            video: {
                deviceId: videoSource ? { exact: videoSource } : undefined ,
            },
            facingMode: "environment"
        };

        navigator.mediaDevices.getUserMedia(constraints).
            then(this.handleSuccess).then(this.gotDevices).catch(this.handleError);
    }

    render() {
        return (
            <div>
                <div class="select">
                    <label htmlfor="videoSource">Video source: </label><select onChange={() => this.start()} id="videoSource"></select>
                </div>
                <video id='preview' autoplay style={{ width: "640px", height: "480px" }} hidden> </video>
                <canvas id="canvas" style={{ width: "640", height: "480" }} hidden></canvas>
                <div id="output" hidden>
                    <div id="outputMessage">No QR code detected.</div>
                    <div hidden><b>Data:</b> <span id="outputData"></span></div>
                </div>
                <button onClick={() => this.tick()}>Resume Scanning</button>
            </div>
        )
    }
}
