var DynamicMockups=function(o){"use strict";return o.initDynamicMockupsIframe=({iframeId:o,data:t,mode:e,callback:n})=>{const r=document.getElementById(o);if(!r)return void console.error(`Iframe with ID '${o}' not found.`);r.src=r.src;const c=o=>{try{return new URL(o).host}catch(o){return console.error("Invalid Host URL:",o.message),""}};r.addEventListener("load",(()=>{r.contentWindow&&r.contentWindow.postMessage({...t,locationHost:window.location.host||c(window.location.ancestorOrigins?.[0])},r.src)})),window.addEventListener("message",(o=>{o.data.mockupsExport&&("download"===e?o.data.mockupsExport.forEach(((o,t)=>{const e=o.export_path,n=`Variation ${t+1}`;fetch(e).then((o=>{if(!o.ok)throw new Error(`Failed to fetch ${e}`);return o.blob()})).then((o=>{const t=document.createElement("a");t.href=window.URL.createObjectURL(o),t.download=n+".webp",t.click(),window.URL.revokeObjectURL(t.href)})).catch((o=>console.error("Error downloading the image:",o)))})):"custom"===e&&"function"==typeof n&&n(o.data))}))},o}({});
