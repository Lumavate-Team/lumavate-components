import { Component, Prop, Event, EventEmitter, Element, Method, Listen } from '@stencil/core'
import HammerJS from 'hammerjs'
// import pinchZoom from './pinch-zoom'
import pinchZoom from 'pinch-zoom-js'


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
  lightboxEnabled: boolean = false




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
    this.removeArrowsStartEndSlideDeck()
    this.setupDots()

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

      if (!this.zooming) {
        //Calculate pixel movements into 1:1 screen percents so gestures track with motion
        let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
        //Multiply percent by # of slide we’re on
        let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
        this.swipeEL.style.transform = 'translateX( ' + percentageCalculated + '% )'
        this.determineValidSwipe(e, percentage)
      }
    })

    this.swipeManagerLbox.on('pan', (e) => {
      if (!this.zooming) {
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
    let imageContainers: any = document.getElementsByClassName('pinch-zoom-container')
    this.pinchZoomManager = []

    for (i; i < images.length; i++) {
      this.pinchZoomManager.push(new pinchZoom(images[i]), { zoomOutFactor: 1.3 })
    }

    for (i = 0; i < imageContainers.length; i++) {
      imageContainers[i].style.height = ''
      imageContainers[i].classList.add('pzcontainer')
    }

  }

  @Listen('pz_zoomupdate')
  hideLightBoxButtonsend() {
    let upperbound: number = 1.3
    let lowerbound: number = 0.97
    let slides: any = document.getElementsByClassName("pinchzoom")
    let close: any = document.getElementsByClassName('close')
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')

    let scale3D = slides[this.activeSlide].style.transform.split(' t', 1)
    scale3D = scale3D[0].slice(8, -1)
    scale3D = scale3D.split(',', 2)
    let x: number = parseFloat(scale3D[0])
    let y: number = parseFloat(scale3D[1])

    if ((lowerbound < x && x <= upperbound) && (lowerbound < y && y < upperbound)) {
      next[0].style.display = 'inline'
      previous[0].style.display = 'inline'
      close[0].style.display = 'inline'
      this.zooming = false
      this.goTo(this.activeSlide)
    }

    if ((lowerbound > x || x > upperbound) && (lowerbound > y || y > upperbound)) {
      next[0].style.display = 'none'
      previous[0].style.display = 'none'
      close[0].style.display = 'none'
      this.zooming = true
      this.goTo(this.activeSlide)
    }
    this.removeArrowsStartEndSlideDeck()
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
  removeArrowsStartEndSlideDeck() {
    let nextFullscreen: any = document.getElementsByClassName('next_fullscreen')
    let previousFullscreen: any = document.getElementsByClassName('previous_fullscreen')
    let next: any = document.getElementsByClassName('next')
    let previous: any = document.getElementsByClassName('previous')

    if (this.activeSlide == 0) {
      if (this.lightboxEnabled && this.zooming != true) {
        previousFullscreen[0].style.display = 'none'
        nextFullscreen[0].style.display = 'inline'
      } else {
        previous[0].style.display = 'none'
        next[0].style.display = 'inline'
      }
    } else if (this.activeSlide == this.images.length - 1 && this.zooming != true) {
      if (this.lightboxEnabled) {
        previousFullscreen[0].style.display = 'inline'
        nextFullscreen[0].style.display = 'none'
      } else {
        previous[0].style.display = 'inline'
        next[0].style.display = 'none'
      }
    }
    else {
      if(this.lightboxEnabled && (this.activeSlide != 0 && this.activeSlide != this.images.length -1)&&(this.zooming != true)){
        previousFullscreen[0].style.display = 'inline'
        nextFullscreen[0].style.display = 'inline'
      }else{
        previous[0].style.display = 'inline'
        next[0].style.display = 'inline'
      }
    }
  }
6
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

    this.setupDots()
    this.removeArrowsStartEndSlideDeck()
  }

  @Method()
  setupDots(){
    let dots: any = document.getElementsByClassName("dot")
    let i
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '')
    }

    dots[this.activeSlide].className += ' active'
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
    this.lightboxEnabled = true
    this.goTo(n)

    let modal: any = document.getElementsByClassName('modal')
    let wrapper: any = document.getElementsByClassName('wrapper')
    let closeButton: any = document.getElementsByClassName('close')
    let expandButton: any = document.getElementsByClassName('expand')

    modal[0].style.display = 'flex'
    wrapper[0].style.display = 'inline'
    closeButton[0].style.display = 'inline'
    expandButton[0].style.display = 'none'
  }

  @Method()
  closeModal() {
    this.lightboxEnabled = false
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
    this.removeArrowsStartEndSlideDeck()
  }

  @Listen('pinch')
  pinchHandler() {
    let next: any = document.getElementsByClassName('next_fullscreen')
    let previous: any = document.getElementsByClassName('previous_fullscreen')
    next[0].style.display = 'none'
    previous[0].style.display = 'none'
    this.zooming = true
  }

  @Listen('pinchend')
  pinchendHandler() {
    let scale = this.pinchZoomManager[this.activeSlide].getScale()
    let zoomThreshold = this.pinchZoomManager[this.activeSlide].getzoomThreshold()

    if (scale < zoomThreshold) {
      let next: any = document.getElementsByClassName('next_fullscreen')
      let previous: any = document.getElementsByClassName('previous_fullscreen')
      next[0].style.display = 'inline'
      previous[0].style.display = 'inline'
      this.zooming = false
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
            <span class="dot" onClick={() => this.goTo(index)}></span>
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
                style={{ width: "100%" }}
                class='pinchzoom'
                src={item.url}
                mode="contain" />
            </div>
          )}
        </div>
      </div>
    )
  }
}