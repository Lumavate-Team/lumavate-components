import { Component, Prop, EventEmitter, Event, State, Method } from '@stencil/core';

@Component({
    tag: 'lumavate-camera',
    styleUrl: 'lumavate-camera.scss'
})
export class LumavateCamera {
    @Prop() headers     : Headers = new Headers();
    @Prop() method      : string  = 'POST';
    @Prop() url         : string  = '';
    @Prop() buttonLabel : string  = 'Fetch';

    @Event() resolved : EventEmitter;
    @Event() error    : EventEmitter;

    @State() available : boolean = false;
    @State() request   : any;

    constraints = {
        audio: false,
        video: { facingMode: { exact: "environment" }}
    }

    video: any = document.querySelector('video') as HTMLVideoElement;
    canvas: any = document.querySelector('canvas') as HTMLCanvasElement;
    filters: string[] = ['blur', 'brightness', 'contrast', 'hue-rotate', 'grayscale', 'invert', 'opacity', 'saturate', 'sepia', ''];

    filterIndex: any = 0;


    @Method()
    handleSuccess(stream) {
        let video: any = document.querySelector('video') as HTMLVideoElement;

        video.srcObject = stream;
        video.play();
    }

    @Method()
    handleError(error) {
        console.error('User Rejected camera permission', error);
    }
    componentWillLoad() {
        navigator.mediaDevices.getUserMedia(this.constraints).then(this.handleSuccess).catch(this.handleError)
    }

    @Method()
    changeFilter() {
        let video: any = document.querySelector('video') as HTMLVideoElement;
        let canvas: any = document.querySelector('canvas') as HTMLCanvasElement;

        video.className = this.filters[this.filterIndex];
        this.filterIndex += 1;
        if (this.filterIndex > this.filters.length) {
            this.filterIndex = 0;
        }

    }

    @Method()
    getAuthToken() {
      var cookies = document.cookie.split(";");
      for(var i=0,len=cookies.length; i < len; i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].trim() == "pwa_jwt"){
          return cookie[1].trim();
        }
      }
    }

    @Method()
    getSessionToken() {
      var cookies = document.cookie.split(";");
      for(var i=0,len=cookies.length; i < len; i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].trim() == "pwa_s"){
          return cookie[1].trim();
        }
      }
    }

    @Method()
    takePicture() {
        let canvas: any = document.querySelector('canvas') as HTMLCanvasElement;
        let video: any = document.querySelector('video') as HTMLVideoElement;

        canvas.width = video.videoWidth;
        canvas.height = video.videoWidth;
        canvas.getContext('2d').drawImage(video, 0, 0);
        canvas.className = this.filters[this.filterIndex - 1];

        var dataURL = canvas.toDataURL('image/jpeg', 0.5);

        console.log(dataURL)

        let dataWrap: any = {
            data : dataURL
        };

        const url = window.location.href;

        fetch(url, {
            method: "POST",
            body: JSON.stringify(dataWrap),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + this.getAuthToken()
            },
        })
            .then(function(response) {
                console.log(response);
            }.bind(this))
            .catch(function(err) {
                console.log(err)
            }.bind(this))
    }

    render() {
        return (
            <div class="videoContainer">
                <div>
                    <video></video>
                    <button class="button" onClick={() => this.takePicture()}></button>
                </div>

                <canvas></canvas>
            </div>
        )
    }
}
