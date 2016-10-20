System.register(['./component/login', './component/dash', './component/history', './component/chart', './component/help'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (login_1_1) {
                exportStar_1(login_1_1);
            },
            function (dash_1_1) {
                exportStar_1(dash_1_1);
            },
            function (history_1_1) {
                exportStar_1(history_1_1);
            },
            function (chart_1_1) {
                exportStar_1(chart_1_1);
            },
            function (help_1_1) {
                exportStar_1(help_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=component.js.map