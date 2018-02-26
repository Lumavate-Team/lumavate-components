/*! Built with http://stenciljs.com */
const { h, Context } = window.lumavatecomponents;

class LumavateQuote {
    render() {
        return (h("div", null, "QUOTE"));
    }
    static get is() { return "lumavate-quote"; }
    static get style() { return "lumavate-quote {\n  flex: 0 0 auto;\n  width: 100%;\n  min-height: 48px; }"; }
}

export { LumavateQuote };
