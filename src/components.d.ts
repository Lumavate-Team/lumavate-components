/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */
declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


import {
  LumavateCarosel as LumavateCarousel
} from './components/lumavate-carousel/lumavate-carousel';

declare global {
  interface HTMLLumavateCarouselElement extends LumavateCarousel, HTMLStencilElement {
  }
  var HTMLLumavateCarouselElement: {
    prototype: HTMLLumavateCarouselElement;
    new (): HTMLLumavateCarouselElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-carousel": HTMLLumavateCarouselElement;
  }
  interface ElementTagNameMap {
    "lumavate-carousel": HTMLLumavateCarouselElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-carousel": JSXElements.LumavateCarouselAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateCarouselAttributes extends HTMLAttributes {
      CarouselImages?: string;
      arrowColor?: string;
      holdToZoom?: boolean;
      mode?: string;
      pinchZoom?: boolean;
      onClicked?: (event: CustomEvent) => void;
    }
  }
}


import {
  LumavateGridItem as LumavateGridItem
} from './components/lumavate-grid-item/lumavate-grid-item';

declare global {
  interface HTMLLumavateGridItemElement extends LumavateGridItem, HTMLStencilElement {
  }
  var HTMLLumavateGridItemElement: {
    prototype: HTMLLumavateGridItemElement;
    new (): HTMLLumavateGridItemElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-grid-item": HTMLLumavateGridItemElement;
  }
  interface ElementTagNameMap {
    "lumavate-grid-item": HTMLLumavateGridItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-grid-item": JSXElements.LumavateGridItemAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateGridItemAttributes extends HTMLAttributes {
      gridStartCol?: string;
      gridStartRow?: string;
      gridStopCol?: string;
      gridStopRow?: string;
      mode?: string;
      
    }
  }
}


import {
  LumavateGrid as LumavateGrid
} from './components/lumavate-grid/lumavate-grid';

declare global {
  interface HTMLLumavateGridElement extends LumavateGrid, HTMLStencilElement {
  }
  var HTMLLumavateGridElement: {
    prototype: HTMLLumavateGridElement;
    new (): HTMLLumavateGridElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-grid": HTMLLumavateGridElement;
  }
  interface ElementTagNameMap {
    "lumavate-grid": HTMLLumavateGridElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-grid": JSXElements.LumavateGridAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateGridAttributes extends HTMLAttributes {
      gridColumns?: string;
      gridRows?: string;
      
    }
  }
}


import {
  LumavateImage as LumavateImage
} from './components/lumavate-image/lumavate-image';

declare global {
  interface HTMLLumavateImageElement extends LumavateImage, HTMLStencilElement {
  }
  var HTMLLumavateImageElement: {
    prototype: HTMLLumavateImageElement;
    new (): HTMLLumavateImageElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-image": HTMLLumavateImageElement;
  }
  interface ElementTagNameMap {
    "lumavate-image": HTMLLumavateImageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-image": JSXElements.LumavateImageAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateImageAttributes extends HTMLAttributes {
      mode?: string;
      src?: string;
      onClicked?: (event: CustomEvent) => void;
    }
  }
}


import {
  LumavateLargeNavCard as LumavateLargeNavCard
} from './components/lumavate-large-nav-card/lumavate-large-nav-card';

declare global {
  interface HTMLLumavateLargeNavCardElement extends LumavateLargeNavCard, HTMLStencilElement {
  }
  var HTMLLumavateLargeNavCardElement: {
    prototype: HTMLLumavateLargeNavCardElement;
    new (): HTMLLumavateLargeNavCardElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-large-nav-card": HTMLLumavateLargeNavCardElement;
  }
  interface ElementTagNameMap {
    "lumavate-large-nav-card": HTMLLumavateLargeNavCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-large-nav-card": JSXElements.LumavateLargeNavCardAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateLargeNavCardAttributes extends HTMLAttributes {
      Caption?: boolean;
      CaptionBackgroundColor?: string;
      CaptionText?: string;
      CaptionTextColor?: string;
      CardColor?: string;
      CardImage?: boolean;
      CardLink?: string;
      ImageScaling?: string;
      ImageSource?: string;
      
    }
  }
}


