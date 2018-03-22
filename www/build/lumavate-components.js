/*! Built with http://stenciljs.com */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    (win[namespace] = win[namespace] || {}).components = components;
    if (!win.customElements) {
        // temporary customElements polyfill only for "whenDefined"
        // this is incase customElements.whenDefined('my-tag') is
        // used before the polyfill is downloaded
        win.$whenDefined = [];
        win.customElements = {
            whenDefined: function (tag) {
                return {
                    then: function (cb) {
                        win.$whenDefined.push([tag, cb]);
                    }
                };
            }
        };
    }
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force es2015 build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!win.customElements) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // force es5 build w/ polyfills
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


init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

})(window, document, "LumavateComponents","lumavate-components",0,"lumavate-components.core.js","es5-build-disabled.js","hydrated",[["lumavate-large-nav-card","lumavate-large-nav-card",1,[["Caption",1,0,"caption",3],["CaptionBackgroundColor",1,0,"caption-background-color",2],["CaptionText",1,0,"caption-text",2],["CaptionTextColor",1,0,"caption-text-color",2],["CardColor",1,0,"card-color",2],["CardImage",1,0,"card-image",3],["CardLink",1,0,"card-link",2],["ImageScaling",1,0,"image-scaling",2],["ImageSource",1,0,"image-source",2]]],["lumavate-nav-bar","lumavate-nav-bar",1,[["NavBarBackgroundColor",1,0,"nav-bar-background-color",2],["NavBarItemColor",1,0,"nav-bar-item-color",2],["NavBarItems",1,0,"nav-bar-items",2],["NavBarPosition",1,0,"nav-bar-position",2]],0,[["navigate","navigateHandler"]]],["lumavate-nav-bar-item","lumavate-nav-bar",1,[["NavBarItemColor",1,0,"nav-bar-item-color",2],["NavBarItemImageLink",1,0,"nav-bar-item-image-link",2],["NavBarItemLink",1,0,"nav-bar-item-link",2],["NavBarItemText",1,0,"nav-bar-item-text",2]]],["lumavate-quote","lumavate-quote",1,[["CardColor",1,0,"card-color",2],["Color",1,0,"color",2],["FontSize",1,0,"font-size",4],["QuotationMarks",1,0,"quotation-marks",3],["QuoteText",1,0,"quote-text",2],["ShowCard",1,0,"show-card",3]]],["lumavate-small-nav-card","lumavate-small-nav-card",1,[["CardColor",1,0,"card-color",2],["CardImage",1,0,"card-image",3],["CardLink",1,0,"card-link",2],["ImageScaling",1,0,"image-scaling",2],["ImageSource",1,0,"image-source",2],["SubTitle",1,0,"sub-title",3],["SubTitleText",1,0,"sub-title-text",2],["TitleText",1,0,"title-text",2],["TitleTextColor",1,0,"title-text-color",2]]],["lumavate-toolbar","lumavate-toolbar",1,[["backgroundcolor",1,0,1,2],["items",1,0,1,2]],0,[["navigate","navigateHandler"]]],["lumavate-toolbar-button","lumavate-toolbar",1,[["item",1,0,1,1]]]]);