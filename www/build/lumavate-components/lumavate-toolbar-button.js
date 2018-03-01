/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

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
    static get style() { return "lumavate-toolbar-button div {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n  lumavate-toolbar-button div div {\n    padding: 4px 4px;\n    cursor: pointer; }\n  lumavate-toolbar-button div .button-text {\n    font-size: 12px;\n    margin-top: 4px;\n    line-height: 0; }"; }
}

export { LumavateToolbarButton };
