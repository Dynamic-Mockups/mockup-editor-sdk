var DynamicMockups=function(t){"use strict";return t.initDynamicMockupsIframe=({iframeId:t,data:o,mode:e,callback:n})=>{const r=(t,o)=>{t.forEach(((t,e)=>{const n=t.export_path,r="mockup"===o?`Mockup ${e+1}`:`Print file ${e+1}`;fetch(n).then((t=>{if(!t.ok)throw new Error(`Failed to fetch ${n}`);return t.blob()})).then((t=>{const o=document.createElement("a");o.href=window.URL.createObjectURL(t),o.download=r+"."+n.split(".").pop().toLowerCase(),o.click(),window.URL.revokeObjectURL(o.href)})).catch((t=>console.error("Error downloading the image:",t)))}))},a=document.getElementById(t);if(!a)return void console.error(`Iframe with ID '${t}' not found.`);a.src=a.src;const i=t=>{try{return new URL(t).host}catch(t){return console.error("Invalid Host URL:",t.message),""}};window.addEventListener("message",(t=>{if("dmIframeReady"===t.data&&a.contentWindow&&a.contentWindow.postMessage({...o,locationHost:window.location.host||i(window.location.ancestorOrigins?.[0])},a.src),t.data.mockupsAndPrintFilesExport)if("download"===e){r(t.data.mockupsAndPrintFilesExport.mockupsExport,"mockup");const o=t.data.mockupsAndPrintFilesExport.printFilesExport.flatMap((t=>t.print_files));r(o,"print-file")}else"custom"===e&&"function"==typeof n&&n(t.data);if(t.data.mockupsExport&&("download"===e?r(t.data.mockupsExport,"mockup"):"custom"===e&&"function"==typeof n&&n(t.data)),t.data.printFilesExport)if("download"===e){const o=t.data.printFilesExport.flatMap((t=>t.print_files));r(o,"print-file")}else"custom"===e&&"function"==typeof n&&n(t.data)}))},t}({});
