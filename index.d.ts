/**
 * Interface representing data to send to the iframe.
 */
export interface IframeData {
  /**
   * Whether to show the collections widget in the UI.
   */
  showCollectionsWidget?: boolean;
  /**
   * Whether to show the color picker in the UI.
   */
  showColorPicker?: boolean;

  /**
   * Whether to display preset colors set for loaded template.
   */
  showColorPresets?: boolean;

  /**
   * Restricts the user to one color per smart object.
   */
  oneColorPerSmartObject?: boolean;

  /**
   * Theme appearance 'dark' or 'light'. If set, it overrides setting set by dashboard config.
   */
  themeAppearance?: "dark" | "light";

  /**
   * Theme 'default' or 'adjustments'
   */
  theme?: "default" | "adjustments";

  /**
   * Options for exporting mockups.
   */
  mockupExportOptions?: {
    /**
     * The format of the exported image (e.g., "webp", "png" or "jpg").
     */
    image_format?: "webp" | "png" | "jpg";

    /**
     * The size of the exported image in pixels.
     */
    image_size?: number;

    /**
     * Rendered image URL type "download" or "view". The default is "download."
     */
    mode?: "download" | "view";
  };

  /**
   * The URL of the design file to be used for every smart object.
   */
  designUrl?: string;

  /**
   * If enabled, exporting a single mockup from a collection will automatically export all mockups in the collection, retaining the position and size of the design from the edited mockup.
   */
  enableCollectionExport?: boolean;

  /**
   * Custom data fields as a JSON string (will be returned as is with callback data).
   */
  customFields?: string;

  /**
   * A unique key to identify the website making the request.
   */
  "x-website-key": string;

  /**
   * Enables the export of print files.
   */
  enableCreatePrintFiles?: boolean;

  /**
   * Displays color options.
   */
  enableColorOptions?: boolean;

  /**
   * Enables the export of mockups.
   */
  enableExportMockups?: boolean;

  /**
   * Displays smart object boundaries in the mockup editor.
   */
  showSmartObjectArea?: boolean;

  /**
   * Export Mockups button text.
   */
  exportMockupsButtonText?: string;

  /**
   * List of color presets, each with optional name and an array of hex colors. These presets appear in the colors popup and can be selected by the user.
   */
  colorPresets?: {
    name?: string;
    autoApplyColors?: boolean;
    colors: {
      hex: string;
      name?: string;
    }[];
  }[];

  /**
   * Displays artwork transform controls, like width, height, rotate inputs.
   */
  showTransformControls?: boolean;
}

/**
 * Response structure for iframe communication.
 */
export interface IframeResponse {
  /**
   * Array of mockup export data.
   */
  mockupsExport?: {
    /**
     * Label for the exported mockup.
     */
    export_label: string | null;

    /**
     * Path or URL to the exported mockup file.
     */
    export_path: string;
  }[];

  printFilesExport?: {
    /**
     * Label for the exported mockup.
     */
    export_label: string | null;
    print_files: {
      /**
       * Path or URL to the exported print file.
       */
      export_path: string;
      /**
       *  Smart object UUID of print file.
       */
      smart_object_uuid: string;
      /**
       *  Smart object name of print file.
       */
      smart_object_name: string;
    }[];
  };

  mockupsAndPrintFilesExport?: {
    mockupsExport: {
      /**
       * Label for the exported mockup.
       */
      export_label: string | null;

      /**
       * Path or URL to the exported mockup file.
       */
      export_path: string;
    }[];
    printFilesExport: {
      /**
       * Label for the exported mockup.
       */
      export_label: string | null;
      print_files: {
        /**
         * Path or URL to the exported print file.
         */
        export_path: string;
        /**
         *  Smart object UUID of print file.
         */
        smart_object_uuid: string;
        /**
         *  Smart object name of print file.
         */
        smart_object_name: string;
      }[];
    };
  };

  /**
   * Custom data fields as a string (optional).
   */
  customFields?: string;

  /**
   * Array of artwork data (optional).
   */
  artworks?: {
    /**
     * UUID of the smart object in the artwork.
     */
    smartObjectUUID: string;

    /**
     * File representing the artwork (optional).
     */
    file?: File;

    /**
     * URL of the artwork file (optional).
     */
    url?: string;

    /**
     * Configuration data for the artwork's placement (optional).
     */
    configData?: {
      /**
       * Width of the artwork in pixels.
       */
      width: number;

      /**
       * Height of the artwork in pixels.
       */
      height: number;

      /**
       * Rotation angle of the artwork in degrees.
       */
      rotate: number;

      /**
       * Left offset of the artwork in pixels.
       */
      left: number;

      /**
       * Top offset of the artwork in pixels.
       */
      top: number;
    };

    /**
     * Base64-encoded string representing the artwork file (optional).
     */
    fileBase64?: string;
  }[];
}

/**
 * Parameters for initializing the iframe communication.
 */
export interface InitDynamicMockupsIframeParams {
  /**
   * The ID of the iframe element to target.
   */
  iframeId: string;

  /**
   * The data to be sent to the iframe during initialization.
   */
  data: IframeData;

  /**
   * The mode of operation for the iframe.
   * - `"download"`: Allows users to download the mockup.
   * - `"custom"`: Enables custom behavior within the iframe.
   */
  mode: "download" | "custom";

  /**
   * Optional callback function to handle responses from the iframe.
   *
   * @param response - The response data sent back from the iframe.
   */
  callback?: (response: IframeResponse) => void;
}

/**
 * Initializes iframe communication with the specified parameters.
 * @param params - The parameters for initializing the iframe.
 */
export declare const initDynamicMockupsIframe: ({
  iframeId,
  data,
  mode,
  callback,
}: InitDynamicMockupsIframeParams) => void;
