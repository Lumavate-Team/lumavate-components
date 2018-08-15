import { Component, Prop, Event, EventEmitter, Element, Method } from '@stencil/core'
import HammerJS from 'hammerjs'
// import Zoom from 'zoom-it'


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
  pinchEL: any
  swipeEL: HTMLElement
  swipeElLbox: HTMLElement
  swipeManager: any
  swipeManagerLbox: any
  zoomed: boolean = false

  slidePanelSelector = '.slider-panel'
  sensitivity = 18 // horizontal % needed to trigger swipe
  activeSlide = 0
  slideCount = 0
  timer: any
  img: any
  lastX: any = 0
  lastY: any = 0
  imgWidth: any = null
  imgHeight: any = null
  viewportWidth: any = null
  scale: any = null
  lastScale: any = null
  viewportHeight: any
  curWidth: any
  curHeight: any
  pinchCenter: any = null
  MIN_SCALE = 1 // 1=scaling when first loaded
  MAX_SCALE = 26
  pinchCenterOffset: any = null
  container: any = null
  hammer: any
  pzManager: any
  x: any = 0
  y: any = 0


  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
    this.slideCount = this.images.length
  }

  componentDidLoad() {
    this.initSwipe()
    this.initPinchZoom()
    let modal: any = document.getElementsByClassName('modal')
    let container: any = document.getElementsByClassName('container')
    let wrapper: any = document.getElementsByClassName('wrapper')
    let closeButton: any = document.getElementsByClassName('close')
    modal[0].style.display = 'none'
    container[0].style.width = 100 * this.slideCount + '%'
    modal[0].style.width = 100 * this.slideCount + '%'
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
      //Calculate pixel movements into 1:1 screen percents so gestures track with motion
      let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
      //Multiply percent by # of slide we’re on
      let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
      this.swipeEL.style.transform = 'translateX( ' + percentageCalculated + '% )'
      this.determineValidSwipe(e, percentage)
    })

    this.swipeManagerLbox.on('pan', (e) => {
      //Calculate pixel movements into 1:1 screen percents so gestures track with motion
      let percentage = 100 / this.slideCount * e.deltaX / window.innerWidth
      //Multiply percent by # of slide we’re on
      let percentageCalculated = percentage - 100 / this.slideCount * this.activeSlide
      this.swipeElLbox.style.transform = 'translateX( ' + percentageCalculated + '% )'
      this.determineValidSwipe(e, percentage)

    })
  }

  // @Method()
  // initPinchZoom(){
  //   let wnd = window
  //   this.img = document.getElementById('pinchIMG')
  //   this.pinchZoom = new Zoom.Zoom(this.img, {
  //     pan:false,
  //     rotate: false
  //   }, wnd)
  // }

  @Method()
  initPinchZoom() {
    this.img = document.getElementById('pinchIMG')
    this.container = this.img.parentElement

    this.disableImgEventHandlers()

    this.imgWidth = this.img.parentElement.parentElement.clientWidth
    this.imgHeight = this.img.clientHeight
    this.viewportWidth = this.img.offsetWidth
    this.scale = 1
    this.lastScale = this.scale
    this.viewportHeight = this.img.parentElement.offsetHeight
    this.curWidth = this.imgWidth * this.scale
    this.curHeight = this.imgHeight * this.scale

    var self = this
    this.hammer = new HammerJS(this.container, {
      domEvents: true
    })

    this.hammer.get('pinch').set({
      enable: true
    })

    this.hammer.on('pan', function (e) {
      self.translate(e.deltaX, e.deltaY)
    })

    this.hammer.on('panend', function () {
      self.updateLastPos()
    })

    this.hammer.on('pinch', function (e) {

      // We only calculate the pinch center on the first pinch event as we want the center to
      // stay consistent during the entire pinch
      if (self.pinchCenter === null) {
        self.pinchCenter = self.rawCenter(e)
        var offsetX = self.pinchCenter.x * self.scale - (-self.x * self.scale + Math.min(self.viewportWidth, self.curWidth) / 2)
        var offsetY = self.pinchCenter.y * self.scale - (-self.y * self.scale + Math.min(self.viewportHeight, self.curHeight) / 2)
        self.pinchCenterOffset = { x: offsetX, y: offsetY }
      }

      // When the user pinch zooms, she/he expects the pinch center to remain in the same
      // relative location of the screen. To achieve this, the raw zoom center is calculated by
      // first storing the pinch center and the scaled offset to the current center of the
      // image. The new scale is then used to calculate the zoom center. This has the effect of
      // actually translating the zoom center on each pinch zoom event.
      var newScale = self.restrictScale(self.scale * e.scale)
      var zoomX = self.pinchCenter.x * newScale - self.pinchCenterOffset.x
      var zoomY = self.pinchCenter.y * newScale - self.pinchCenterOffset.y
      var zoomCenter = { x: zoomX / newScale, y: zoomY / newScale }

      self.zoomAround(e.scale, zoomCenter.x, zoomCenter.y, true)
    })

    this.hammer.on('pinchend', function () {
      self.updateLastScale()
      self.updateLastPos()
      self.pinchCenter = null
    })

    this.hammer.on('doubletap', function (e) {
      var c = self.rawCenter(e)
      self.zoomAround(2, c.x, c.y, false)
    })
  }

  @Method()
  zoomAround(scaleBy, rawZoomX, rawZoomY, doNotUpdateLast) {
    // Zoom
    this.zoom(scaleBy)

    // New raw center of viewport
    var rawCenterX = -this.x + Math.min(this.viewportWidth, this.curWidth) / 2 / this.scale
    var rawCenterY = -this.y + Math.min(this.viewportHeight, this.curHeight) / 2 / this.scale

    // Delta
    var deltaX = (rawCenterX - rawZoomX) * this.scale
    var deltaY = (rawCenterY - rawZoomY) * this.scale

    // Translate back to zoom center
    this.translate(deltaX, deltaY)

    if (!doNotUpdateLast) {
      this.updateLastScale()
      this.updateLastPos()
    }
  }

  @Method()
  zoom(scaleBy) {
    this.scale = this.restrictScale(this.lastScale * scaleBy)

    this.curWidth = this.imgWidth * this.scale
    this.curHeight = this.imgHeight * this.scale

    this.img.style.width = Math.ceil(this.curWidth) + 'px'
    this.img.style.height = Math.ceil(this.curHeight) + 'px'

    // Adjust margins to make sure that we aren't out of bounds
    this.translate(0, 0)
  }

  @Method()
  restrictScale(scale) {
    if (scale < this.MIN_SCALE) {
      scale = this.MIN_SCALE
    } else if (scale > this.MAX_SCALE) {
      scale = this.MAX_SCALE
    }
    return scale
  }

  @Method()
  rawCenter(e) {
    var pos = this.absolutePosition(this.container)

    // We need to account for the scroll position
    var scrollLeft = window.pageXOffset ? window.pageXOffset : document.body.scrollLeft
    var scrollTop = window.pageYOffset ? window.pageYOffset : document.body.scrollTop

    var zoomX = -this.x + (e.center.x - pos.x + scrollLeft) / this.scale
    var zoomY = -this.y + (e.center.y - pos.y + scrollTop) / this.scale

    return { x: zoomX, y: zoomY }
  }

  @Method()
  absolutePosition(el) {
    var x = 0,
      y = 0

    while (el !== null) {
      x += el.offsetLeft
      y += el.offsetTop
      el = el.offsetParent
    }

    return { x: x, y: y }
  }


  @Method()
  translate(deltaX, deltaY) {
    // We restrict to the min of the viewport width/height or current width/height as the
    // current width/height may be smaller than the viewport width/height

    var newX = this.restrictRawPos(this.lastX + deltaX / this.scale,
      Math.min(this.viewportWidth, this.curWidth), this.imgWidth)
    this.x = newX
    this.img.style.marginLeft = Math.ceil(newX * this.scale) + 'px'

    var newY = this.restrictRawPos(this.lastY + deltaY / this.scale,
      Math.min(this.viewportHeight, this.curHeight), this.imgHeight)
    this.y = newY
    this.img.style.marginTop = Math.ceil(newY * this.scale) + 'px'
  }

  @Method()
  restrictRawPos(pos, viewportDim, imgDim) {
    if (pos < viewportDim / this.scale - imgDim) { // too far left/up?
      pos = viewportDim / this.scale - imgDim
    } else if (pos > 0) { // too far right/down?
      pos = 0
    }
    return pos
  }

  @Method()
  updateLastPos() {
    this.lastX = this.x
    this.lastY = this.y
  }

  @Method()
  updateLastScale() {
    this.lastScale = this.scale
  }

  @Method()
  disableImgEventHandlers() {
    var events = ['onclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover',
      'onmouseup', 'ondblclick', 'onfocus', 'onblur']
    var self = this
    events.forEach(function (event) {
      self.img[event] = function () {
        return false
      }
    })
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


  // @Method()
  // nextLightBox(n) {
  //   this.lightBox(this.activeSlide += n)
  // }

  // @Method()
  // previousLightBox(n) {
  //   this.lightBox(this.activeSlide -= n)
  // }

  @Method()
  lightBox() {
    // this.goTo(n)

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

        <a class="expand material-icons" onClick={() => this.lightBox()}>fullscreen</a>

        {/*<a class="previous_fullscreen" onClick={() => this.previousLightBox(1)}>&#10094;</a>
        <a class="next_fullscreen" onClick={() => this.nextLightBox(1)}>&#10095;</a>*/}

        <span class="close material-icons" onClick={() => this.closeModal()}>fullscreen_exit</span>
        <div class='wrapper'>
        </div>
        <div class='modal'>
          {this.images.map((item) =>
            <div style={{ width: "100%", height: "100%" }}>
              <lumavate-image
                id='pinchIMG'
                src={item.url}
                mode="contain" />
            </div>
          )}

          {/* <div style={{ width: "100%", height: "100%" }}>
              <lumavate-image
                id='pinchIMG'
                src='https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/Stock-Lavender-Closeup-500_bfa14455.jpg'
                mode="contain" />
            </div> */}
        </div>
      </div>
    )
  }
}