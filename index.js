/**
 * @typedef {Object} CustomArtworkItem
 * @property {string} name - Name of the artwork item
 * @property {string} url - URL of the artwork
 * @property {string} [thumbnail] - Optional thumbnail URL
 * @property {string} [id] - Optional ID
 */

/**
 * @typedef {Object} LabelConfig
 * @property {string} [label] - Label text
 * @property {string} [tooltip] - Tooltip text
 * @property {string} [icon] - HTML string for icon
 */

/**
 * @typedef {Object} CustomLabelsConfig
 * @property {LabelConfig} [artwork] - Artwork label configuration
 * @property {LabelConfig} [colorOptions] - Color options label configuration
 * @property {LabelConfig} [artworkLibrary] - Artwork library label configuration
 */

/**
 * @typedef {Object} DynamicAiShopProductColor
 * @property {string} name - Color display name
 * @property {string} hex - Hex color value
 */

/**
 * @typedef {Object} DynamicAiShopProduct
 * @property {string} id - Unique product identifier
 * @property {string} name - Product display name
 * @property {string} [description] - Optional product description
 * @property {number} price - Product price
 * @property {number} [discountedPrice] - Optional discounted price (shows strikethrough on original)
 * @property {Array<DynamicAiShopProductColor>} [colors] - Optional available colors
 * @property {Array<string>} [sizes] - Optional available sizes
 * @property {string} mockupUUID - Dynamic Mockups mockup UUID for rendering
 * @property {string} smartObjectUUID - Smart object UUID within the mockup template
 * @property {string} [previewImageUrl] - Optional preview image URL
 */

/**
 * @typedef {Object} DynamicAiShopConfig
 * @property {Array<DynamicAiShopProduct>} products - Array of products to display in the shop
 */

