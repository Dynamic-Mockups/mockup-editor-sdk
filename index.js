/**
 * @typedef {Object} IframeData
 * @property {boolean} [haveColorPicker] - Whether to include a color picker.
 * @property {boolean} [haveColorPresets] - Whether to include color presets.
 * @property {boolean} [haveDesignFileUpload] - Whether to allow design file uploads.
 * @property {boolean} [oneColorPerSmartObject] - Whether to use one color per smart object.
 * @property {string} [designUrl] - URL of the design.
 * @property {string} xWebsiteKey - A website key for authorization.
 */

/**
 * @typedef {Object} InitDynamicMockupsIframeParams
 * @property {string} iframeId - The ID of the iframe to interact with.
 * @property {IframeData} data - The data to send to the iframe.
 * @property {"download" | "custom"} mode - Mode to handle the response, either "download" or "custom".
 * @property {Function} [callback] - Optional callback function when mode is "custom".
 */

/**
 * Initializes iframe communication with the specified parameters.
 * @param {InitDynamicMockupsIframeParams} params - The parameters for initializing the iframe.
 */
function initDynamicMockupsIframe({ iframeId, data, mode, callback }) {
  /**
   * Downloads mockups based on the provided mockup data.
   * @param {Array} mockups - Array of mockup data.
   */
  const downloadMockups = (mockups) => {
    mockups.forEach((item, index) => {
      const imageUrl = item.export_path;
      const imageLabel = `Variation ${index + 1}`;

      fetch(imageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${imageUrl}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = imageLabel + ".webp";
          link.click();
          window.URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.error("Error downloading the image:", error));
    });
  };
  const iframe = document.getElementById(iframeId);

  if (!iframe) {
    console.error(`Iframe with ID '${iframeId}' not found.`);
    return;
  }

  const sendMessage = () => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        data,
        "https://embed.dynamicmockups.com"
      );
    }
  };

  iframe.addEventListener("load", () => {
    sendMessage();
  });

  window.addEventListener("message", (event) => {
    if (event.data.mockupsExport) {
      if (mode === "download") {
        downloadMockups(event.data.mockupsExport);
      } else if (mode === "custom" && typeof callback === "function") {
        callback(event.data.mockupsExport);
      }
    }
  });
}

window.initDynamicMockupsIframe = initDynamicMockupsIframe;
