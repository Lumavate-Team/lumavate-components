/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateToolbar {
    navigateHandler(event) {
        window.location.href = event.detail.url;
    }
    componentWillLoad() {
        this.innerItems = JSON.parse(this.items);
    }
    render() {
        return (h("div", { style: { backgroundColor: this.backgroundcolor ? this.backgroundcolor : "#fff" }, class: "container" }, this.innerItems.map((item) => h("lumavate-toolbar-button", { item: item }))));
    }
    static get is() { return "lumavate-toolbar"; }
    static get properties() { return { "backgroundcolor": { "type": String, "attr": "backgroundcolor" }, "items": { "type": String, "attr": "items" } }; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-toolbar {\n  flex: 0 0 auto;\n  width: 100%;\n  min-height: 48px; }\n  lumavate-toolbar .container {\n    display: flex;\n    width: 100%;\n    flex-direction: row;\n    justify-content: space-around;\n    align-items: center; }\n"; }
}

class LumavateToolbarButton {
    buttonClicked(event) {
        if (this.item.url) {
            this.navigate.emit(this.item);
        }
        console.log(event);
    }
    render() {
        return (h("div", null,
            h("div", { onClick: (event) => this.buttonClicked(event) },
                h("i", { class: "material-icons", style: { color: this.item.color ? this.item.color : "#000" } }, this.item.icon),
                h("div", { style: { color: this.item.color ? this.item.color : "#000" }, class: "button-text" }, this.item.title))));
    }
    static get is() { return "lumavate-toolbar-button"; }
    static get properties() { return { "item": { "type": "Any", "attr": "item" } }; }
    static get events() { return [{ "name": "navigate", "method": "navigate", "bubbles": true, "cancelable": true, "composed": true }]; }
    static get style() { return ":root {\n  --app-primary-color: #488aff;\n  --app-font-family: 'Roboto', sans-serif;\n  --app-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5); }\n\nlumavate-toolbar-button div {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n  lumavate-toolbar-button div div {\n    padding: 4px 4px;\n    cursor: pointer; }\n  lumavate-toolbar-button div .button-text {\n    font-size: 12px;\n    margin-top: 4px;\n    line-height: 0; }\n"; }
}

export { LumavateToolbar, LumavateToolbarButton };