import {
  LumavateNavBarItem as LumavateNavBarItem
} from './components/lumavate-nav-bar-item/lumavate-nav-bar-item';

declare global {
  interface HTMLLumavateNavBarItemElement extends LumavateNavBarItem, HTMLStencilElement {
  }
  var HTMLLumavateNavBarItemElement: {
    prototype: HTMLLumavateNavBarItemElement;
    new (): HTMLLumavateNavBarItemElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-nav-bar-item": HTMLLumavateNavBarItemElement;
  }
  interface ElementTagNameMap {
    "lumavate-nav-bar-item": HTMLLumavateNavBarItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-nav-bar-item": JSXElements.LumavateNavBarItemAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateNavBarItemAttributes extends HTMLAttributes {
      NavBarItemColor?: string;
      NavBarItemImageLink?: string;
      NavBarItemLink?: string;
      NavBarItemText?: string;
      
    }
  }
}


import {
  LumavateNavBar as LumavateNavBar
} from './components/lumavate-nav-bar/lumavate-nav-bar';

declare global {
  interface HTMLLumavateNavBarElement extends LumavateNavBar, HTMLStencilElement {
  }
  var HTMLLumavateNavBarElement: {
    prototype: HTMLLumavateNavBarElement;
    new (): HTMLLumavateNavBarElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-nav-bar": HTMLLumavateNavBarElement;
  }
  interface ElementTagNameMap {
    "lumavate-nav-bar": HTMLLumavateNavBarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-nav-bar": JSXElements.LumavateNavBarAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateNavBarAttributes extends HTMLAttributes {
      NavBarBackgroundColor?: string;
      NavBarItemColor?: string;
      NavBarItems?: string;
      NavBarPosition?: string;
      
    }
  }
}


import {
  LumavateQuote as LumavateQuote
} from './components/lumavate-quote/lumavate-quote';

declare global {
  interface HTMLLumavateQuoteElement extends LumavateQuote, HTMLStencilElement {
  }
  var HTMLLumavateQuoteElement: {
    prototype: HTMLLumavateQuoteElement;
    new (): HTMLLumavateQuoteElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-quote": HTMLLumavateQuoteElement;
  }
  interface ElementTagNameMap {
    "lumavate-quote": HTMLLumavateQuoteElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-quote": JSXElements.LumavateQuoteAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateQuoteAttributes extends HTMLAttributes {
      CardColor?: string;
      Color?: string;
      FontSize?: number;
      QuotationMarks?: boolean;
      QuoteText?: string;
      ShowCard?: boolean;
      
    }
  }
}


import {
  LumavateSmallNavCard as LumavateSmallNavCard
} from './components/lumavate-small-nav-card/lumavate-small-nav-card';

declare global {
  interface HTMLLumavateSmallNavCardElement extends LumavateSmallNavCard, HTMLStencilElement {
  }
  var HTMLLumavateSmallNavCardElement: {
    prototype: HTMLLumavateSmallNavCardElement;
    new (): HTMLLumavateSmallNavCardElement;
  };
  interface HTMLElementTagNameMap {
    "lumavate-small-nav-card": HTMLLumavateSmallNavCardElement;
  }
  interface ElementTagNameMap {
    "lumavate-small-nav-card": HTMLLumavateSmallNavCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "lumavate-small-nav-card": JSXElements.LumavateSmallNavCardAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateSmallNavCardAttributes extends HTMLAttributes {
      CardColor?: string;
      CardImage?: boolean;
      CardLink?: string;
      ImageScaling?: string;
      ImageSource?: string;
      SubTitle?: boolean;
      SubTitleText?: string;
      TitleText?: string;
      TitleTextColor?: string;
      
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
