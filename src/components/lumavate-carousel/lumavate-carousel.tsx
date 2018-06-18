import { Component, Prop, Event, EventEmitter, Element, Method } from '@stencil/core';
// import { LumavateImage } from '../lumavate-image/lumavate-image';

@Component({
  tag: 'lumavate-carousel',
  styleUrl: 'lumavate-carousel.scss'
})
export class LumavateCarosel {

  @Event() clicked: EventEmitter;
  @Element() el: HTMLElement;
  @Prop() CarouselImages: string = '';
  @Prop() mode: string = 'contain';

  images: Array<any>
  carouselIndex: number = 1

  componentWillLoad() {
    this.images = JSON.parse(this.CarouselImages)
  }

  componentDidLoad() {
    this.showSlides(this.carouselIndex)
  }

  imageClick(e) {
    this.clicked.emit(e);
  }

  @Method()
  currentSlide(n) {
    this.showSlides(n)
  }

  @Method()
  moveRight(n) {
    this.showSlides(this.carouselIndex += n)
  }

  @Method()
  moveLeft(n) {
    this.showSlides(this.carouselIndex -= n)
  }

  @Method()
  showSlides(n) {
    let i: number
    let slides: any = document.getElementsByClassName("mySlides")
    let dots: any = document.getElementsByClassName("dot")

    if (n > slides.length) { this.carouselIndex = 1 }
    if (n < 1) { this.carouselIndex = slides.length }

    console.log(slides.length)

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className =  dots[i].className.replace('active', '')
    }

    slides[this.carouselIndex -1].style.display = 'block'
    dots[this.carouselIndex -1].className += 'active'

  }

  render() {
    return (
      <div>
        {this.images.map((item) =>
          <div class="mySlides fade" style={{ width: "500px", height: "100%", margin: "8px" }}>
            <lumavate-image
              src={item.url}
              mode='cover'>

            </lumavate-image>
          </div>
        )}
        <script>console.log(document.getElementsByClassName("mySlides").length);</script>

        <a class="prev" >&#10094;</a>
        <a class="next" >&#10095;</a>

        <div>
          <span class="dot" ></span>
          <span class="dot" ></span>
        </div>
      </div>
    )
  }
}
