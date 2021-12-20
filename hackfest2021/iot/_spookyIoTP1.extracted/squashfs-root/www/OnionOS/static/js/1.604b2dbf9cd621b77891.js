webpackJsonp([1], {
    "0Trg": function (t, i) { },
    LyiH: function (t, i, e) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = {
            name: "AppLauncher",
            data: function () {
                return {
                    appFilter: ""
                }
            },
            methods: {
                launchApp: function (t) {
                    this.$store.dispatch("launchApp", {
                        appId: t
                    })
                },
                clearFilter: function () {
                    this.appFilter = ""
                }
            },
            computed: {
                filteredApps: function () {
                    return this.$store.getters.availableApps.filter(function (t) {
                        return "" === this.appFilter || t.name.match(new RegExp(this.appFilter, "i"))
                    }.bind(this))
                }
            }
        },
            n = {
                render: function () {
                    var t = this,
                        i = t.$createElement,
                        e = t._self._c || i;
                    return e("div", {
                        staticClass: "launcher"
                    }, [e("div", {
                        staticClass: "search",
                        style: {
                            opacity: "" === this.appFilter ? .5 : 1
                        }
                    }, [e("div", {
                        staticClass: "has-icon-right"
                    }, [e("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: t.appFilter,
                            expression: "appFilter"
                        }],
                        staticClass: "form-input",
                        attrs: {
                            type: "text",
                            placeholder: "Search"
                        },
                        domProps: {
                            value: t.appFilter
                        },
                        on: {
                            input: function (i) {
                                i.target.composing || (t.appFilter = i.target.value)
                            }
                        }
                    }), t._v(" "), "" !== t.appFilter ? e("i", {
                        staticClass: "form-icon icon icon-cross  c-hand",
                        on: {
                            click: t.clearFilter
                        }
                    }) : t._e(), t._v(" "), "" === t.appFilter ? e("i", {
                        staticClass: "form-icon icon icon-search"
                    }) : t._e()])]), t._v(" "), e("div", {
                        staticClass: "app-icons"
                    }, t._l(t.filteredApps, function (i) {
                        return e("div", {
                            key: i.id,
                            staticClass: "app-icon c-hand",
                            on: {
                                click: function (e) {
                                    t.launchApp(i.id)
                                }
                            }
                        }, [e("img", {
                            staticClass: "app-icon-image",
                            attrs: {
                                src: i.icon,
                                alt: ""
                            }
                        }), t._v(" "), e("h6", {
                            staticClass: "app-name"
                        }, [t._v("\n        " + t._s(i.name) + "\n      ")])])
                    }))])
                },
                staticRenderFns: []
            };
        var s = e("VU/8")(a, n, !1, function (t) {
            e("0Trg")
        }, "data-v-626b36de", null);
        i.default = s.exports
    }
});
//# sourceMappingURL=1.604b2dbf9cd621b77891.js.map