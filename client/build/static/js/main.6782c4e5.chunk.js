(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{27:function(t,n,e){},29:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var r=e(7),c=e(3),a=e.n(c),o=e(19),u=e.n(o),i=(e(27),e(0)),s=e.n(i),l=e(1),f=e(2),p=e(14),b=(e(29),e(21)),d=e(17),j=e(20);function O(){var t=Object(p.a)(["\n\t\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t  "]);return O=function(){return t},t}function v(){var t=Object(p.a)(["\n\t\t\t\t\t\t\t\tdisplay: none;\n\t\t\t\t\t\t  "]);return v=function(){return t},t}function m(){var t=Object(p.a)(["\n\tborder: solid red 1px;\n"]);return m=function(){return t},t}var h=b.a.div(m());var g=function(){var t=Object(c.useState)(null),n=Object(f.a)(t,2),e=n[0],a=n[1],o=Object(c.useCallback)(function(){var t=Object(l.a)(s.a.mark((function t(n){var e,r,c,o,u;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=n.target.files,r=new FormData,e&&r.append("torrent",e[0]),t.next=5,fetch("/upload",{method:"POST",body:r});case 5:return c=t.sent,t.next=8,c.json();case 8:o=t.sent,u=JSON.parse(o),a(u);case 11:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),[a]),u=Object(c.useState)(),i=Object(f.a)(u,2),p=(i[0],i[1],Object(c.useState)()),b=Object(f.a)(p,2),m=b[0],g=b[1];Object(c.useEffect)((function(){null===m||void 0===m||m.IPs.map((function(t){t[0];return new j.a({oscillator:{type:"triangle15"}}).toDestination()}))}),[m]),Object(c.useEffect)((function(){var t,n=null===e||void 0===e?void 0:e.peers.map((function(t){return t.ip.split(".")})).map((function(t){return t.map((function(t){return Number(t)}))})),r=null===e||void 0===e?void 0:e.peers.map((function(t){return t.port}));console.log(n,r);var c=null===e||void 0===e||null===(t=e.transactionId)||void 0===t?void 0:t.toString().split("").map(Number);n&&r&&c&&g({IPs:n,ports:r,ID:c})}),[e]);var x=Object(c.useState)(null),S=Object(f.a)(x,2);return S[0],S[1],Object(c.useEffect)((function(){return console.log(e)}),[e]),Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(h,{className:e?Object(d.a)(v()):Object(d.a)(O()),children:Object(r.jsx)("input",{type:"file",name:"torrent",onChange:o})})})},x=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,41)).then((function(n){var e=n.getCLS,r=n.getFID,c=n.getFCP,a=n.getLCP,o=n.getTTFB;e(t),r(t),c(t),a(t),o(t)}))};u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(g,{})}),document.getElementById("root")),x()}},[[40,1,2]]]);
//# sourceMappingURL=main.6782c4e5.chunk.js.map