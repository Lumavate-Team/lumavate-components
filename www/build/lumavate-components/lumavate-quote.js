/*! Built with http://stenciljs.com */
const { h } = window.LumavateComponents;

class LumavateQuote {
    constructor() {
        this.QuoteText = '';
        this.FontSize = '12pt';
        this.QuotationMarks = true;
        this.Color = '#000';
        this.ShowCard = true;
        this.CardColor = '#FFF';
    }
    render() {
        return (h("div", { class: this.ShowCard ? "container-shadow" : "container", style: { backgroundColor: this.CardColor } },
            h("div", { class: "quote-container start" },
                h("div", { class: "spacer" }, this.QuotationMarks
                    ? h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "8", viewBox: "0 0 12 8" },
                        h("g", { fill: "none", "fill-rule": "evenodd", transform: "matrix(-1 0 0 1 15 -5)" },
                            h("path", { fill: this.Color, "fill-rule": "nonzero", d: "M10,5 L10,10 L12.75,10 L11,13 L13.25,13 L15,10 L15,5 L10,5 Z M3,10 L5.75,10 L4,13 L6.25,13 L8,10 L8,5 L3,5 L3,10 Z" }),
                            h("polygon", { points: "0 0 18 0 18 18 0 18" })))
                    : '')),
            h("div", { class: "quote-text", style: { color: this.Color, fontSize: this.FontSize } }, this.QuoteText),
            h("div", { class: "quote-container end" },
                h("div", { class: "spacer" }, this.QuotationMarks
                    ? h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "8", viewBox: "0 0 12 8" },
                        h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(-3 -5)" },
                            h("path", { fill: this.Color, "fill-rule": "nonzero", d: "M10,5 L10,10 L12.75,10 L11,13 L13.25,13 L15,10 L15,5 L10,5 Z M3,10 L5.75,10 L4,13 L6.25,13 L8,10 L8,5 L3,5 L3,10 Z" }),
                            h("polygon", { points: "0 0 18 0 18 18 0 18" })))
                    : ''))));
    }
    static get is() { return "lumavate-quote"; }
    static get properties() { return { "CardColor": { "type": String, "attr": "card-color" }, "Color": { "type": String, "attr": "color" }, "FontSize": { "type": String, "attr": "font-size" }, "QuotationMarks": { "type": Boolean, "attr": "quotation-marks" }, "QuoteText": { "type": String, "attr": "quote-text" }, "ShowCard": { "type": Boolean, "attr": "show-card" } }; }
    static get style() { return "lumavate-quote {\n  flex: 0 0 auto;\n  width: 100%; }\n  lumavate-quote .container, lumavate-quote .container-shadow {\n    min-height: 48px; }\n  lumavate-quote .container-shadow {\n    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);\n    border-radius: 2px; }\n  lumavate-quote .quote-container {\n    display: flex; }\n  lumavate-quote .quote-text {\n    font-family: Roboto;\n    font-style: italic;\n    min-height: 24px;\n    margin: 0px 24px; }\n  lumavate-quote .spacer {\n    height: 24px;\n    width: 24px;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n  lumavate-quote .start {\n    justify-content: flex-start; }\n  lumavate-quote .end {\n    justify-content: flex-end; }"; }
}

export { LumavateQuote };
