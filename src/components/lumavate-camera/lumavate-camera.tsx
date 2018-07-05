import { Component, Method } from '@stencil/core';

@Component({
    tag: 'lumavate-camera',
    styleUrl: 'lumavate-camera.scss'
})
export class LumavateCamera {
    constraints = {
        audio: false,
        video: {
            width: { min: 200, ideal: 375, max: 375 },
            height: { min: 200, ideal: 300, max: 400}
            // this will prefer the front camera facingMode: "user",
            // this will require the rear camera facingMode: { exact: "environment" }
        }
    }

    video: any = document.querySelector('video') as HTMLVideoElement
    canvas: any = document.querySelector('canvas') as HTMLCanvasElement
    img: any = document.querySelector('photo') as HTMLImageElement
    filters: string[] = ['blur', 'brightness', 'contrast', 'hue-rotate', 'grayscale', 'invert', 'opacity', 'saturate', 'sepia', '']

    filterIndex: any = 0


    @Method()
    handleSuccess(stream) {
        let video: any = document.querySelector('video') as HTMLVideoElement

        video.srcObject = stream
    }

    @Method()
    handleError(error) {
        console.error('User Rejected camera permission', error)
    }
    componentWillLoad() {
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(this.handleError)
    }

    @Method()
    changeFilter() {
        let video: any = document.querySelector('video') as HTMLVideoElement
        let canvas: any = document.querySelector('canvas') as HTMLCanvasElement

        video.className = this.filters[this.filterIndex]
        this.filterIndex += 1
        if (this.filterIndex > this.filters.length) {
            this.filterIndex = 0
        }

    }

    @Method()
    takePicture() {
        let canvas: any = document.querySelector('canvas') as HTMLCanvasElement
        let video: any = document.querySelector('video') as HTMLVideoElement
        let img: any = document.querySelector('photo') as HTMLImageElement

        canvas.width = video.videoWidth
        canvas.height = video.videoWidth
        canvas.getContext('2d').drawImage(video, 0, 0)
        canvas.className = this.filters[this.filterIndex - 1]

        var dataURL = canvas.toDataURL('image/jpeg', 0.5)
        console.log(dataURL)
        // // Other browsers will fall back to image/png
        // img.src = canvas.toDataURL('image/webp')
    }

    render() {
        return (
            <div>
                <div class="camera">
                    <video autoplay style={{ width: "100%", height: "100%" }}> </video>
                    <button onClick={() => this.changeFilter()}>Change Filter</button>
                    <button onClick={() => this.takePicture()}>Take photo</button>
                </div>

                <div>
                    <canvas style={{ width: "100%", height: "100%" }}></canvas>
                </div>
            </div>
        )
    }
}
