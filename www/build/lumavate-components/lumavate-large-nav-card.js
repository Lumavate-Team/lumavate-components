/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateLargeNavCard {
    constructor() {
        this.Caption = true;
        this.CaptionText = 'Dropbox Onboarding Case Study';
        this.CaptionTextColor = '#000';
        this.CaptionBackgroundColor = '#FFF';
        this.CardColor = '#D8E7FF';
        this.CardImage = true;
        this.ImageSource = 'https://s3.amazonaws.com/assets.labelnexusdev.com/images/dbtransparent.png';
        this.ImageScaling = 'contain';
        this.CardLink = 'https://www.google.com';
        this.imageMinHeight = '';
    }
    cardClicked() {
        if (this.CardLink) {
            window.location.href = this.CardLink;
        }
    }
    componentWillLoad() {
        this.imageMinHeight = this.Caption ? '148px' : '180px';
    }
    render() {
        return (h("div", { class: "container", onClick: () => this.cardClicked() },
            this.CardImage ?
                h("div", { class: "image", style: { backgroundColor: this.CardColor, backgroundImage: "url(" + this.ImageSource + ")", backgroundSize: this.ImageScaling, minHeight: this.imageMinHeight } })
                : h("div", { class: "no-image", style: { backgroundColor: this.CardColor, minHeight: this.imageMinHeight } }),
            this.Caption ?
                h("div", { class: "caption", style: { backgroundColor: this.CaptionBackgroundColor, color: this.CaptionTextColor } },
                    h("div", { class: "text" }, this.CaptionText)) : ''));
    }
    static get is() { return "lumavate-large-nav-card"; }
    static get properties() { return { "Caption": { "type": Boolean, "attr": "caption" }, "CaptionBackgroundColor": { "type": String, "attr": "caption-background-color" }, "CaptionText": { "type": String, "attr": "caption-text" }, "CaptionTextColor": { "type": String, "attr": "caption-text-color" }, "CardColor": { "type": String, "attr": "card-color" }, "CardImage": { "type": Boolean, "attr": "card-image" }, "CardLink": { "type": String, "attr": "card-link" }, "ImageScaling": { "type": String, "attr": "image-scaling" }, "ImageSource": { "type": String, "attr": "image-source" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-large-nav-card {\n  flex: 0 0 auto;\n  width: 100%;\n  height: 100%;\n  font-family: var(--app-font-family);\n  min-height: 100%; }\n  lumavate-large-nav-card .container {\n    min-height: 180px;\n    box-shadow: var(--app-box-shadow);\n    border-radius: 2px; }\n    lumavate-large-nav-card .container .image, lumavate-large-nav-card .container .no-image {\n      background-repeat: no-repeat;\n      background-position: center; }\n    lumavate-large-nav-card .container .caption {\n      height: 32px;\n      border-radius: 2px 2px 0 0;\n      border-top: 1px solid rgba(0, 0, 0, 0.2); }\n      lumavate-large-nav-card .container .caption .text {\n        font-size: 14px;\n        padding: 8px; }"; }
}

export { LumavateLargeNavCard };