/**
 * @typedef {Object} IframeData
 * @property {boolean} [showCollectionsWidget] - Whether to show collections widget.
 * @property {boolean} [showColorPicker] - Whether to include a color picker.
 * @property {boolean} [showColorPresets] - Whether to include color presets.
 * @property {boolean} [oneColorPerSmartObject] - Whether to use one color per smart object.
 * @property {boolean} [enableCollectionExport] - If enabled, exporting a single mockup from a collection will automatically export all mockups in the collection, retaining the position and size of the design from the edited mockup.
 * @property {Object} [mockupExportOptions] - Options for exporting mockups.
 * @property {boolean} [themeAppearance] - Theme appearance 'dark' or 'light'. If set, it overrides setting set by dashboard config.
 * @property {boolean} [theme] - Theme 'default' or 'adjustments'
 * @property {string} mockupExportOptions.image_format - Format of the exported image (e.g., "webp", "png", "jpg").
 * @property {number} mockupExportOptions.image_size - Size of the exported image.
 * @property {number} mockupExportOptions.mode - Rendered image URL type "download" or "view". The default is "download."
 * @property {string} [designUrl] - The URL of the design file to be used for every smart object.
 * @property {string} [customFields] - Custom user data. Will be returned alongside callback response.
 * @property {string} xWebsiteKey - A website key for authorization.
 * @property {boolean} [enableCreatePrintFiles] - Enables the export of print files.
 * @property {boolean} [enableColorOptions] - Displays color options.
 * @property {boolean} [enableExportMockups] - Enables the export of mockups.
 * @property {boolean} [showSmartObjectArea] - Displays smart object boundaries in the mockup editor.
 * @property {string} [exportMockupsButtonText] - Export Mockups button text.
 * @property {Array<{ name?: string, autoApplyColors?:boolean, colors: Array<{ hex: string, name?: string }> }>} [colorPresets] - List of color presets, each with optional name and an array of hex colors.
 * @property {boolean} [showTransformControls] - Displays artwork transform controls, like width, height, rotate inputs.
 * @property {boolean} [templates] - Use array of template UUID's
 * @property {boolean} [showArtworkLibrary] - Whether to show artwork library.
 * @property {boolean} [showUploadYourArtwork] - Whether to show "Upload your artwork" button.
 * @property {Array<CustomArtworkItem>} [artworkLibrary] - Custom artwork items for the artwork library.
 * @property {CustomLabelsConfig} [customLabels] - Custom label configuration for UI text customization.
 * @property {boolean} [showArtworkEditor] - Whether to show artwork editor.
 * @property {"classic" | "mockanything" | "dynamicaishop"} [editorType] - Sets editor type. Default is classic.
 * @property {Object} [mockanything] - Options for mockanything editor type.
 * @property {string} mockanything.eventListenerName - Name of event listener used for parent-child iframe communication.
 * @property {string} mockanything.customModelImage - Custom image url provided, instead of api generated approach. Used for custom iframe implementation via parameters.
 * @property {string} mockanything.prompt - Custom prompt provided, based on which an image will be generated.
 * @property {DynamicAiShopConfig} [dynamicaishop] - Options for dynamicaishop editor type.

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
export const initDynamicMockupsIframe = ({
  iframeId,
  data,
  mode,
  callback,
}) => {
  /**
   * Downloads mockups based on the provided mockup data.
   * @param {Array} mockups - Array of mockup data.
   */
  const downloadMockups = (mockups, type) => {
    mockups.forEach((item, index) => {
      const imageUrl = item.export_path;
      const imageLabel =
        type === "mockup" ? `Mockup ${index + 1}` : `Print file ${index + 1}`;

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
          link.download =
            imageLabel + "." + imageUrl.split(".").pop().toLowerCase();
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
  } else {
    iframe.src = iframe.src;
  }

  const getHostFromURL = (url) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host;
    } catch (error) {
      console.error("Invalid Host URL:", error.message);
      return "";
    }
  };

  const getMainDomain = (url) => {
    try {
      const hostname = new URL(url).hostname;
      const parts = hostname.split(".");

      // Handle edge cases like localhost, IPs, or single-part domains
      if (parts.length <= 2) {
        return hostname;
      }

      // Return last 2 parts (domain.tld)
      return parts.slice(-2).join(".");
    } catch (error) {
      console.error("Invalid Main Domain:", error.message);
      return "";
    }
  };

  const getParentDomain = () => {
    // 1. Check if we're in an iframe and try ancestorOrigins (Chrome/Safari)
    if (
      window.location.ancestorOrigins &&
      window.location.ancestorOrigins.length > 0
    ) {
      // Get the topmost ancestor origin (the actual parent page)
      const topOrigin =
        window.location.ancestorOrigins[
          window.location.ancestorOrigins.length - 1
        ];
      return getMainDomain(topOrigin);
    }

    // 2. Try document.referrer if available (works cross-origin)
    if (document.referrer && document.referrer !== window.location.href) {
      const referrerDomain = getMainDomain(document.referrer);
      const currentDomain = getMainDomain(window.location.origin);

      // If referrer domain is different, it's likely the parent
      if (referrerDomain && referrerDomain !== currentDomain) {
        return referrerDomain;
      }
    }

    // 3. Fallback to current location
    return getMainDomain(window.location.origin) || window.location.host;
  };

  const sendMessage = () => {
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          ...data,
          locationHost: getParentDomain(),
        },
        iframe.src,
      );
    }
  };

  window.addEventListener("message", (event) => {
    if (event.data === "dmIframeReady") {
      sendMessage();
    }

    if (event.data?.type === "COPY_TO_CLIPBOARD") {
      const dataUrl = event.data.dataUrl;
      const img = new Image();

      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
          if (navigator.clipboard && navigator.clipboard.write) {
            const item = new ClipboardItem({
              "image/png": blob,
            });

            navigator.clipboard.write([item]).catch((error) => {
              console.error("Failed to copy image to clipboard:", error);
            });
          } else {
            console.error("Clipboard API not supported in this browser");
          }
        }, "image/png");
      };

      img.src = dataUrl;
    }

    if (event.data.mockupsAndPrintFilesExport) {
      if (mode === "download") {
        downloadMockups(
          event.data.mockupsAndPrintFilesExport.mockupsExport,
          "mockup",
        );
        const printFiles =
          event.data.mockupsAndPrintFilesExport.printFilesExport.flatMap(
            (item) => item.print_files,
          );
        downloadMockups(printFiles, "print-file");
      } else if (mode === "custom" && typeof callback === "function") {
        callback(event.data);
      }
    }

    if (event.data.mockupsExport) {
      if (mode === "download") {
        downloadMockups(event.data.mockupsExport, "mockup");
      } else if (mode === "custom" && typeof callback === "function") {
        callback(event.data);
      }
    }
    if (event.data.printFilesExport) {
      if (mode === "download") {
        const printFiles = event.data.printFilesExport.flatMap(
          (item) => item.print_files,
        );
        downloadMockups(printFiles, "print-file");
      } else if (mode === "custom" && typeof callback === "function") {
        callback(event.data);
      }
    }

    if (event.data?.type === "DYNAMIC_AI_SHOP_ADD_TO_CART") {
      if (mode === "custom" && typeof callback === "function") {
        callback(event.data);
      }
    }
  });
};
