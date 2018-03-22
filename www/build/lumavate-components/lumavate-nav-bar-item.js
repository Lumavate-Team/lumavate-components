/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateNavBarItem {
    constructor() {
        this.NavBarItemColor = '#FFF';
    }
    buttonClicked(event) {
        console.log(event);
        if (this.NavBarItem.linkTourl) {
            this.navigate.emit(this.NavBarItem);
        }
    }
    componentDidLoad() {
        console.log(this.NavBarItem);
        console.log(this.NavBarItemColor);
        console.log('The component has been rendered');
    }
    render() {
        return (h("div", null,
            h("div", { onClick: (event) => this.buttonClicked(event) },
                h("div", { style: { color: this.NavBarItemColor ? this.NavBarItemColor : "#000" }, class: "button-text" }, "test"))));
    }
    static get is() { return "lumavate-nav-bar-item"; }
    static get properties() { return { "NavBarItem": { "type": "Any", "attr": "nav-bar-item" }, "NavBarItemColor": { "type": String, "attr": "nav-bar-item-color" } }; }
    static get events() { return [{ "name": "navigate", "method": "navigate", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-nav-bar-item {\n  font-family: var(--app-font-family); }\n  lumavate-nav-bar-item div {\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column; }\n    lumavate-nav-bar-item div div {\n      padding: 4px 4px;\n      cursor: pointer; }\n    lumavate-nav-bar-item div .button-text {\n      font-size: 12px;\n      margin-top: 4px;\n      line-height: 0; }"; }
}

export { LumavateNavBarItem };
