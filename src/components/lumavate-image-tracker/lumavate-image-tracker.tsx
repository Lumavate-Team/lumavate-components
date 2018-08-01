import { Component, Prop, EventEmitter, Event, Element, State, Method } from '@stencil/core';

@Component({
  tag: 'lumavate-image-tracker',
  styleUrl: 'lumavate-image-tracker.scss'
})
export class LumavateImageTracker {
  @Prop() trackingSrc: string = '';
  @Prop() blurRadius: number = 3;
  @Prop() laplacianThreshold: number = 75;
  @Prop() minEigenValueThreshold: number = 45;
  @Prop() matchThreshold: number = 48;
  @Prop() goodMatchPoints: number = 8;


  @Element() videoContainer: HTMLElement;

  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  videoOptions = {
    video: {
      facingMode: "environment",
      width: {min: 320, max: 1280},
      height: {min: 240, max: 720}
    },
    audio: false
  };

  componentWillLoad(){
    this.startTracker();
  }

  startTracker(){
    if(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)){
      navigator.mediaDevices.getUserMedia(this.videoOptions).then(this.videoSuccess).catch(this.videoError);
    }
  }

  videoSuccess(stream){
      var video = document.getElementById('cameraVideo');
      this.video.srcObject = stream;
      setTimeout(function(){
        this.video.play();
      },500);

      this.initTracker();
  }

  videoError(error){
    console.log(error);
  }

  initTracker(){
      if (this.canvas.getContext) {
        this.context = this.canvas.getContext('2d');
      }

    //  _this.tracker = new _this.trackerComponents[_this.properties.componentType](_this.properties);

     // _this.tracker.init('#cameraVideo', _this.canvas, _this.context);
      //_this.trackerTask = _this.tracker.track();
  }

  render() {
    return (
      <div id="videoContainer">
        <video id="cameraVideo" autoplay playsinline muted></video>
        <canvas id="imageCanvas">
          This browser is not supported.
        </canvas>
      </div>
    );
  }
}
