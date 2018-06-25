import { Component, Method } from '@stencil/core';


@Component({
    tag: 'lumavate-camera',
    styleUrl: 'lumavate-camera.scss'
})
export class LumavateCamera {
    constraints = {
        video: true
    }

    filterIndex: any = 0
    video: any = document.querySelector('video') as HTMLVideoElement

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
        let filters: string[] = ['blur', 'brightness', 'contrast', 'hue-rotate', 'grayscale', 'invert', 'opacity', 'saturate', 'sepia', '']

        video.className = filters[this.filterIndex]
        this.filterIndex += 1
        if (this.filterIndex > filters.length) {
            this.filterIndex = 0
        }
    }

    render() {
        return (
            <div>
                <video autoplay style={{ width: "100%", height: "100%" }}> </video>
                <button onClick={() => this.changeFilter()}>Change Filter</button>
            </div>
        )
    }
}
