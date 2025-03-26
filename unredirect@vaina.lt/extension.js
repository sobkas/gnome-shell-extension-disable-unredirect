import Meta from 'gi://Meta';

export default class UnredirectExtension {
    constructor() {
        this.orig_enable_unredirect = null;
    }

    enable() {
        if (this.orig_enable_unredirect == null) {
            console.debug("Monkey patching Meta.enable_unredirect_for_display(display) function");
            this.orig_enable_unredirect = global.compositor.enable_unredirect;
            global.compositor.enable_unredirect = function(display) {
                // should I check for display?
                console.debug("Ignoring invocation of Meta.Compositor.enable_unredirect(display)");
            };
            global.compositor.disable_unredirect(global.display);
        }
    }

    disable() {
        if (this.orig_enable_unredirect != null) {
            console.debug("Restoring Meta.enable_unredirect_for_display(display) function");
            global.compositor.enable_unredirect = this.orig_enable_unredirect;
            this.orig_enable_unredirect = null;
            console.debug("Invoking Meta.Compositor.enable_unredirect(display)");
            global.compositor.enable_unredirect(global.display);
        }
    }
}
