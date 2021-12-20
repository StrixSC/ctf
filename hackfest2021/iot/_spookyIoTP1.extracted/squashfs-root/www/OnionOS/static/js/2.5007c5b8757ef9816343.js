webpackJsonp([2], {
    "9P2q": function (t, a, e) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var s = {
            name: "PreferencesApp",
            components: {
                WifiClientConfig: e("xtvL").default
            },
            data: function () {
                return {
                    currentTab: "general",
                    tabs: {
                        general: {
                            name: "General"
                        },
                        wifi: {
                            name: "WiFi Client"
                        },
                        wifiAp: {
                            name: "WiFi AP"
                        },
                        upgrade: {
                            name: "Upgrade"
                        },
                        reset: {
                            name: "Reset"
                        }
                    },
                    loading: {
                        basic: !1,
                        wifi: !1
                    }
                }
            },
            computed: {
                timeZones: function () {
                    return [{
                        name: "International Date Line West",
                        offset: "-12:00",
                        tz: "IDLW12"
                    }, {
                        name: "Midway Island, Samoa",
                        offset: "-11:00",
                        tz: "SST11"
                    }, {
                        name: "Hawaii",
                        offset: "-10:00",
                        tz: "HST10"
                    }, {
                        name: "Alaska",
                        offset: "-9:00",
                        tz: "AKST9AKDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Pacific Time (US & Canada)",
                        offset: "-8:00",
                        tz: "PST8PDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Tijuana, Baja California",
                        offset: "-8:00",
                        tz: "PST8PDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Arizona",
                        offset: "-7:00",
                        tz: "MST7"
                    }, {
                        name: "Chihuahua, La Paz, Mazatlan",
                        offset: "-7:00",
                        tz: "MST7MDT,M4.1.0,M10.5.0"
                    }, {
                        name: "Mountain Time (US & Canada)",
                        offset: "-7:00",
                        tz: "MST7MDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Central America",
                        offset: "-6:00",
                        tz: "CST6"
                    }, {
                        name: "Central Time (US & Canada)",
                        offset: "-6:00",
                        tz: "CST6CDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Guadalajara, Mexico City, Monterrey",
                        offset: "-6:00",
                        tz: "CST6CDT,M4.1.0,M10.5.0"
                    }, {
                        name: "Saskatchewan",
                        offset: "-6:00",
                        tz: "CST6CDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Bogota, Lima, Quito, Rio Branco",
                        offset: "-5:00",
                        tz: "COT5"
                    }, {
                        name: "Eastern Time (US & Canada)",
                        offset: "-5:00",
                        tz: "EST5EDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Indiana (East)",
                        offset: "-5:00",
                        tz: "EST5EDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Caracas",
                        offset: "-4:30",
                        tz: "VET4:30"
                    }, {
                        name: "Atlantic Time (Canada)",
                        offset: "-4:00",
                        tz: "AST4ADT,M3.2.0,M11.1.0"
                    }, {
                        name: "La Paz",
                        offset: "-4:00",
                        tz: "BOT4"
                    }, {
                        name: "Manaus",
                        offset: "-4:00",
                        tz: "AMT4"
                    }, {
                        name: "Newfoundland",
                        offset: "-3:30",
                        tz: "NST3:30NDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Santiago",
                        offset: "-3:00",
                        tz: "CLT3"
                    }, {
                        name: "Brasilia",
                        offset: "-3:00",
                        tz: "BRT3BRST,M10.3.0/0,M2.3.0/0"
                    }, {
                        name: "Buenos Aires, Georgetown",
                        offset: "-3:00",
                        tz: "ART3"
                    }, {
                        name: "Greenland",
                        offset: "-3:00",
                        tz: "WGT3WGST,M3.5.0/-2,M10.5.0/-1"
                    }, {
                        name: "Miquelon",
                        offset: "-3:00",
                        tz: "PMST3PMDT,M3.2.0,M11.1.0"
                    }, {
                        name: "Montevideo",
                        offset: "-3:00",
                        tz: "UYT3"
                    }, {
                        name: "Mid-Atlantic",
                        offset: "-2:00",
                        tz: "GST2"
                    }, {
                        name: "Cape Verde Is.",
                        offset: "-1:00",
                        tz: "CVT1"
                    }, {
                        name: "Azores",
                        offset: "-1:00",
                        tz: "AZOT1AZOST,M3.5.0/0,M10.5.0/1"
                    }, {
                        name: "Casablanca, Monrovia, Reykjavik",
                        offset: "+0:00",
                        tz: "WET0WEST,M3.5.0,M10.5.0/3"
                    }, {
                        name: "Greenwich Mean Time: Edinburgh, Lisbon, London",
                        offset: "+0:00",
                        tz: "GMT0BST,M3.5.0/1,M10.5.0"
                    }, {
                        name: "Greenwich Mean Time: Dublin",
                        offset: "+0:00",
                        tz: "GMT0IST,M3.5.0/1,M10.5.0"
                    }, {
                        name: "Lisbon",
                        offset: "+0:00",
                        tz: "WET0WEST,M3.5.0/1,M10.5.0"
                    }, {
                        name: "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
                        offset: "+1:00",
                        tz: "CET-1CEST,M3.5.0,M10.5.0/3"
                    }, {
                        name: "Belgrade, Bratislava, Budapest, Ljubljana, Prague",
                        offset: "+1:00",
                        tz: "CET-1CEST,M3.5.0,M10.5.0/3"
                    }, {
                        name: "Brussels, Copenhagen, Madrid, Paris",
                        offset: "+1:00",
                        tz: "CET-1CEST,M3.5.0,M10.5.0/3"
                    }, {
                        name: "Sarajevo, Skopje, Warsaw, Zagreb",
                        offset: "+1:00",
                        tz: "CET-1CEST,M3.5.0,M10.5.0/3"
                    }, {
                        name: "West Central Africa",
                        offset: "+1:00",
                        tz: "WAT-1"
                    }, {
                        name: "Windhoek",
                        offset: "+1:00",
                        tz: "WAT-1WAST,M9.1.0,M4.1.0"
                    }, {
                        name: "Amman",
                        offset: "+2:00",
                        tz: "EET-2EEST,M3.5.4/24,M10.5.5/1"
                    }, {
                        name: "Athens, Bucharest, Istanbul",
                        offset: "+2:00",
                        tz: "EET-2EEST,M3.5.0/3,M10.5.0/4"
                    }, {
                        name: "Beirut",
                        offset: "+2:00",
                        tz: "EET-2EEST,M3.5.0/0,M10.5.0/0"
                    }, {
                        name: "Cairo",
                        offset: "+2:00",
                        tz: "EET-2"
                    }, {
                        name: "Harare, Pretoria",
                        offset: "+2:00",
                        tz: "CAT-2"
                    }, {
                        name: "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
                        offset: "+2:00",
                        tz: "EET-2EEST,M3.5.0/3,M10.5.0/4"
                    }, {
                        name: "Jerusalem",
                        offset: "+2:00",
                        tz: "IST-2IDT,M3.4.4/26,M10.5.0"
                    }, {
                        name: "Minsk",
                        offset: "+3:00",
                        tz: "MSK-3"
                    }, {
                        name: "Kuwait, Riyadh, Baghdad",
                        offset: "+3:00",
                        tz: "AST-3"
                    }, {
                        name: "Moscow, St. Petersburg, Volgograd",
                        offset: "+3:00",
                        tz: "MSK-3"
                    }, {
                        name: "Nairobi",
                        offset: "+3:00",
                        tz: "EAT-3"
                    }, {
                        name: "Tbilisi",
                        offset: "+3:00",
                        tz: "GET-4"
                    }, {
                        name: "Tehran",
                        offset: "+3:30",
                        tz: "IRST-3:30IRDT,80/0,264/0"
                    }, {
                        name: "Abu Dhabi, Muscat",
                        offset: "+4:00",
                        tz: "GST-4"
                    }, {
                        name: "Baku",
                        offset: "+4:00",
                        tz: "AZT-4AZST,M3.5.0/4,M10.5.0/5"
                    }, {
                        name: "Yerevan",
                        offset: "+4:00",
                        tz: "AMT-4"
                    }, {
                        name: "Kabul",
                        offset: "+4:30",
                        tz: "AFT-4:30"
                    }, {
                        name: "Yekaterinburg",
                        offset: "+5:00",
                        tz: "YEKT-5"
                    }, {
                        name: "Islamabad, Karachi, Tashkent",
                        offset: "+5:00",
                        tz: "PKT-5"
                    }, {
                        name: "Sri Jayawardenapura",
                        offset: "+5:30",
                        tz: "SLST-5:30"
                    }, {
                        name: "Chennai, Kolkata, Mumbai, New Delhi",
                        offset: "+5:30",
                        tz: "IST-5:30"
                    }, {
                        name: "Kathmandu",
                        offset: "+5:45",
                        tz: "NPT-5:45"
                    }, {
                        name: "Almaty, Novosibirsk",
                        offset: "+6:00",
                        tz: "ALMT-6"
                    }, {
                        name: "Astana, Dhaka",
                        offset: "+6:00",
                        tz: "BDT-6"
                    }, {
                        name: "Yangon (Rangoon)",
                        offset: "+6.5:00",
                        tz: "MMT-6:30"
                    }, {
                        name: "Bangkok, Hanoi, Jakarta",
                        offset: "+7:00",
                        tz: "ICT-7"
                    }, {
                        name: "Krasnoyarsk",
                        offset: "+7:00",
                        tz: "KRAT-7"
                    }, {
                        name: "Beijing, Chongqing, Hong Kong, Urumqi",
                        offset: "+8:00",
                        tz: "CST-8"
                    }, {
                        name: "Kuala Lumpur",
                        offset: "+8:00",
                        tz: "MYT-8"
                    }, {
                        name: "Singapore",
                        offset: "+8:00",
                        tz: "SGT-8"
                    }, {
                        name: "Irkutsk, Ulaan Bataar",
                        offset: "+8:00",
                        tz: "IRKT-8"
                    }, {
                        name: "Perth",
                        offset: "+8:00",
                        tz: "AWST-8"
                    }, {
                        name: "Taipei",
                        offset: "+8:00",
                        tz: "CST-8"
                    }, {
                        name: "Osaka, Sapporo, Tokyo",
                        offset: "+9:00",
                        tz: "JST-9"
                    }, {
                        name: "Seoul",
                        offset: "+9:00",
                        tz: "KST-9"
                    }, {
                        name: "Yakutsk",
                        offset: "+9:00",
                        tz: "YAKT-9"
                    }, {
                        name: "Adelaide",
                        offset: "+9:30",
                        tz: "ACST-9:30ACDT,M10.1.0,M4.1.0/3"
                    }, {
                        name: "Darwin",
                        offset: "+9:30",
                        tz: "ACST-9:30"
                    }, {
                        name: "Brisbane",
                        offset: "+10:00",
                        tz: "AEST-10"
                    }, {
                        name: "Canberra, Melbourne, Sydney",
                        offset: "+10:00",
                        tz: "AEST-10AEDT,M10.1.0,M4.1.0/3"
                    }, {
                        name: "Hobart",
                        offset: "+10:00",
                        tz: "AEST-10AEDT,M10.1.0,M4.1.0/3"
                    }, {
                        name: "Guam",
                        offset: "+10:00",
                        tz: "ChST-10"
                    }, {
                        name: "Port Moresby",
                        offset: "+10:00",
                        tz: "PGT-10"
                    }, {
                        name: "Vladivostok",
                        offset: "+10:00",
                        tz: "VLAT-10"
                    }, {
                        name: "Magadan, Solomon Is., New Caledonia",
                        offset: "+11:00",
                        tz: "MAGT-10"
                    }, {
                        name: "Auckland, Wellington",
                        offset: "+12:00",
                        tz: "NZST-12NZDT,M9.5.0,M4.1.0/3"
                    }, {
                        name: "Fiji, Kamchatka, Marshall Is.",
                        offset: "+12:00",
                        tz: "FJT-12FJST,M11.1.0,M1.3.0/3"
                    }, {
                        name: "Nuku'alofa",
                        offset: "+13:00",
                        tz: "TOT-13"
                    }]
                }
            },
            props: {},
            methods: {
                saveBasic: function () {
                    this.loading.basic = !0
                }
            },
            created: function () { }
        },
            i = {
                render: function () {
                    var t = this,
                        a = t.$createElement,
                        e = t._self._c || a;
                    return e("div", {
                        staticClass: "container preferences-view"
                    }, [e("ul", {
                        staticClass: "tab tab-block"
                    }, t._l(t.tabs, function (a, s) {
                        return e("li", {
                            key: s,
                            staticClass: "tab-item"
                        }, [e("a", {
                            staticClass: "c-hand",
                            class: {
                                active: s === t.currentTab, badge: a.badge
                            },
                            attrs: {
                                "data-badge": a.badge
                            },
                            on: {
                                click: function (a) {
                                    t.currentTab = s
                                }
                            }
                        }, [t._v(t._s(a.name))])])
                    })), t._v(" "), e("div", {
                        staticClass: "preferences-body"
                    }, [e("ul", {
                        staticClass: "menu preferences-menu"
                    }, [t._m(0), t._v(" "), e("li", {
                        staticClass: "divider"
                    }), t._v(" "), t._l(t.tabs, function (a, s) {
                        return e("li", {
                            key: s,
                            staticClass: "menu-item"
                        }, [e("a", {
                            staticClass: "c-hand",
                            class: {
                                active: s === t.currentTab, badge: a.badge
                            },
                            attrs: {
                                "data-badge": a.badge
                            },
                            on: {
                                click: function (a) {
                                    t.currentTab = s
                                }
                            }
                        }, [t._v("\n          " + t._s(a.name) + "\n        ")])])
                    })], 2), t._v(" "), e("div", {
                        staticClass: "preferences-content"
                    }, [e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "general" === t.currentTab,
                            expression: "currentTab === 'general'"
                        }],
                        staticClass: "card"
                    }, [e("div", {
                        staticClass: "card-header"
                    }, [e("button", {
                        staticClass: "btn btn-primary float-right",
                        class: {
                            loading: t.loading.basic
                        },
                        on: {
                            click: t.saveBasic
                        }
                    }, [t._v("Save")]), t._v(" "), e("div", {
                        staticClass: "card-title h5"
                    }, [t._v("Basic Settings")])]), t._v(" "), e("div", {
                        staticClass: "card-body"
                    }, [e("form", {
                        staticClass: "form-horizontal"
                    }, [t._m(1), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [t._m(2), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("select", {
                        staticClass: "form-select"
                    }, t._l(t.timeZones, function (a) {
                        return e("option", {
                            key: a,
                            domProps: {
                                value: a
                            }
                        }, [t._v("[" + t._s(a.offset) + "] " + t._s(a.name))])
                    }))])])])])]), t._v(" "), e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "general" === t.currentTab,
                            expression: "currentTab === 'general'"
                        }],
                        staticClass: "card"
                    }, [t._m(3), t._v(" "), t._m(4)]), t._v(" "), e("WifiClientConfig", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "wifi" === t.currentTab,
                            expression: "currentTab === 'wifi'"
                        }],
                        attrs: {
                            "view-configured-networks": "",
                            "skip-if-connected": "false"
                        }
                    }), t._v(" "), e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "wifiAp" === t.currentTab,
                            expression: "currentTab === 'wifiAp'"
                        }],
                        staticClass: "card"
                    }, [t._m(5), t._v(" "), t._m(6)]), t._v(" "), e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "upgrade" === t.currentTab,
                            expression: "currentTab === 'upgrade'"
                        }],
                        staticClass: "card"
                    }, [t._m(7), t._v(" "), t._m(8)]), t._v(" "), e("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "reset" === t.currentTab,
                            expression: "currentTab === 'reset'"
                        }],
                        staticClass: "card"
                    }, [t._m(9), t._v(" "), t._m(10)])], 1)])])
                },
                staticRenderFns: [function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("li", {
                        staticClass: "menu-item"
                    }, [a("div", {
                        staticClass: "tile tile-centered"
                    }, [a("div", {
                        staticClass: "tile-icon"
                    }, [a("img", {
                        staticClass: "avatar",
                        attrs: {
                            src: "static/img/icons/preference.svg"
                        }
                    })]), this._v(" "), a("div", {
                        staticClass: "tile-content"
                    }, [this._v("Preferences")])])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "form-group"
                    }, [a("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [a("label", {
                        staticClass: "form-label"
                    }, [this._v("Omega Name")])]), this._v(" "), a("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [a("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "text"
                        }
                    })])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [a("label", {
                        staticClass: "form-label"
                    }, [this._v("Timezone")])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "card-header"
                    }, [a("button", {
                        staticClass: "btn btn-primary float-right"
                    }, [this._v("Save")]), this._v(" "), a("div", {
                        staticClass: "card-title h5"
                    }, [this._v("Security Settings")])])
                }, function () {
                    var t = this,
                        a = t.$createElement,
                        e = t._self._c || a;
                    return e("div", {
                        staticClass: "card-body"
                    }, [e("form", {
                        staticClass: "form-horizontal"
                    }, [e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("Current Password")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "password"
                        }
                    })])]), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("New Password")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "password"
                        }
                    })])]), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("Verify Password")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "password"
                        }
                    })])])])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "card-header"
                    }, [a("button", {
                        staticClass: "btn btn-primary float-right"
                    }, [this._v("Save")]), this._v(" "), a("div", {
                        staticClass: "card-title h5"
                    }, [this._v("Access Point Setup")])])
                }, function () {
                    var t = this,
                        a = t.$createElement,
                        e = t._self._c || a;
                    return e("div", {
                        staticClass: "card-body"
                    }, [e("form", {
                        staticClass: "form-horizontal"
                    }, [e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("AP Network (SSID)")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "text"
                        }
                    })])]), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("Security")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("select", {
                        staticClass: "form-select"
                    }, [e("option", [t._v("None")]), t._v(" "), e("option", [t._v("WEP")]), t._v(" "), e("option", [t._v("WPA")]), t._v(" "), e("option", [t._v("WPA2")])])])]), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("AP Password")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "password"
                        }
                    })])]), t._v(" "), e("div", {
                        staticClass: "form-group"
                    }, [e("div", {
                        staticClass: "col-4 col-sm-12"
                    }, [e("label", {
                        staticClass: "form-label"
                    }, [t._v("IP Address")])]), t._v(" "), e("div", {
                        staticClass: "col-8 col-sm-12"
                    }, [e("input", {
                        staticClass: "form-input",
                        attrs: {
                            type: "password"
                        }
                    })])])])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "card-header"
                    }, [a("button", {
                        staticClass: "btn btn-primary loading float-right"
                    }, [this._v("Upgrade")]), this._v(" "), a("div", {
                        staticClass: "card-title h5"
                    }, [this._v("System Upgrade")])])
                }, function () {
                    var t = this,
                        a = t.$createElement,
                        e = t._self._c || a;
                    return e("div", {
                        staticClass: "card-body"
                    }, [e("div", {
                        staticClass: "toast toast-warning"
                    }, [e("h4", [t._v("Attention!")]), t._v("\n            Firmware upgrade will erase all files outside of the "), e("code", [t._v("/root")]), t._v(" and "), e("code", [t._v("/etc")]), t._v(" directories. Please backup any custom files before proceeding.\n          ")]), t._v(" "), e("table", {
                        staticClass: "table"
                    }, [e("tbody", [e("tr", [e("td", [t._v("Model")]), t._v(" "), e("td", [t._v("Onion Omega2+")])]), t._v(" "), e("tr", [e("td", [t._v("Firmware")]), t._v(" "), e("td", [t._v("0.2.0 (b182)")])]), t._v(" "), e("tr", [e("td", [t._v("Latest Firmware")]), t._v(" "), e("td", [t._v("0.1.10 (b160)")])])])])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "card-header"
                    }, [a("button", {
                        staticClass: "btn btn-error float-right"
                    }, [this._v("Reset")]), this._v(" "), a("div", {
                        staticClass: "card-title h5"
                    }, [this._v("Factory Reset")])])
                }, function () {
                    var t = this.$createElement,
                        a = this._self._c || t;
                    return a("div", {
                        staticClass: "card-body"
                    }, [a("div", {
                        staticClass: "toast toast-error reset-warning"
                    }, [a("h4", [this._v("Attention!")]), this._v("\n            This will erase everything on the Omega and reset the device to factory default settings. Please backup any custom files on the device before proceeding.\n            "), a("br"), this._v(" "), a("br"), this._v(" "), a("h6", [this._v("Once the reset is done, your Omega's LED will stop flashing.")])])])
                }]
            };
        var n = e("VU/8")(s, i, !1, function (t) {
            e("UzJk")
        }, "data-v-3dc5018e", null);
        a.default = n.exports
    },
    UzJk: function (t, a) { }
});
//# sourceMappingURL=2.5007c5b8757ef9816343.js.map