/*! Built with http://stenciljs.com */
(function(win, doc, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, docScripts, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCorePolyfilled, hydratedCssClass, components, x, y) {
    // create global namespace if it doesn't already exist
    (win[appNamespace] = win[appNamespace] || {}).components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // get this current script
    // script tag cannot use "async" attribute
    if (discoverPublicPath) {
        x = docScripts[docScripts.length - 1];
        if (x && x.src) {
            y = x.src.split('/').slice(0, -1);
            publicPath = (y.join('/')) + (y.length ? '/' : '') + urlNamespace + '/';
        }
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    x.src = publicPath + (usePolyfills(win, win.location, x, 'import("")') ? appCorePolyfilled : appCore);
    x.setAttribute('data-path', publicPath);
    x.setAttribute('data-namespace', urlNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=es5') > -1) {
        // force es5 polyfill w/ ?core=es5 querystring
        return true;
    }
    if (location.protocol === 'file:') {
        // file protocol cannot use dynamic module imports
        return true;
    }
    if (!win.customElements) {
        // does not have customElement support
        return true;
    }
    if (!win.fetch) {
        // does not have fetch support
        return true;
    }
    if (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) {
        // does not have CSS variables support
        return true;
    }
    if (!('noModule' in scriptElm)) {
        // does not have static ES module support
        return true;
    }
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}


init(win, doc, doc.scripts, appNamespace, urlNamespace, publicPath, discoverPublicPath, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "LumavateComponents","lumavate-components","/build/lumavate-components/",true,"lumavate-components.core.js","es5-build-disabled.js","hydrated",[["lumavate-large-nav-card","lumavate-large-nav-card",1,[["Caption",1,"caption",3],["CaptionBackgroundColor",1,"caption-background-color",2],["CaptionText",1,"caption-text",2],["CaptionTextColor",1,"caption-text-color",2],["CardColor",1,"card-color",2],["CardImage",1,"card-image",3],["CardLink",1,"card-link",2],["ImageScaling",1,"image-scaling",2],["ImageSource",1,"image-source",2]]],["lumavate-nav-bar","lumavate-nav-bar",1,[["NavBarBackgroundColor",1,"nav-bar-background-color",2],["NavBarItemColor",1,"nav-bar-item-color",2],["NavBarItems",1,"nav-bar-items",2],["NavBarPosition",1,"nav-bar-position",2]],0,[["navigate","navigateHandler"]]],["lumavate-nav-bar-item","lumavate-nav-bar",1,[["NavBarImageLink",1,"nav-bar-image-link",2],["NavBarItemColor",1,"nav-bar-item-color",2],["NavBarItemLink",1,"nav-bar-item-link",2],["NavBarItemText",1,"nav-bar-item-text",2]]],["lumavate-quote","lumavate-quote",1,[["CardColor",1,"card-color",2],["Color",1,"color",2],["FontSize",1,"font-size",4],["QuotationMarks",1,"quotation-marks",3],["QuoteText",1,"quote-text",2],["ShowCard",1,"show-card",3]]],["lumavate-small-nav-card","lumavate-small-nav-card",1,[["CardColor",1,"card-color",2],["CardImage",1,"card-image",3],["CardLink",1,"card-link",2],["ImageScaling",1,"image-scaling",2],["ImageSource",1,"image-source",2],["SubTitle",1,"sub-title",3],["SubTitleText",1,"sub-title-text",2],["TitleText",1,"title-text",2],["TitleTextColor",1,"title-text-color",2]]],["lumavate-toolbar","lumavate-toolbar",1,[["backgroundcolor",1,1,2],["items",1,1,2]],0,[["navigate","navigateHandler"]]],["lumavate-toolbar-button","lumavate-toolbar",1,[["item",1,1,1]]]]);