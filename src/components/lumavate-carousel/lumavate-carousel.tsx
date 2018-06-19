import { Component, Prop, Event, EventEmitter, Element, Method } from '@stencil/core';

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

  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
  }

  componentDidLoad() {
    this.showSlides(this.carouselIndex)
    this.setArrowColor()
  }

  @Method()
  setArrowColor(){
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

  render() {
    return (
      <div class="slideshow-container" style={{ width: "100%", height: "100%" }}>
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
      </div>
    )
  }
}
