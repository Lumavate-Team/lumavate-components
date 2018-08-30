import { Component, Prop, Event, EventEmitter, Element, Method, Listen } from '@stencil/core'
import HammerJS from 'hammerjs' //v2.0.8
import pinchZoom from './../lumavate-carousel/pinch-zoom'


@Component({
  tag: 'lumavate-carousel',
  styleUrl: 'lumavate-carousel.scss',
  shadow: true
})

export class LumavateCarousel {

  @Event() clicked: EventEmitter
  @Element() el: HTMLElement
  @Prop() CarouselImages: string = ''
  @Prop() mode: string = 'cover'
  @Prop() arrowColor: string = 'white'
  @Prop() displayDots: boolean = true

  images: Array<any>
  pinchZoomManager: any
  swipeManager: any
  swipeManagerLbox: any
  zooming: boolean = false
  sensitivity = 25 // horizontal % needed to trigger swipe
  activeSlide = 0
  slideCount = 0
  zoomOutFactor = 1.3
  timer: any
  lightboxEnabled: boolean = false
  lightbox: any
  swipeContainer: any
  wrapper: any
  closeButton: any
  expandButton: any
  next: any
  previous: any
  nextFullscreen: any
  previousFullscreen: any
  dots: any
  pinchZoomImages: any
  currentSlideCounter: any
  swipeContainerImages: any
  loaded: boolean = false

  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
    this.slideCount = this.images.length
  }

  componentDidLoad() {
    this.initHtmlVariables()
    this.swipeContainer.style.width = 100 * this.slideCount + '%'
    this.lightbox.style.width = 100 * this.slideCount + '%'

    this.initSwipe()
    this.initPinchZoom()
    this.toggleLightBoxArrows()
    this.updateDots()
    this.updateCurrentSlideCounter()
    this.setUIColor(this.arrowColor)
    this.setSwipeContainerHeight()

    this.lightbox.style.display = 'none'
    this.wrapper.style.display = 'none'
    this.closeButton.style.display = 'none'
    this.loaded = true
  }

  @Method()
  initHtmlVariables() {
    this.lightbox = this.el.shadowRoot.querySelector('.lightbox')
    this.swipeContainer = this.el.shadowRoot.querySelector('.swipecontainer')
    this.wrapper = this.el.shadowRoot.querySelector('.wrapper')
    this.closeButton = this.el.shadowRoot.querySelector('.close')
    this.expandButton = this.el.shadowRoot.querySelector('.expand')
    this.nextFullscreen = this.el.shadowRoot.querySelector('.next_fullscreen')
    this.previousFullscreen = this.el.shadowRoot.querySelector('.previous_fullscreen')
    this.next = this.el.shadowRoot.querySelector('.next')
    this.previous = this.el.shadowRoot.querySelector('.previous')
    this.currentSlideCounter = this.el.shadowRoot.querySelector('.currentSlideDisplay')

    this.dots = this.el.shadowRoot.querySelectorAll(".dot")
    this.pinchZoomImages = this.el.shadowRoot.querySelectorAll('.pinchzoom')
    this.swipeContainerImages = this.el.shadowRoot.querySelectorAll('.swipecontainerimages')

  }

  @Method()
  setSwipeContainerHeight() {
    //THIS IS A BUGFIX FOR OLD IPHONES
    let height = this.swipeContainer.scrollHeight
    let i
    for (i = 0; i < this.slideCount; i++) {
      this.swipeContainerImages[i].shadowRoot.childNodes[1].style.height = height + 'px'
    }
  }

  @Method()
  initPinchZoom() {
    let i = 0

    this.pinchZoomManager = []

    for (i; i < this.slideCount; i++) {
      this.pinchZoomManager.push(new pinchZoom(this.pinchZoomImages[i], { zoomOutFactor: this.zoomOutFactor }))
    }
    console.log(this.pinchZoomManager)

    let imageContainers: any = this.el.shadowRoot.querySelectorAll('.pinch-zoom-container')
    for (i = 0; i < this.slideCount; i++) {
      imageContainers[i].style.height = ''
      imageContainers[i].classList.add('pzcontainer')
    }
  }

  @Method()
  initSwipe() {
    this.swipeManager = new HammerJS.Manager(this.swipeContainer, { touchAction: 'pan-y' })
    this.swipeManagerLbox = new HammerJS.Manager(this.lightbox)
    this.swipeManager.add(new HammerJS.Pan({ threshold: 0, pointers: 0 }))
    this.swipeManagerLbox.add(new HammerJS.Pan({ threshold: 0, pointers: 0 }))
    this.swipeManager.on('pan', (e) => {
      if (!this.zooming) {
        if (this.slideCount != 1) {
          //Calculate pixel movements into 1:1 screen percents so gestures track with motion
          let percentage = 100 / this.slideCount * e.deltaX / this.swipeContainer.parentElement.clientWidth
          //Multiply percent by # of slide we’re on
          let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
          if (this.notVerticallyScrolling(e.deltaY)) {
            this.swipeContainer.style.transform = 'translateX( ' + percentageCalculated + '% )'
          }
          this.determineValidSwipe(e, percentage)
          this.checkForImageOverlap(e)
        }
      }
    })

    this.swipeManagerLbox.on('pan', (e) => {
      if (!this.zooming) {
        if (this.slideCount != 1) {

          //Calculate pixel movements into 1:1 screen percents so gestures track with motion
          let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
          //Multiply percent by # of slide we’re on
          let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
          this.lightbox.style.transform = 'translateX( ' + percentageCalculated + '% )'
          this.determineValidSwipe(e, percentage)
        }
      }
    })
  }

  checkForImageOverlap(e) {
    //sometimes a little bit of an adjacent image is showing so this makes sure
    //the carousel is always current active slide
    if (!this.notVerticallyScrolling(e.deltaY) && e.isFinal == true) {
      this.goTo(this.activeSlide)
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
        if (percentage <= -(this.sensitivity / this.slideCount)) {
          if (this.notVerticallyScrolling(e.deltaY)) {
            this.goTo(this.activeSlide + 1)
          }
        }
        else if (percentage >= (this.sensitivity / this.slideCount))
          this.goTo(this.activeSlide - 1)
        else
          this.goTo(this.activeSlide)
      }
    }
  }

  @Method()
  notVerticallyScrolling(deltaY) {
    if ((deltaY < -50 ) || (deltaY > 50)) {
      return false
    } else {
      return true
    }
  }

  @Method()
  goTo(number) {
    let previousSlide = this.activeSlide
    console.log(previousSlide)
    this.pinchZoomManager[previousSlide].disable()
    if (number < 0)
      this.activeSlide = 0
    else if (number > this.slideCount - 1)
      this.activeSlide = this.slideCount - 1
    else
      this.activeSlide = number

    // 5b. Apply transformation & smoothly animate via .is-animating CSS
    this.swipeContainer.classList.add('is-animating')
    this.lightbox.classList.add('is-animating')
    // console.log(this.swipeEL.classList)
    var percentage = -(100 / this.slideCount) * this.activeSlide
    this.swipeContainer.style.transform = 'translateX( ' + percentage + '% )'
    this.lightbox.style.transform = 'translateX( ' + percentage + '% )'
    let self = this
    clearTimeout(this.timer)
    this.timer = setTimeout(function () {
      self.swipeContainer.classList.remove('is-animating')
      self.lightbox.classList.remove('is-animating')
    }, 400)

    this.toggleLightBoxArrows()
    this.updateDots()
    this.updateCurrentSlideCounter()
    this.pinchZoomManager[previousSlide].enable()
  }

  @Method()
  toggleLightBoxArrows() {
    if ((this.activeSlide == 0) && (this.slideCount != 0)) {
      if (this.lightboxEnabled && this.zooming != true) {
        if (this.slideCount == 1) {
          this.previousFullscreen.style.display = 'none'
          this.nextFullscreen.style.display = 'none'
        } else {
          this.previousFullscreen.style.display = 'none'
          this.nextFullscreen.style.display = 'inline'
        }
      } else {
        if (this.slideCount == 1) {
          this.previous.style.display = 'none'
          this.next.style.display = 'none'
        } else {
          this.previous.style.display = 'none'
          this.next.style.display = 'inline'
        }
      }
    } else if (this.slideCount == 0) {
      this.previous.style.display = 'none'
      this.next.style.display = 'none'
      this.previousFullscreen.style.display = 'none'
      this.nextFullscreen.style.display = 'none'
    } else if (this.activeSlide == this.slideCount - 1 && this.zooming != true) {
      if (this.lightboxEnabled) {
        this.previousFullscreen.style.display = 'inline'
        this.nextFullscreen.style.display = 'none'
      } else {
        this.previous.style.display = 'inline'
        this.next.style.display = 'none'
      }
    } else {
      if (this.lightboxEnabled && (this.activeSlide != 0 && this.activeSlide != this.slideCount - 1) && (this.zooming != true)) {
        this.previousFullscreen.style.display = 'inline'
        this.nextFullscreen.style.display = 'inline'
      } else {
        this.previous.style.display = 'inline'
        this.next.style.display = 'inline'
      }
    }
  }

  @Method()
  updateDots() {
    let i
    if (this.displayDots && this.slideCount != 0) {
      for (i = 0; i < this.slideCount; i++) {
        this.dots[i].className = this.dots[i].className.replace('active', '')
      }
      this.dots[this.activeSlide].className += ' active'
    } else {
      for (i = 0; i < this.slideCount; i++) {
        this.dots[i].style.display = 'none'
      }
    }

  }

  @Method()
  updateCurrentSlideCounter() {
    if (this.lightboxEnabled) {
      this.currentSlideCounter.style.display = 'flex'
      if (this.slideCount != 0) {
        this.currentSlideCounter.innerText = (this.activeSlide + 1) + "/" + this.slideCount
      } else {
        this.currentSlideCounter.innerText = "0/0"
      }

    } else {
      this.currentSlideCounter.style.display = 'none'
    }
  }

  @Method()
  nextSlide(n) {
    let temp = this.activeSlide + n
    this.goTo(temp)
  }

  @Method()
  previousSlide(n) {
    let temp = this.activeSlide - n
    this.goTo(temp)
  }


  @Method()
  nextLightBox(n) {
    if (!this.zooming) {
      let temp = this.activeSlide + n
      this.goTo(temp)
    }
  }

  @Method()
  previousLightBox(n) {
    if (!this.zooming) {
      let temp = this.activeSlide - n
      this.goTo(temp)
    }
  }

  @Method()
  lightBox(n) {
    this.lightboxEnabled = true
    this.goTo(n)
    this.toggleLightboxCSS()
  }

  @Method()
  closeLightBox() {
    this.lightboxEnabled = false
    this.toggleLightboxCSS()
    this.toggleLightBoxArrows()
    this.updateCurrentSlideCounter()
  }

  @Method()
  toggleLightboxCSS() {
    if (this.lightboxEnabled) {
      this.lightbox.style.display = 'flex'
      this.wrapper.style.display = 'inline'
      this.closeButton.style.display = 'inline'
      this.expandButton.style.display = 'none'
    } else {
      this.lightbox.style.display = 'none'
      this.wrapper.style.display = 'none'
      this.nextFullscreen.style.display = 'none'
      this.previousFullscreen.style.display = 'none'
      this.closeButton.style.display = 'none'
      this.expandButton.style.display = 'inline'
    }
  }

  @Method()
  setUIColor(color) {
    this.closeButton.style.color = color
    this.expandButton.style.color = color
    this.nextFullscreen.style.color = color
    this.previousFullscreen.style.color = color
    this.next.style.color = color
    this.previous.style.color = color
    this.currentSlideCounter.style.color = color
  }

  @Listen('window:devicemotion')
  updateSwipeContainerHeight() {
    if (this.loaded) {
      this.setSwipeContainerHeight()
    }
  }

  @Listen('pz_zoomstart')
  zoomstart() {
    this.zooming = true
  }

  @Listen('pz_dragend')
  dragend() {
    this.RemoveLightBoxUIZooming()
  }

  @Listen('pz_doubletap')
  doubletap() {
    if (this.zooming) {
      this.zooming = false
    } else {
      this.zooming = true
    }
  }

  @Listen('pz_zoomupdate')
  RemoveLightBoxUIZooming() {
    let lowerbound: number = 0.97
    let upperbound: number = 1.08

    let scale3D = this.pinchZoomImages[this.activeSlide].style.transform.split(' t', 1)
    scale3D = scale3D[0].slice(8, -1)
    scale3D = scale3D.split(',', 2)
    let x: number = parseFloat(scale3D[0])
    let y: number = parseFloat(scale3D[1])

    if ((lowerbound < x && x <= upperbound) && (lowerbound < y && y < upperbound)) {
      this.zooming = false
      this.nextFullscreen.style.display = 'inline'
      this.previousFullscreen.style.display = 'inline'
      this.closeButton.style.display = 'inline'
      this.goTo(this.activeSlide)
    }

    if ((lowerbound > x || x > upperbound) && (lowerbound > y || y > upperbound)) {
      this.zooming = true
      this.nextFullscreen.style.display = 'none'
      this.previousFullscreen.style.display = 'none'
      this.closeButton.style.display = 'none'
      this.goTo(this.activeSlide)
    }
  }

  render() {
    return (
      <div class="slideshow-container" style={{ width: "100%", height: "100%" }}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

        <div class='swipecontainer'>
          {this.images.map((item) =>
            <div class="carouselImage" >
              <lumavate-image
                class="swipecontainerimages"
                src={item.url}
                mode={this.mode}>
              </lumavate-image>
            </div>
          )}
        </div>

        <a class="previous" onClick={() => this.previousSlide(1)}>&#10094;</a>
        <a class="next" onClick={() => this.nextSlide(1)}>&#10095;</a>

        <div class="dot-container">
          {this.images.map((_, index) =>
            <span class="dot" onClick={() => this.goTo(index)} />
          )}
        </div>

        <a class="expand material-icons" onClick={() => this.lightBox(this.activeSlide)}>fullscreen</a>

        <a class="previous_fullscreen" onClick={() => this.previousLightBox(1)}>&#10094;</a>
        <a class="next_fullscreen" onClick={() => this.nextLightBox(1)}>&#10095;</a>
        <div class='currentSlideDisplay' />
        <a class="close material-icons" onClick={() => this.closeLightBox()}>fullscreen_exit</a>
        <div class='wrapper' />

        <div class='lightbox'>
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