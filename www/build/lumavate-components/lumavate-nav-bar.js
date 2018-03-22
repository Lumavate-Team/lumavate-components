/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateNavBar {
    constructor() {
        this.NavBarBackgroundColor = '#000';
        this.NavBarItemColor = '#FFF';
        this.NavBarPosition = 'bottom';
        this.NavBarItems = '';
    }
    componentWillLoad() {
        this.innerItems = JSON.parse(this.NavBarItems);
    }
    getImageLink(i) {
        if (i.imageSource && i.imageSource.preview) {
            return i.imageSource.preview;
        }
        return '';
    }
    render() {
        return (h("div", { style: { backgroundColor: this.NavBarBackgroundColor ? this.NavBarBackgroundColor : "#fff" }, class: this.NavBarPosition === 'bottom' ? 'container bottom' : 'container top' }, this.innerItems.map((item) => h("lumavate-nav-bar-item", { "nav-bar-item-color": this.NavBarItemColor, "nav-bar-item-text": item.text, "nav-bar-item-image-link": this.getImageLink(item), "nav-bar-item-link": item.linkTo.url }))));
    }
    static get is() { return "lumavate-nav-bar"; }
    static get properties() { return { "NavBarBackgroundColor": { "type": String, "attr": "nav-bar-background-color" }, "NavBarItemColor": { "type": String, "attr": "nav-bar-item-color" }, "NavBarItems": { "type": String, "attr": "nav-bar-items" }, "NavBarPosition": { "type": String, "attr": "nav-bar-position" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-nav-bar {\n  flex: 0 0 auto;\n  width: 100%;\n  font-family: var(--app-font-family); }\n  lumavate-nav-bar .bottom {\n    bottom: 0; }\n  lumavate-nav-bar .top {\n    top: 0; }\n  lumavate-nav-bar .container {\n    position: absolute;\n    min-height: 48px;\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center; }\n"; }
}

class LumavateNavBarItem {
    constructor() {
        this.NavBarItemLink = '';
        this.NavBarItemImageLink = '';
        this.NavBarItemText = '';
        this.NavBarItemColor = '#FFF';
        this.displayImage = false;
    }
    buttonClicked() {
        if (this.NavBarItemLink) {
            window.location.href = this.NavBarItemLink;
        }
    }
    componentWillLoad() {
        this.displayImage = this.NavBarItemImageLink.length > 0 ? true : false;
    }
    render() {
        return (h("div", { onClick: () => this.buttonClicked() },
            this.displayImage ?
                h("div", { class: "icon", style: { webkitMaskImage: "url(" + this.NavBarItemImageLink + ")", maskImage: "url(" + this.NavBarItemImageLink + ")", backgroundColor: this.NavBarItemColor } })
                : '',
            h("div", { style: { color: this.NavBarItemColor ? this.NavBarItemColor : "#000" }, class: "button-text" }, this.NavBarItemText)));
    }
    static get is() { return "lumavate-nav-bar-item"; }
    static get properties() { return { "NavBarItemColor": { "type": String, "attr": "nav-bar-item-color" }, "NavBarItemImageLink": { "type": String, "attr": "nav-bar-item-image-link" }, "NavBarItemLink": { "type": String, "attr": "nav-bar-item-link" }, "NavBarItemText": { "type": String, "attr": "nav-bar-item-text" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-nav-bar-item {\n  font-family: var(--app-font-family); }\n  lumavate-nav-bar-item div {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column; }\n    lumavate-nav-bar-item div .icon {\n      width: 24px;\n      height: 24px;\n      mask: no-repeat 50% 50%;\n      -webkit-mask: no-repeat 50% 50%; }\n    lumavate-nav-bar-item div div {\n      padding: 4px 4px;\n      cursor: pointer; }\n    lumavate-nav-bar-item div .button-text {\n      font-size: 12px;\n      margin-top: 4px;\n      line-height: 0; }\n"; }
}

export { LumavateNavBar, LumavateNavBarItem };
