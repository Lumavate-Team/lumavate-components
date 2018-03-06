/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateSmallNavCard {
    constructor() {
        this.SubTitle = true;
        this.SubTitleText = 'Subtitle, Yeah';
        this.TitleText = 'Dropbox Onboarding Case Study';
        this.TitleTextColor = '#000';
        this.CardColor = '#D8E7FF';
        this.CardImage = true;
        this.ImageSource = 'https://s3.amazonaws.com/assets.labelnexusdev.com/images/R2_A1.jpg';
        this.ImageScaling = 'contain';
        this.CardLink = 'https://www.google.com';
        this.displayImage = '';
        this.displaySubTitle = '';
    }
    cardClicked() {
        if (this.CardLink) {
            window.location.href = this.CardLink;
        }
    }
    componentWillLoad() {
        this.displayImage = this.CardImage ? 'inline' : 'none';
        this.displaySubTitle = this.SubTitle ? 'inline' : 'none';
    }
    render() {
        return (h("div", { class: "container", onClick: () => this.cardClicked(), style: { backgroundColor: this.CardColor } },
            h("div", { class: "image", style: { backgroundImage: "url(" + this.ImageSource + ")", backgroundSize: this.ImageScaling, display: this.displayImage } }),
            h("div", { class: "title-container" },
                h("div", { class: "title", style: { color: this.TitleTextColor } }, this.TitleText),
                h("div", { class: "subtitle", style: { display: this.displaySubTitle } }, this.SubTitleText))));
    }
    static get is() { return "lumavate-small-nav-card"; }
    static get properties() { return { "CardColor": { "type": String, "attr": "card-color" }, "CardImage": { "type": Boolean, "attr": "card-image" }, "CardLink": { "type": String, "attr": "card-link" }, "ImageScaling": { "type": String, "attr": "image-scaling" }, "ImageSource": { "type": String, "attr": "image-source" }, "SubTitle": { "type": Boolean, "attr": "sub-title" }, "SubTitleText": { "type": String, "attr": "sub-title-text" }, "TitleText": { "type": String, "attr": "title-text" }, "TitleTextColor": { "type": String, "attr": "title-text-color" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-small-nav-card {\n  flex: 0 0 auto;\n  width: 100%;\n  height: 100%;\n  min-height: 100%;\n  font-family: var(--app-font-family); }\n  lumavate-small-nav-card .container {\n    min-height: 64px;\n    padding: 8px;\n    display: flex;\n    flex-direction: row;\n    box-shadow: var(--app-box-shadow);\n    border-radius: 2px; }\n    lumavate-small-nav-card .container .image {\n      width: 20%;\n      max-width: 25%;\n      min-height: 64px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      background-repeat: no-repeat; }\n    lumavate-small-nav-card .container .title-container {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      font-size: 14px;\n      line-height: 16px; }\n      lumavate-small-nav-card .container .title-container .title {\n        padding: 2px;\n        font-weight: 500; }\n      lumavate-small-nav-card .container .title-container .subtitle {\n        padding: 2px;\n        font-weight: 300; }"; }
}

export { LumavateSmallNavCard };
