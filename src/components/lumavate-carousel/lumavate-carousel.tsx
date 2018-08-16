import { Component, Prop, Event, EventEmitter, Element, Method, Listen } from '@stencil/core'
import HammerJS from 'hammerjs'
import pinchZoom from './pinch-zoom'


@Component({
  tag: 'lumavate-carousel',
  styleUrl: 'lumavate-carousel.scss'
})

export class LumavateCarosel {

  @Event() clicked: EventEmitter
  @Element() el: HTMLElement
  @Prop() CarouselImages: string = ''
  @Prop() mode: string = 'cover'
  @Prop() arrowColor: string = 'white'
  @Prop() pinchZoom: boolean = true
  @Prop() holdToZoom: boolean = false

  images: Array<any>
  pinchZoomManager: any
  swipeEL: HTMLElement
  swipeElLbox: HTMLElement
  swipeManager: any
  swipeManagerLbox: any
  zooming: boolean = false

  slidePanelSelector = '.slider-panel'
  sensitivity = 18 // horizontal % needed to trigger swipe
  activeSlide = 0
  slideCount = 0
  timer: any




  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
    this.slideCount = this.images.length
  }

  componentDidLoad() {
    let modal: any = document.getElementsByClassName('modal')
    let container: any = document.getElementsByClassName('container')
    container[0].style.width = 100 * this.slideCount + '%'
    modal[0].style.width = 100 * this.slideCount + '%'
    this.initSwipe()
    this.initPinchZoom()

    let wrapper: any = document.getElementsByClassName('wrapper')
    let closeButton: any = document.getElementsByClassName('close')
    modal[0].style.display = 'none'
    wrapper[0].style.display = 'none'
    closeButton[0].style.display = 'none'
  }

  @Method()
  initSwipe() {
    this.swipeEL = document.querySelector('.container')
    this.swipeElLbox = document.querySelector('.modal')
    this.swipeManager = new HammerJS.Manager(this.swipeEL)
    this.swipeManagerLbox = new HammerJS.Manager(this.swipeElLbox)
    this.swipeManager.add(new HammerJS.Pan({ threshold: 0, pointers: 0 }))
    this.swipeManagerLbox.add(new HammerJS.Pan({ threshold: 0, pointers: 0 }))
    this.swipeManager.on('pan', (e) => {

      if(!this.zooming){
        //Calculate pixel movements into 1:1 screen percents so gestures track with motion
        let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
        //Multiply percent by # of slide we’re on
        let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
        this.swipeEL.style.transform = 'translateX( ' + percentageCalculated + '% )'
        this.determineValidSwipe(e, percentage)
      }
    })

    this.swipeManagerLbox.on('pan', (e) => {
      if(!this.zooming){
        //Calculate pixel movements into 1:1 screen percents so gestures track with motion
        let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
        //Multiply percent by # of slide we’re on
        let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
        this.swipeElLbox.style.transform = 'translateX( ' + percentageCalculated + '% )'
        this.determineValidSwipe(e, percentage)
      }
    })
  }




  @Method()
  initPinchZoom() {
      let i = 0
      let images = document.getElementsByClassName('pinchzoom')
      this.pinchZoomManager = []

      for(i; i< images.length; i++){
        this.pinchZoomManager.push(new pinchZoom(images[i]))
      }

  }


  @Method()
  determineValidSwipe(e, percentage) {
    if (e.isFinal) {
      if (e.velocityX > 1) {
        this.goTo(this.activeSlide - 1)
      } else if (e.velocityX < -1) {
        this.goTo(this.activeSlide + 1)
      } else {
        if (percentage <= -(this.sensitivity / this.slideCount))
          this.goTo(this.activeSlide + 1)
        else if (percentage >= (this.sensitivity / this.slideCount))
          this.goTo(this.activeSlide - 1)
        else
          this.goTo(this.activeSlide)
      }
    }
  }

  @Method()
  goTo(number) {
    if (number < 0)
      this.activeSlide = 0
    else if (number > this.slideCount - 1)
      this.activeSlide = this.slideCount - 1
    else
      this.activeSlide = number

    // 5b. Apply transformation & smoothly animate via .is-animating CSS
    this.swipeEL.classList.add('is-animating')
    this.swipeElLbox.classList.add('is-animating')
    // console.log(this.swipeEL.classList)
    var percentage = -(100 / this.slideCount) * this.activeSlide
    this.swipeEL.style.transform = 'translateX( ' + percentage + '% )'
    this.swipeElLbox.style.transform = 'translateX( ' + percentage + '% )'
    let self = this
    clearTimeout(this.timer)
    this.timer = setTimeout(function () {
      self.swipeEL.classList.remove('is-animating')
      self.swipeElLbox.classList.remove('is-animating')
    }, 400)
  }

  @Method()
  next(n) {
    this.goTo(this.activeSlide += n)
  }

  @Method()
  previous(n) {
    this.goTo(this.activeSlide -= n)
  }


  @Method()
  nextLightBox(n) {
    this.lightBox(this.activeSlide += n)
  }

  @Method()
  previousLightBox(n) {
    this.lightBox(this.activeSlide -= n)
  }

  @Method()
  lightBox(n) {
    // this.checkForSlideEnds()
    this.goTo(n)

    let modal: any = document.getElementsByClassName('modal')
    let wrapper: any = document.getElementsByClassName('wrapper')
    let closeButton: any = document.getElementsByClassName('close')
    let expandButton: any = document.getElementsByClassName('expand')
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')

    modal[0].style.display = 'flex'
    wrapper[0].style.display = 'inline'
    next[0].style.display = 'inline'
    previous[0].style.display = 'inline'
    closeButton[0].style.display = 'inline'
    expandButton[0].style.display = 'none'
  }

  @Method()
  closeModal() {
    let modal: any = document.getElementsByClassName('modal')
    let wrapper: any = document.getElementsByClassName('wrapper')
    let expandButton: any = document.getElementsByClassName('expand')
    let closeButton: any = document.getElementsByClassName('close material-icons')
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')

    modal[0].style.display = 'none'
    wrapper[0].style.display = 'none'
    next[0].style.display = 'none'
    previous[0].style.display = 'none'
    closeButton[0].style.display = 'none'
    expandButton[0].style.display = 'inline'
  }

  @Listen('pinch')
  pinchHandler(){
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')
    next[0].style.display = 'none'
    previous[0].style.display = 'none'
    this.zooming = true
  }

  @Listen('pinchend')
  pinchendHandler(){
    let scale = this.pinchZoomManager[this.activeSlide].getScale()
    let zoomThreshold = this.pinchZoomManager[this.activeSlide].getzoomThreshold()
    // console.log('pz scale: ' + scale)
    // console.log(scale<zoomThreshold)
    // console.log('--------------------------------')

    if(scale<zoomThreshold){
      let next: any = document.getElementsByClassName('next_fullscreen')
      let previous: any = document.getElementsByClassName('previous_fullscreen')
      next[0].style.display = 'inline'
      previous[0].style.display = 'inline'
      this.zooming = false
    }
  }


  @Method()
  checkForSlideEnds(){
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')

    if(this.activeSlide == 0){
      previous[0].style.display = 'none'
    } else if(this.activeSlide == this.images.length-1){
      next[0].style.display = 'none'
    } else if((this.activeSlide >0)&&(this.activeSlide<this.images.length-1)){
      next[0].style.display = 'inline'
      previous[0].style.display = 'inline'
    }
  }

  render() {
    return (
      <div class="slideshow-container" style={{ width: "100%", height: "100%" }}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"></meta>
        <style>
          @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
          </style>

        <div class='container'>
          {this.images.map((item) =>
            <div class="carouselImage" >
              <lumavate-image
                src={item.url}
                mode={this.mode}>
              </lumavate-image>
            </div>
          )}
        </div>

        <a class="previous" onClick={() => this.previous(1)}>&#10094;</a>
        <a class="next" onClick={() => this.next(1)}>&#10095;</a>

        <div class="dot-container">
          {this.images.map((_, index) =>
            <span class="dot" onClick={() => this.goTo(index + 1)}></span>
          )}
        </div>

        <a class="expand material-icons" onClick={() => this.lightBox(this.activeSlide)}>fullscreen</a>

        <a class="previous_fullscreen" onClick={() => this.previousLightBox(1)}>&#10094;</a>
        <a class="next_fullscreen" onClick={() => this.nextLightBox(1)}>&#10095;</a>

        <span class="close material-icons" onClick={() => this.closeModal()}>fullscreen_exit</span>
        <div class='wrapper'>
        </div>
        <div class='modal'>
          {this.images.map((item) =>
            <div style={{ width: "100%", height: "100%" }}>
              <lumavate-image
                class = 'pinchzoom'
                src={item.url}
                mode="contain" />
            </div>
          )}
        </div>
      </div>
    )
  }
}