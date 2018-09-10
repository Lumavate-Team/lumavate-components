/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

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


declare global {

  namespace StencilComponents {
    interface LumavateCarousel {
      'arrowColor': string;
      'carouselImages': string;
      'displayDots': boolean;
      'lowerLightboxIcons': boolean;
      'mode': string;
    }
  }

  interface HTMLLumavateCarouselElement extends StencilComponents.LumavateCarousel, HTMLStencilElement {}

  var HTMLLumavateCarouselElement: {
    prototype: HTMLLumavateCarouselElement;
    new (): HTMLLumavateCarouselElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-carousel': HTMLLumavateCarouselElement;
  }
  interface ElementTagNameMap {
    'lumavate-carousel': HTMLLumavateCarouselElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-carousel': JSXElements.LumavateCarouselAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateCarouselAttributes extends HTMLAttributes {
      'arrowColor'?: string;
      'carouselImages'?: string;
      'displayDots'?: boolean;
      'lowerLightboxIcons'?: boolean;
      'mode'?: string;
      'onClicked'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateGridItem {
      'gridStartCol': string;
      'gridStartRow': string;
      'gridStopCol': string;
      'gridStopRow': string;
      'mode': string;
    }
  }

  interface HTMLLumavateGridItemElement extends StencilComponents.LumavateGridItem, HTMLStencilElement {}

  var HTMLLumavateGridItemElement: {
    prototype: HTMLLumavateGridItemElement;
    new (): HTMLLumavateGridItemElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-grid-item': HTMLLumavateGridItemElement;
  }
  interface ElementTagNameMap {
    'lumavate-grid-item': HTMLLumavateGridItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-grid-item': JSXElements.LumavateGridItemAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateGridItemAttributes extends HTMLAttributes {
      'gridStartCol'?: string;
      'gridStartRow'?: string;
      'gridStopCol'?: string;
      'gridStopRow'?: string;
      'mode'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateGrid {
      'gridColumns': string;
      'gridRows': string;
    }
  }

  interface HTMLLumavateGridElement extends StencilComponents.LumavateGrid, HTMLStencilElement {}

  var HTMLLumavateGridElement: {
    prototype: HTMLLumavateGridElement;
    new (): HTMLLumavateGridElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-grid': HTMLLumavateGridElement;
  }
  interface ElementTagNameMap {
    'lumavate-grid': HTMLLumavateGridElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-grid': JSXElements.LumavateGridAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateGridAttributes extends HTMLAttributes {
      'gridColumns'?: string;
      'gridRows'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateHeader {
      'BackgroundColor': string;
      'FontColor': string;
      'ShowBackButton': boolean;
      'Text': string;
      'showBackButton': () => void;
    }
  }

  interface HTMLLumavateHeaderElement extends StencilComponents.LumavateHeader, HTMLStencilElement {}

  var HTMLLumavateHeaderElement: {
    prototype: HTMLLumavateHeaderElement;
    new (): HTMLLumavateHeaderElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-header': HTMLLumavateHeaderElement;
  }
  interface ElementTagNameMap {
    'lumavate-header': HTMLLumavateHeaderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-header': JSXElements.LumavateHeaderAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateHeaderAttributes extends HTMLAttributes {
      'BackgroundColor'?: string;
      'FontColor'?: string;
      'ShowBackButton'?: boolean;
      'Text'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateImage {
      'mode': string;
      'src': string;
    }
  }

  interface HTMLLumavateImageElement extends StencilComponents.LumavateImage, HTMLStencilElement {}

  var HTMLLumavateImageElement: {
    prototype: HTMLLumavateImageElement;
    new (): HTMLLumavateImageElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-image': HTMLLumavateImageElement;
  }
  interface ElementTagNameMap {
    'lumavate-image': HTMLLumavateImageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-image': JSXElements.LumavateImageAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateImageAttributes extends HTMLAttributes {
      'mode'?: string;
      'src'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateLargeNavCard {
      'Caption': boolean;
      'CaptionBackgroundColor': string;
      'CaptionText': string;
      'CaptionTextColor': string;
      'CardColor': string;
      'CardImage': boolean;
      'CardLink': string;
      'ImageScaling': string;
      'ImageSource': string;
    }
  }

  interface HTMLLumavateLargeNavCardElement extends StencilComponents.LumavateLargeNavCard, HTMLStencilElement {}

  var HTMLLumavateLargeNavCardElement: {
    prototype: HTMLLumavateLargeNavCardElement;
    new (): HTMLLumavateLargeNavCardElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-large-nav-card': HTMLLumavateLargeNavCardElement;
  }
  interface ElementTagNameMap {
    'lumavate-large-nav-card': HTMLLumavateLargeNavCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-large-nav-card': JSXElements.LumavateLargeNavCardAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateLargeNavCardAttributes extends HTMLAttributes {
      'Caption'?: boolean;
      'CaptionBackgroundColor'?: string;
      'CaptionText'?: string;
      'CaptionTextColor'?: string;
      'CardColor'?: string;
      'CardImage'?: boolean;
      'CardLink'?: string;
      'ImageScaling'?: string;
      'ImageSource'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateMap {
      'address': string;
      'key': string;
      'zoom': string;
    }
  }

  interface HTMLLumavateMapElement extends StencilComponents.LumavateMap, HTMLStencilElement {}

  var HTMLLumavateMapElement: {
    prototype: HTMLLumavateMapElement;
    new (): HTMLLumavateMapElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-map': HTMLLumavateMapElement;
  }
  interface ElementTagNameMap {
    'lumavate-map': HTMLLumavateMapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-map': JSXElements.LumavateMapAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateMapAttributes extends HTMLAttributes {
      'address'?: string;
      'key'?: string;
      'zoom'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateModal {
      'Id': string;
      'showModal': () => void;
    }
  }

  interface HTMLLumavateModalElement extends StencilComponents.LumavateModal, HTMLStencilElement {}

  var HTMLLumavateModalElement: {
    prototype: HTMLLumavateModalElement;
    new (): HTMLLumavateModalElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-modal': HTMLLumavateModalElement;
  }
  interface ElementTagNameMap {
    'lumavate-modal': HTMLLumavateModalElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-modal': JSXElements.LumavateModalAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateModalAttributes extends HTMLAttributes {
      'Id'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateNavBarItem {
      'NavBarItemColor': string;
      'NavBarItemImageLink': string;
      'NavBarItemLink': string;
      'NavBarItemText': string;
    }
  }

  interface HTMLLumavateNavBarItemElement extends StencilComponents.LumavateNavBarItem, HTMLStencilElement {}

  var HTMLLumavateNavBarItemElement: {
    prototype: HTMLLumavateNavBarItemElement;
    new (): HTMLLumavateNavBarItemElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-nav-bar-item': HTMLLumavateNavBarItemElement;
  }
  interface ElementTagNameMap {
    'lumavate-nav-bar-item': HTMLLumavateNavBarItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-nav-bar-item': JSXElements.LumavateNavBarItemAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateNavBarItemAttributes extends HTMLAttributes {
      'NavBarItemColor'?: string;
      'NavBarItemImageLink'?: string;
      'NavBarItemLink'?: string;
      'NavBarItemText'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateNavBar {
      'NavBarBackgroundColor': string;
      'NavBarItemColor': string;
      'NavBarItems': string;
      'NavBarPosition': string;
    }
  }

  interface HTMLLumavateNavBarElement extends StencilComponents.LumavateNavBar, HTMLStencilElement {}

  var HTMLLumavateNavBarElement: {
    prototype: HTMLLumavateNavBarElement;
    new (): HTMLLumavateNavBarElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-nav-bar': HTMLLumavateNavBarElement;
  }
  interface ElementTagNameMap {
    'lumavate-nav-bar': HTMLLumavateNavBarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-nav-bar': JSXElements.LumavateNavBarAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateNavBarAttributes extends HTMLAttributes {
      'NavBarBackgroundColor'?: string;
      'NavBarItemColor'?: string;
      'NavBarItems'?: string;
      'NavBarPosition'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateQuote {
      'CardColor': string;
      'Color': string;
      'FontSize': number;
      'QuotationMarks': boolean;
      'QuoteText': string;
      'ShowCard': boolean;
    }
  }

  interface HTMLLumavateQuoteElement extends StencilComponents.LumavateQuote, HTMLStencilElement {}

  var HTMLLumavateQuoteElement: {
    prototype: HTMLLumavateQuoteElement;
    new (): HTMLLumavateQuoteElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-quote': HTMLLumavateQuoteElement;
  }
  interface ElementTagNameMap {
    'lumavate-quote': HTMLLumavateQuoteElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-quote': JSXElements.LumavateQuoteAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateQuoteAttributes extends HTMLAttributes {
      'CardColor'?: string;
      'Color'?: string;
      'FontSize'?: number;
      'QuotationMarks'?: boolean;
      'QuoteText'?: string;
      'ShowCard'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface LumavateSmallNavCard {
      'CardColor': string;
      'CardImage': boolean;
      'CardLink': string;
      'ImageScaling': string;
      'ImageSource': string;
      'SubTitle': boolean;
      'SubTitleText': string;
      'TitleText': string;
      'TitleTextColor': string;
    }
  }

  interface HTMLLumavateSmallNavCardElement extends StencilComponents.LumavateSmallNavCard, HTMLStencilElement {}

  var HTMLLumavateSmallNavCardElement: {
    prototype: HTMLLumavateSmallNavCardElement;
    new (): HTMLLumavateSmallNavCardElement;
  };
  interface HTMLElementTagNameMap {
    'lumavate-small-nav-card': HTMLLumavateSmallNavCardElement;
  }
  interface ElementTagNameMap {
    'lumavate-small-nav-card': HTMLLumavateSmallNavCardElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'lumavate-small-nav-card': JSXElements.LumavateSmallNavCardAttributes;
    }
  }
  namespace JSXElements {
    export interface LumavateSmallNavCardAttributes extends HTMLAttributes {
      'CardColor'?: string;
      'CardImage'?: boolean;
      'CardLink'?: string;
      'ImageScaling'?: string;
      'ImageSource'?: string;
      'SubTitle'?: boolean;
      'SubTitleText'?: string;
      'TitleText'?: string;
      'TitleTextColor'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
