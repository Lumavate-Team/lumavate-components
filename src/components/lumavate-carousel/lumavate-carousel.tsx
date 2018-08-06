import { Component, Prop, Event, EventEmitter, Element, Method } from '@stencil/core';
import PinchZoom from 'pinch-zoom-js'


@Component({
  tag: 'lumavate-carousel',
  styleUrl: 'lumavate-carousel.scss'
})
export class LumavateCarosel {

  @Event() clicked: EventEmitter;
  @Element() el: HTMLElement;
  @Prop() CarouselImages: string = '';
  @Prop() mode: string = 'contain';
  @Prop() arrowColor: string = 'white';

  images: Array<any>
  carouselIndex: number = 1
  pinchEL: any
  pz: any

  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
  }

  componentDidLoad() {
    this.initPinchZoom()
    this.showSlides(this.carouselIndex)
    this.setArrowColor()
  }

  @Method()
  initPinchZoom() {
    this.pinchEL = document.querySelector('div.pinch-zoom');
    this.pz = new PinchZoom(this.pinchEL, {});
    let modal: any = document.getElementsByClassName('modal')
    let slides: any = document.getElementsByClassName("pinch-zoom-container")
    let closeButton: any = document.getElementsByClassName('close')
    modal[0].style.display = 'none'
    slides[0].style.position = ''
    closeButton[0].style.display = 'none'
  }

  @Method()
  setArrowColor() {
    let nextArrow: any = document.getElementsByClassName("next")
    let previousArrow: any = document.getElementsByClassName("previous")

    nextArrow[0].style.color = this.arrowColor
    previousArrow[0].style.color = this.arrowColor

  }
  @Method()
  setSlide(n) {
    this.showSlides(this.carouselIndex = n)
  }

  @Method()
  next(n) {
    this.showSlides(this.carouselIndex += n)
  }

  @Method()
  previous(n) {
    this.showSlides(this.carouselIndex -= n)
  }

  @Method()
  showSlides(n) {
    let i: number
    let slides: any = document.getElementsByClassName("carouselImage")
    let dots: any = document.getElementsByClassName("dot")

    if (n > slides.length) { this.carouselIndex = 1 }
    if (n < 1) { this.carouselIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('active', '')
    }

    slides[this.carouselIndex - 1].style.display = 'block'
    dots[this.carouselIndex - 1].className += ' active'

  }

  @Method()
  nextLightBox(n) {
    this.pinchEL = document.querySelector('div.pinch-zoom');
    this.pz = new PinchZoom(this.pinchEL, {});
    this.lightBox(this.carouselIndex += n)
  }

  @Method()
  previousLightBox(n) {
    this.pinchEL = document.querySelector('div.pinch-zoom');
    this.pz = new PinchZoom(this.pinchEL, {});
    this.lightBox(this.carouselIndex -= n)
  }

  @Method()
  lightBox(n) {
    this.showSlides(n)

    let modal: any = document.getElementsByClassName('modal')
    let slides: any = document.getElementsByClassName("pinch-zoom")
    let closeButton: any = document.getElementsByClassName('close')
    let expandButton: any = document.getElementsByClassName('expand')
    let next: any = document.getElementsByClassName('next_fullscreen');
    let previous: any = document.getElementsByClassName('previous_fullscreen');


    modal[0].style.display = 'inline'
    next[0].style.display = 'inline'
    previous[0].style.display = 'inline'

    if (n > this.images.length) { this.carouselIndex = 1 }
    if (n < 1) { this.carouselIndex = slides.length }

    slides[0].childNodes[0].src = this.images[this.carouselIndex -1].url
    slides[0].style.display = 'inline'

    closeButton[0].style.display = 'inline'
    expandButton[0].style.display = 'none'
  }

  @Method()
  closeModal() {
    let modal: any = document.getElementsByClassName('modal')
    let expandButton: any = document.getElementsByClassName('expand')
    let closeButton: any = document.getElementsByClassName('close material-icons')
    let next: any = document.getElementsByClassName('next_fullscreen');
    let previous: any = document.getElementsByClassName('previous_fullscreen');


    modal[0].style.display = 'none'
    next[0].style.display = 'none'
    previous[0].style.display = 'none'
    closeButton[0].style.display = 'none'
    expandButton[0].style.display = 'inline'
    // slides[this.carouselIndex - 1].style.display = "none"
    console.log(closeButton[0])
  }


  render() {
    return (
      <div class="slideshow-container" style={{ width: "100%", height: "100%" }}>
        <style>
          @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
        </style>
        {this.images.map((item) =>
          <div class="carouselImage fade" style={{ width: "100%", height: "100%" }}>
            <lumavate-image
              src={item.url}
              mode={this.mode}>
            </lumavate-image>
          </div>
        )}

        <a class="previous" onClick={() => this.previous(1)}>&#10094;</a>
        <a class="next" onClick={() => this.next(1)}>&#10095;</a>

        <div class="dot-container">
          {this.images.map((_, index) =>
            <span class="dot" onClick={() => this.setSlide(index + 1)}></span>
          )}
        </div>

        <a class="expand material-icons" onClick={() => this.lightBox(this.carouselIndex)}>fullscreen</a>

        <a class="previous_fullscreen" onClick={() => this.previousLightBox(1)}>&#10094;</a>
        <a class="next_fullscreen" onClick={() => this.nextLightBox(1)}>&#10095;</a>

        <span class="close material-icons" onClick={() => this.closeModal()}>fullscreen_exit</span>
        <div class='modal'>
          <div class="pinch-zoom" style={{ width: "100%", height: "100%" }}>
            <lumavate-image
              src=''
              mode="contain" />
          </div>
        </div >
      </div >
    )
  }
}