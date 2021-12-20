webpackJsonp([3], {
    Puvu: function (t, s) { },
    pNZA: function (t, s, i) {
        "use strict";
        Object.defineProperty(s, "__esModule", {
            value: !0
        });
        var a = i("BO1k"),
            n = i.n(a),
            e = i("//Fk"),
            l = i.n(e),
            o = {
                name: "AppManagerApp",
                data: function () {
                    return {
                        currentTab: "available",
                        tabs: {
                            available: {
                                name: "Available"
                            },
                            installed: {
                                name: "Installed"
                            }
                        },
                        isLoading: !0,
                        isInstalling: !1,
                        isOOSUpdating: !1,
                        installedApps: [],
                        availableApps: [],
                        onionOs: {
                            id: "onion-os",
                            available: "",
                            installed: "",
                            showModal: !1
                        },
                        appFilter: ""
                    }
                },
                methods: {
                    mergedAppList: function () {
                        for (var t = 0; t < this.installedApps.length; t++)
                            for (var s = this.installedApps[t], i = 0; i < this.availableApps.length; i++) {
                                var a = this.availableApps[i];
                                s.id === a.id && (a.installed = !0, a.installedVersion = s.version, this.$set(this.availableApps, i, a))
                            }
                    },
                    appShow: function (t) {
                        return "installed" !== this.currentTab || t.installed
                    },
                    displayAppVersion: function (t) {
                        return "installed" === this.currentTab ? t.installedVersion : t.version
                    },
                    getApps: function () {
                        return new l.a(function (t, s) {
                            var i = this;
                            this.isLoading = !0, this.availableApps = [], this.$store.dispatch("httpGetRequest", {
                                url: "http://repo.onioniot.com.s3.amazonaws.com/omega2/packages/onion/Packages"
                            }).then(function (s) {
                                for (var a = s.data.match(/^Package: (\S+)/gm), n = s.data.match(/^Description: (.+)/gm), e = s.data.match(/^Version: (.+)/gm), l = 0; l < a.length; l++) {
                                    var o = a[l].split(": ");
                                    if (o[1] && o[1].match(/^oos-/)) {
                                        var p = n[l].split(": ");
                                        i.availableApps.push({
                                            id: o[1],
                                            version: e[l].split(": ")[1],
                                            name: p[1].slice(1, -1),
                                            description: p[2],
                                            proOnly: p[2].indexOf("[Omega2 Pro]") > -1
                                        })
                                    } else o[1] && o[1] === i.onionOs.id && (i.onionOs.available = e[l].split(": ")[1])
                                }
                                i.mergedAppList(), t()
                            })
                        }.bind(this))
                    },
                    getInstalledApps: function () {
                        return new l.a(function (t, s) {
                            var i = this;
                            this.$store.dispatch("handleCommand", {
                                cmd: "opkg",
                                params: ["list-installed"]
                            }).then(function (s) {
                                i.installedApps = [];
                                var a = !0,
                                    e = !1,
                                    l = void 0;
                                try {
                                    for (var o, p = n()(s.stdout.split("\n")); !(a = (o = p.next()).done); a = !0) {
                                        var r = o.value;
                                        if (r.indexOf("oos-app") > -1) {
                                            var d = r.split(" - ");
                                            i.installedApps.push({
                                                id: d[0],
                                                version: d[1]
                                            })
                                        } else if (r.match(/^onion-os /)) {
                                            var c = r.split(" - ");
                                            i.onionOs.installed = c[1]
                                        }
                                    }
                                } catch (t) {
                                    e = !0, l = t
                                } finally {
                                    try {
                                        !a && p.return && p.return()
                                    } finally {
                                        if (e) throw l
                                    }
                                }
                                i.mergedAppList(), t()
                            })
                        }.bind(this))
                    },
                    openApp: function (t) {
                        this.$store.dispatch("launchApp", {
                            appId: t.id
                        })
                    },
                    opkgOperation: function (t) {
                        return new l.a(function (s, i) {
                            var a = this;
                            this.isInstalling = !0, this.$store.dispatch("handleScript", {
                                code: t
                            }).then(function (t) {
                                return a.$store.dispatch("waitProcess", {
                                    pid: t.pid
                                })
                            }).then(function () {
                                a.isInstalling = !1, a.$store.dispatch("refreshAppList"), s()
                            })
                        }.bind(this))
                    },
                    installApp: function (t, s) {
                        var i = this;
                        this.isInstalling = !0, t.installing = !0, this.$set(this.availableApps, s, t), this.$store.dispatch("handleScript", {
                            code: "opkg update; opkg install " + t.id
                        }).then(function (t) {
                            return i.$store.dispatch("waitProcess", {
                                pid: t.pid
                            })
                        }).then(function () {
                            t.installing = !1, t.installed = !0, t.installedVersion = t.version, i.isInstalling = !1, i.$set(i.availableApps, s, t), i.$store.dispatch("refreshAppList")
                        })
                    },
                    removeApp: function (t, s) {
                        var i = this;
                        this.isInstalling = !0, t.installing = !0, this.$set(this.availableApps, s, t), this.$store.dispatch("handleScript", {
                            code: "opkg remove " + t.id
                        }).then(function (t) {
                            return i.$store.dispatch("waitProcess", {
                                pid: t.pid
                            })
                        }).then(function () {
                            t.installing = !1, t.installed = !1, t.installedVersion = null, i.isInstalling = !1, i.$set(i.availableApps, s, t), i.$store.dispatch("refreshAppList")
                        })
                    },
                    updateApp: function (t, s) {
                        var i = this;
                        t.installedVersion = t.version, t.installing = !0, this.$set(this.availableApps, s, t), this.opkgOperation("opkg update; opkg upgrade " + t.id).then(function () {
                            t.installing = !1, t.installed = !0, i.$set(i.availableApps, s, t)
                        })
                    },
                    updateOnionOs: function () {
                        var t = this;
                        this.isOOSUpdating = !0, this.opkgOperation("opkg update; opkg upgrade " + this.onionOs.id).then(function () {
                            t.isOOSUpdating = !1, t.onionOs.showModal = !0, setTimeout(function () {
                                location.reload()
                            }, 3e3)
                        })
                    },
                    isCompatible: function (t) {
                        return !t.proOnly || "omega2pro" === this.$store.state.device.board_name
                    }
                },
                created: function () {
                    var t = this,
                        s = this.getApps(),
                        i = this.getInstalledApps();
                    l.a.all([s, i]).then(function () {
                        t.isLoading = !1
                    })
                },
                filters: {
                    noTags: function (t) {
                        return t.replace("[Omega2 Pro]", "")
                    }
                }
            },
            p = {
                render: function () {
                    var t = this,
                        s = t.$createElement,
                        i = t._self._c || s;
                    return i("div", {
                        staticClass: "container app-view"
                    }, [i("div", {
                        staticClass: "modal",
                        class: {
                            active: t.onionOs.showModal
                        }
                    }, [i("a", {
                        staticClass: "modal-overlay"
                    }), t._v(" "), t._m(0)]), t._v(" "), i("ul", {
                        staticClass: "tab tab-block"
                    }, t._l(t.tabs, function (s, a) {
                        return i("li", {
                            key: a,
                            staticClass: "tab-item"
                        }, [i("a", {
                            staticClass: "c-hand",
                            class: {
                                active: a === t.currentTab, badge: s.badge
                            },
                            attrs: {
                                "data-badge": s.badge
                            },
                            on: {
                                click: function (s) {
                                    t.currentTab = a
                                }
                            }
                        }, [t._v(t._s(s.name))])])
                    })), t._v(" "), i("div", {
                        staticClass: "app-body"
                    }, [i("ul", {
                        staticClass: "menu app-menu"
                    }, [i("li", {
                        staticClass: "menu-item"
                    }, [i("div", {
                        staticClass: "tile tile-centered"
                    }, [i("div", {
                        staticClass: "tile-icon",
                        on: {
                            click: t.getApps
                        }
                    }, [i("img", {
                        staticClass: "avatar",
                        attrs: {
                            src: "static/img/icons/store.svg"
                        }
                    })]), t._v(" "), i("div", {
                        staticClass: "tile-content"
                    }, [t._v("App Manager")])])]), t._v(" "), i("li", {
                        staticClass: "divider"
                    }), t._v(" "), t._l(t.tabs, function (s, a) {
                        return i("li", {
                            key: a,
                            staticClass: "menu-item"
                        }, [i("a", {
                            staticClass: "c-hand",
                            class: {
                                active: a === t.currentTab, badge: s.badge
                            },
                            attrs: {
                                "data-badge": s.badge
                            },
                            on: {
                                click: function (s) {
                                    t.currentTab = a
                                }
                            }
                        }, [t._v("\n          " + t._s(s.name) + "\n        ")])])
                    })], 2), t._v(" "), i("div", {
                        staticClass: "app-content"
                    }, [i("div", {
                        staticClass: "card app-list"
                    }, [i("div", {
                        staticClass: "card-header"
                    }, [i("span", {
                        staticClass: "card-title h5"
                    }, [t._v("Onion OS Apps ")]), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isLoading && t.onionOs.installed !== t.onionOs.available,
                            expression: "!isLoading && onionOs.installed !== onionOs.available"
                        }],
                        staticClass: "oos-upgrade-message float-right"
                    }, [t._v("\n            A new version of OnionOS is available\n            "), i("button", {
                        staticClass: "btn btn-success float-right",
                        class: {
                            loading: t.isOOSUpdating, disabled: t.isInstalling
                        },
                        on: {
                            click: function (s) {
                                t.updateOnionOs()
                            }
                        }
                    }, [t._v("Update Now")])]), t._v(" "), i("span", {
                        staticClass: "loading-lg loading-icon float-right",
                        class: {
                            loading: t.isLoading
                        }
                    })]), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.isLoading,
                            expression: "!isLoading"
                        }],
                        staticClass: "card-body app-list-body"
                    }, t._l(t.availableApps, function (s, a) {
                        return i("div", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: t.appShow(s),
                                expression: "appShow(app)"
                            }],
                            key: s.id,
                            staticClass: "card app-item"
                        }, [i("div", {
                            staticClass: "card-body",
                            staticStyle: {
                                "align-items": "start"
                            }
                        }, [i("img", {
                            staticClass: "app-icon",
                            attrs: {
                                src: "http://repo.onioniot.com/onionos/apps/icons/" + s.id + ".svg",
                                onerror: "this.src = 'static/img/icons/onion.svg'",
                                alt: ""
                            }
                        }), t._v(" "), i("div", {
                            staticClass: "app-description"
                        }, [i("strong", [t._v(t._s(s.name))]), t._v(" "), s.proOnly ? i("div", {
                            staticClass: "tooltip float-right tooltip-left",
                            attrs: {
                                "data-tooltip": "This app made for the Omega2 Pro"
                            }
                        }, [i("span", {
                            staticClass: "pro-badge badge",
                            attrs: {
                                "data-badge": "Pro"
                            }
                        })]) : t._e(), t._v(" "), i("br"), t._v("\n                " + t._s(t._f("noTags")(s.description))), i("br"), t._v(" "), i("i", {
                            staticClass: "app-version"
                        }, [t._v("Version " + t._s(t.displayAppVersion(s)))])])]), t._v(" "), i("div", {
                            staticClass: "card-footer"
                        }, [s.installed ? i("button", {
                            staticClass: "btn btn-error float-right",
                            class: {
                                loading: s.installing, disabled: t.isInstalling
                            },
                            on: {
                                click: function (i) {
                                    t.removeApp(s, a)
                                }
                            }
                        }, [t._v("Remove")]) : t._e(), t._v(" "), i("button", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: s.installed && s.version !== s.installedVersion,
                                expression: "app.installed && (app.version !== app.installedVersion)"
                            }],
                            staticClass: "btn float-right",
                            class: {
                                loading: s.installing, disabled: t.isInstalling
                            },
                            on: {
                                click: function (i) {
                                    t.updateApp(s, a)
                                }
                            }
                        }, [t._v("Update")]), t._v(" "), !s.installed && t.isCompatible(s) ? i("button", {
                            staticClass: "btn btn-success float-right",
                            class: {
                                loading: s.installing, disabled: t.isInstalling
                            },
                            on: {
                                click: function (i) {
                                    t.installApp(s, a)
                                }
                            }
                        }, [t._v("Install")]) : t._e(), t._v(" "), t.isCompatible(s) ? t._e() : i("span", {
                            staticClass: "text-warning float-right"
                        }, [t._v("This app is not compatible with your device.")])])])
                    }))])])])])
                },
                staticRenderFns: [function () {
                    var t = this.$createElement,
                        s = this._self._c || t;
                    return s("div", {
                        staticClass: "modal-container"
                    }, [s("div", {
                        staticClass: "modal-header"
                    }, [s("div", {
                        staticClass: "modal-title h5"
                    }, [this._v("Update Complete")])]), this._v(" "), s("div", {
                        staticClass: "modal-body"
                    }, [s("div", {
                        staticClass: "content label",
                        staticStyle: {
                            padding: "10px"
                        }
                    }, [this._v("\n          Your browser will refresh in a few seconds\n        ")])])])
                }]
            };
        var r = i("VU/8")(o, p, !1, function (t) {
            i("Puvu")
        }, "data-v-1dfcad4e", null);
        s.default = r.exports
    }
});
//# sourceMappingURL=3.8c542f5d2a739ec82950.js.map