/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface LumavateCarousel {
    'arrowColor': string;
    'carouselImages': string;
    /**
    * Determine if dots should be displayed at bottom of carousel
    */
    'displayDots': boolean;
    'lowerLightboxIcons': boolean;
    'mode': string;
  }
  interface LumavateCarouselAttributes extends StencilHTMLAttributes {
    'arrowColor'?: string;
    'carouselImages'?: string;
    /**
    * Determine if dots should be displayed at bottom of carousel
    */
    'displayDots'?: boolean;
    'lowerLightboxIcons'?: boolean;
    'mode'?: string;
    'onClicked'?: (event: CustomEvent) => void;
  }

  interface LumavateDisclosure {
    'buttonColor': string;
    'buttonText': string;
    'buttonTextColor': string;
    'buttonTextFont': string;
    'close': () => void;
    'disclosureBackgroundColor': string;
    'disclosureText': string;
    'disclosureTextColor': string;
    'disclosureTextFont': string;
    'headerBackgroundColor': string;
    'headerText': string;
    'headerTextColor': string;
    'link1': string;
    'link1Text': string;
    'link1TextColor': string;
    'link2': string;
    'link2Text': string;
    'link2TextColor': string;
    'link3': string;
    'link3Text': string;
    'link3TextColor': string;
    'popUpSpeed': string;
  }
  interface LumavateDisclosureAttributes extends StencilHTMLAttributes {
    'buttonColor'?: string;
    'buttonText'?: string;
    'buttonTextColor'?: string;
    'buttonTextFont'?: string;
    'disclosureBackgroundColor'?: string;
    'disclosureText'?: string;
    'disclosureTextColor'?: string;
    'disclosureTextFont'?: string;
    'headerBackgroundColor'?: string;
    'headerText'?: string;
    'headerTextColor'?: string;
    'link1'?: string;
    'link1Text'?: string;
    'link1TextColor'?: string;
    'link2'?: string;
    'link2Text'?: string;
    'link2TextColor'?: string;
    'link3'?: string;
    'link3Text'?: string;
    'link3TextColor'?: string;
    'popUpSpeed'?: string;
  }

  interface LumavateHeader {
    'BackgroundColor': string;
    'FontColor': string;
    'ShowBackButton': boolean;
    'Text': string;
    'showBackButton': () => void;
  }
  interface LumavateHeaderAttributes extends StencilHTMLAttributes {
    'BackgroundColor'?: string;
    'FontColor'?: string;
    'ShowBackButton'?: boolean;
    'Text'?: string;
  }

  interface LumavateImage {
    'mode': string;
    'src': string;
  }
  interface LumavateImageAttributes extends StencilHTMLAttributes {
    'mode'?: string;
    'src'?: string;
  }

  interface LumavateMap {
    'address': string;
    'key': string;
    'zoom': string;
  }
  interface LumavateMapAttributes extends StencilHTMLAttributes {
    'address'?: string;
    'key'?: string;
    'zoom'?: string;
  }

  interface LumavateNavBarItem {
    'NavBarItemColor': string;
    'NavBarItemImageLink': string;
    'NavBarItemLink': string;
    'NavBarItemText': string;
  }
  interface LumavateNavBarItemAttributes extends StencilHTMLAttributes {
    'NavBarItemColor'?: string;
    'NavBarItemImageLink'?: string;
    'NavBarItemLink'?: string;
    'NavBarItemText'?: string;
  }

  interface LumavateNavBar {
    'NavBarBackgroundColor': string;
    'NavBarItemColor': string;
    'NavBarItems': string;
    'NavBarPosition': string;
  }
  interface LumavateNavBarAttributes extends StencilHTMLAttributes {
    'NavBarBackgroundColor'?: string;
    'NavBarItemColor'?: string;
    'NavBarItems'?: string;
    'NavBarPosition'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'LumavateCarousel': Components.LumavateCarousel;
    'LumavateDisclosure': Components.LumavateDisclosure;
    'LumavateHeader': Components.LumavateHeader;
    'LumavateImage': Components.LumavateImage;
    'LumavateMap': Components.LumavateMap;
    'LumavateNavBarItem': Components.LumavateNavBarItem;
    'LumavateNavBar': Components.LumavateNavBar;
  }

  interface StencilIntrinsicElements {
    'lumavate-carousel': Components.LumavateCarouselAttributes;
    'lumavate-disclosure': Components.LumavateDisclosureAttributes;
    'lumavate-header': Components.LumavateHeaderAttributes;
    'lumavate-image': Components.LumavateImageAttributes;
    'lumavate-map': Components.LumavateMapAttributes;
    'lumavate-nav-bar-item': Components.LumavateNavBarItemAttributes;
    'lumavate-nav-bar': Components.LumavateNavBarAttributes;
  }


  interface HTMLLumavateCarouselElement extends Components.LumavateCarousel, HTMLStencilElement {}
  var HTMLLumavateCarouselElement: {
    prototype: HTMLLumavateCarouselElement;
    new (): HTMLLumavateCarouselElement;
  };

  interface HTMLLumavateDisclosureElement extends Components.LumavateDisclosure, HTMLStencilElement {}
  var HTMLLumavateDisclosureElement: {
    prototype: HTMLLumavateDisclosureElement;
    new (): HTMLLumavateDisclosureElement;
  };

  interface HTMLLumavateHeaderElement extends Components.LumavateHeader, HTMLStencilElement {}
  var HTMLLumavateHeaderElement: {
    prototype: HTMLLumavateHeaderElement;
    new (): HTMLLumavateHeaderElement;
  };

  interface HTMLLumavateImageElement extends Components.LumavateImage, HTMLStencilElement {}
  var HTMLLumavateImageElement: {
    prototype: HTMLLumavateImageElement;
    new (): HTMLLumavateImageElement;
  };

  interface HTMLLumavateMapElement extends Components.LumavateMap, HTMLStencilElement {}
  var HTMLLumavateMapElement: {
    prototype: HTMLLumavateMapElement;
    new (): HTMLLumavateMapElement;
  };

  interface HTMLLumavateNavBarItemElement extends Components.LumavateNavBarItem, HTMLStencilElement {}
  var HTMLLumavateNavBarItemElement: {
    prototype: HTMLLumavateNavBarItemElement;
    new (): HTMLLumavateNavBarItemElement;
  };

  interface HTMLLumavateNavBarElement extends Components.LumavateNavBar, HTMLStencilElement {}
  var HTMLLumavateNavBarElement: {
    prototype: HTMLLumavateNavBarElement;
    new (): HTMLLumavateNavBarElement;
  };

  interface HTMLElementTagNameMap {
    'lumavate-carousel': HTMLLumavateCarouselElement
    'lumavate-disclosure': HTMLLumavateDisclosureElement
    'lumavate-header': HTMLLumavateHeaderElement
    'lumavate-image': HTMLLumavateImageElement
    'lumavate-map': HTMLLumavateMapElement
    'lumavate-nav-bar-item': HTMLLumavateNavBarItemElement
    'lumavate-nav-bar': HTMLLumavateNavBarElement
  }

  interface ElementTagNameMap {
    'lumavate-carousel': HTMLLumavateCarouselElement;
    'lumavate-disclosure': HTMLLumavateDisclosureElement;
    'lumavate-header': HTMLLumavateHeaderElement;
    'lumavate-image': HTMLLumavateImageElement;
    'lumavate-map': HTMLLumavateMapElement;
    'lumavate-nav-bar-item': HTMLLumavateNavBarItemElement;
    'lumavate-nav-bar': HTMLLumavateNavBarElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
