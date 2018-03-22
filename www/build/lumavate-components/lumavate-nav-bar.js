/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateNavBar {
    constructor() {
        this.NavBarBackgroundColor = '#000';
        this.NavBarItemColor = '#FFF';
        this.NavBarPosition = 'bottom';
        this.NavBarItems = '';
    }
    navigateHandler(event) {
        window.location.href = event.detail.url;
    }
    componentWillLoad() {
        this.innerItems = JSON.parse(this.NavBarItems);
    }
    render() {
        return (h("div", { style: { backgroundColor: this.NavBarBackgroundColor ? this.NavBarBackgroundColor : "#fff" }, class: "container" }, this.innerItems.map((item) => h("lumavate-nav-bar-item", { "nav-bar-item-color": this.NavBarItemColor, "nav-bar-item-text": item.text, "nav-bar-item-image-link": item.imageSource.preview, "nav-bar-item-link": item.linkTo.url }))));
    }
    static get is() { return "lumavate-nav-bar"; }
    static get properties() { return { "NavBarBackgroundColor": { "type": String, "attr": "nav-bar-background-color" }, "NavBarItemColor": { "type": String, "attr": "nav-bar-item-color" }, "NavBarItems": { "type": String, "attr": "nav-bar-items" }, "NavBarPosition": { "type": String, "attr": "nav-bar-position" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-nav-bar {\n  flex: 0 0 auto;\n  width: 100%;\n  min-height: 48px;\n  font-family: var(--app-font-family); }\n  lumavate-nav-bar .container {\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center; }"; }
}

class LumavateNavBarItem {
    constructor() {
        this.NavBarItemLink = '';
        this.NavBarImageLink = '';
        this.NavBarItemText = '';
        this.NavBarItemColor = '#FFF';
    }
    buttonClicked(event) {
        console.log(event);
    }
    componentDidLoad() {
        console.log(this);
        console.log('The component has been rendered');
    }
    render() {
        return (h("div", null,
            h("div", { onClick: (event) => this.buttonClicked(event) },
                h("div", { style: { color: this.NavBarItemColor ? this.NavBarItemColor : "#000" }, class: "button-text" }, this.NavBarItemText))));
    }
    static get is() { return "lumavate-nav-bar-item"; }
    static get properties() { return { "NavBarImageLink": { "type": String, "attr": "nav-bar-image-link" }, "NavBarItemColor": { "type": String, "attr": "nav-bar-item-color" }, "NavBarItemLink": { "type": String, "attr": "nav-bar-item-link" }, "NavBarItemText": { "type": String, "attr": "nav-bar-item-text" } }; }
    static get events() { return [{ "name": "navigate", "method": "navigate", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-nav-bar-item {\n  font-family: var(--app-font-family); }\n  lumavate-nav-bar-item div {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column; }\n    lumavate-nav-bar-item div div {\n      padding: 4px 4px;\n      cursor: pointer; }\n    lumavate-nav-bar-item div .button-text {\n      font-size: 12px;\n      margin-top: 4px;\n      line-height: 0; }"; }
}

export { LumavateNavBar, LumavateNavBarItem };
