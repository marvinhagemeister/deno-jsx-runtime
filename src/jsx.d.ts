type Defaultize<Props, Defaults> =
  // Distribute over unions
  // deno-lint-ignore no-explicit-any
  Props extends any // Make any properties included in Default optional
    ?
      & Partial<Pick<Props, Extract<keyof Props, keyof Defaults>>>
      & // Include the remaining properties from Props
      Pick<Props, Exclude<keyof Props, keyof Defaults>>
    : never;

type Booleanish = boolean | "true" | "false";

// Remove when bumping TS minimum to >5.2

/** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ToggleEvent) */
interface ToggleEvent extends Event {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ToggleEvent/newState) */
  readonly newState: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ToggleEvent/oldState) */
  readonly oldState: string;
}

// deno-lint-ignore no-var
declare var ToggleEvent: {
  prototype: ToggleEvent;
  new (type: string, eventInitDict?: ToggleEventInit): ToggleEvent;
};

interface ToggleEventInit extends EventInit {
  newState?: string;
  oldState?: string;
}

// End TS >5.2

/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/CommandEvent) */
interface CommandEvent extends Event {
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/CommandEvent/source) */
  readonly source: Element | null;
  /** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/CommandEvent/command) */
  readonly command: string;
}

// deno-lint-ignore no-var
declare var CommandEvent: {
  prototype: CommandEvent;
  new (type: string, eventInitDict?: CommandEventInit): CommandEvent;
};

interface CommandEventInit extends EventInit {
  source: Element | null;
  command: string;
}

export interface CustomDOMAttributes {
  children?: JSXNode;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

export interface Attributes {
  children?: JSXNode;
  key?: string | number | undefined;
  jsx?: boolean | undefined;
}

// deno-lint-ignore no-explicit-any
export interface VNode<P = any> {
  $$typeof: symbol;
  type: string | ComponentType<P>;
  props: P & Attributes;
  key: string | number | undefined;
  [Symbol.toPrimitive](): string;
}

export type JSXNode =
  | string
  | number
  | null
  | bigint
  | boolean
  | undefined
  | VNode
  | JSXNode[];

// deno-lint-ignore no-explicit-any
export interface Component<_P = any> {
  render(): VNode | null;
}
// deno-lint-ignore no-explicit-any
export interface ComponentClass<P = any> {
  new (props: P): Component<P>;
}
// deno-lint-ignore no-explicit-any
export type FunctionComponent<P = any | null> = (props: P) => VNode | null;

// deno-lint-ignore no-explicit-any
export type ComponentType<P = any> =
  | ComponentClass<P>
  | FunctionComponent<P>;

export namespace JSXInternal {
  export type LibraryManagedAttributes<Component, Props> = Component extends {
    defaultProps: infer Defaults;
  } ? Defaultize<Props, Defaults>
    : Props;

  export interface IntrinsicAttributes {
    // deno-lint-ignore no-explicit-any
    key?: any;
    // deno-lint-ignore no-explicit-any
    children?: any;
  }

  // deno-lint-ignore no-explicit-any
  export type ElementType<P = any> =
    | {
      [K in keyof IntrinsicElements]: P extends IntrinsicElements[K] ? K
        : never;
    }[keyof IntrinsicElements]
    | ComponentType<P>;
  export interface Element extends VNode {}
  export type ElementClass = Component | FunctionComponent;

  export interface ElementAttributesProperty {
    // deno-lint-ignore no-explicit-any
    props: any;
  }

  export interface ElementChildrenAttribute {
    // deno-lint-ignore no-explicit-any
    children: any;
  }

  export type DOMCSSProperties = {
    [
      key in keyof Omit<
        CSSStyleDeclaration,
        | "item"
        | "setProperty"
        | "removeProperty"
        | "getPropertyValue"
        | "getPropertyPriority"
      >
    ]?: string | number | null | undefined;
  };
  export type AllCSSProperties = {
    [key: string]: string | number | null | undefined;
  };
  export interface CSSProperties extends AllCSSProperties, DOMCSSProperties {
    cssText?: string | null;
  }

  export interface SVGAttributes<Target extends EventTarget = SVGElement>
    extends HTMLAttributes<Target> {
    accentHeight?: number | string | undefined;
    accumulate?: "none" | "sum" | undefined;
    additive?: "replace" | "sum" | undefined;
    alignmentBaseline?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined;
    "alignment-baseline"?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined;
    allowReorder?: "no" | "yes" | undefined;
    "allow-reorder"?: "no" | "yes" | undefined;
    alphabetic?: number | string | undefined;
    amplitude?: number | string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
    arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
    "arabic-form"?: "initial" | "medial" | "terminal" | "isolated" | undefined;
    ascent?: number | string | undefined;
    attributeName?: string | undefined;
    attributeType?: string | undefined;
    azimuth?: number | string | undefined;
    baseFrequency?: number | string | undefined;
    baselineShift?: number | string | undefined;
    "baseline-shift"?: number | string | undefined;
    baseProfile?: number | string | undefined;
    bbox?: number | string | undefined;
    begin?: number | string | undefined;
    bias?: number | string | undefined;
    by?: number | string | undefined;
    calcMode?: number | string | undefined;
    capHeight?: number | string | undefined;
    "cap-height"?: number | string | undefined;
    clip?: number | string | undefined;
    clipPath?: string | undefined;
    "clip-path"?: string | undefined;
    clipPathUnits?: number | string | undefined;
    clipRule?: number | string | undefined;
    "clip-rule"?: number | string | undefined;
    colorInterpolation?: number | string | undefined;
    "color-interpolation"?: number | string | undefined;
    colorInterpolationFilters?:
      | "auto"
      | "sRGB"
      | "linearRGB"
      | "inherit"
      | undefined;
    "color-interpolation-filters"?:
      | "auto"
      | "sRGB"
      | "linearRGB"
      | "inherit"
      | undefined;
    colorProfile?: number | string | undefined;
    "color-profile"?: number | string | undefined;
    colorRendering?: number | string | undefined;
    "color-rendering"?: number | string | undefined;
    contentScriptType?: number | string | undefined;
    "content-script-type"?: number | string | undefined;
    contentStyleType?: number | string | undefined;
    "content-style-type"?: number | string | undefined;
    cursor?: number | string | undefined;
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    d?: string | undefined;
    decelerate?: number | string | undefined;
    descent?: number | string | undefined;
    diffuseConstant?: number | string | undefined;
    direction?: number | string | undefined;
    display?: number | string | undefined;
    divisor?: number | string | undefined;
    dominantBaseline?: number | string | undefined;
    "dominant-baseline"?: number | string | undefined;
    dur?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    edgeMode?: number | string | undefined;
    elevation?: number | string | undefined;
    enableBackground?: number | string | undefined;
    "enable-background"?: number | string | undefined;
    end?: number | string | undefined;
    exponent?: number | string | undefined;
    externalResourcesRequired?: number | string | undefined;
    fill?: string | undefined;
    fillOpacity?: number | string | undefined;
    "fill-opacity"?: number | string | undefined;
    fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
    "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined;
    filter?: string | undefined;
    filterRes?: number | string | undefined;
    filterUnits?: number | string | undefined;
    floodColor?: number | string | undefined;
    "flood-color"?: number | string | undefined;
    floodOpacity?: number | string | undefined;
    "flood-opacity"?: number | string | undefined;
    focusable?: number | string | undefined;
    fontFamily?: string | undefined;
    "font-family"?: string | undefined;
    fontSize?: number | string | undefined;
    "font-size"?: number | string | undefined;
    fontSizeAdjust?: number | string | undefined;
    "font-size-adjust"?: number | string | undefined;
    fontStretch?: number | string | undefined;
    "font-stretch"?: number | string | undefined;
    fontStyle?: number | string | undefined;
    "font-style"?: number | string | undefined;
    fontVariant?: number | string | undefined;
    "font-variant"?: number | string | undefined;
    fontWeight?: number | string | undefined;
    "font-weight"?: number | string | undefined;
    format?: number | string | undefined;
    from?: number | string | undefined;
    fx?: number | string | undefined;
    fy?: number | string | undefined;
    g1?: number | string | undefined;
    g2?: number | string | undefined;
    glyphName?: number | string | undefined;
    "glyph-name"?: number | string | undefined;
    glyphOrientationHorizontal?: number | string | undefined;
    "glyph-orientation-horizontal"?: number | string | undefined;
    glyphOrientationVertical?: number | string | undefined;
    "glyph-orientation-vertical"?: number | string | undefined;
    glyphRef?: number | string | undefined;
    gradientTransform?: string | undefined;
    gradientUnits?: string | undefined;
    hanging?: number | string | undefined;
    height?: number | string | undefined;
    horizAdvX?: number | string | undefined;
    "horiz-adv-x"?: number | string | undefined;
    horizOriginX?: number | string | undefined;
    "horiz-origin-x"?: number | string | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    hrefLang?: string | undefined;
    ideographic?: number | string | undefined;
    imageRendering?: number | string | undefined;
    "image-rendering"?: number | string | undefined;
    in2?: number | string | undefined;
    in?: string | undefined;
    intercept?: number | string | undefined;
    k1?: number | string | undefined;
    k2?: number | string | undefined;
    k3?: number | string | undefined;
    k4?: number | string | undefined;
    k?: number | string | undefined;
    kernelMatrix?: number | string | undefined;
    kernelUnitLength?: number | string | undefined;
    kerning?: number | string | undefined;
    keyPoints?: number | string | undefined;
    keySplines?: number | string | undefined;
    keyTimes?: number | string | undefined;
    lengthAdjust?: number | string | undefined;
    letterSpacing?: number | string | undefined;
    "letter-spacing"?: number | string | undefined;
    lightingColor?: number | string | undefined;
    "lighting-color"?: number | string | undefined;
    limitingConeAngle?: number | string | undefined;
    local?: number | string | undefined;
    markerEnd?: string | undefined;
    "marker-end"?: string | undefined;
    markerHeight?: number | string | undefined;
    markerMid?: string | undefined;
    "marker-mid"?: string | undefined;
    markerStart?: string | undefined;
    "marker-start"?: string | undefined;
    markerUnits?: number | string | undefined;
    markerWidth?: number | string | undefined;
    mask?: string | undefined;
    maskContentUnits?: number | string | undefined;
    maskUnits?: number | string | undefined;
    mathematical?: number | string | undefined;
    mode?: number | string | undefined;
    numOctaves?: number | string | undefined;
    offset?: number | string | undefined;
    opacity?: number | string | undefined;
    operator?: number | string | undefined;
    order?: number | string | undefined;
    orient?: number | string | undefined;
    orientation?: number | string | undefined;
    origin?: number | string | undefined;
    overflow?: number | string | undefined;
    overlinePosition?: number | string | undefined;
    "overline-position"?: number | string | undefined;
    overlineThickness?: number | string | undefined;
    "overline-thickness"?: number | string | undefined;
    paintOrder?: number | string | undefined;
    "paint-order"?: number | string | undefined;
    panose1?: number | string | undefined;
    "panose-1"?: number | string | undefined;
    pathLength?: number | string | undefined;
    patternContentUnits?: string | undefined;
    patternTransform?: number | string | undefined;
    patternUnits?: string | undefined;
    pointerEvents?: number | string | undefined;
    "pointer-events"?: number | string | undefined;
    points?: string | undefined;
    pointsAtX?: number | string | undefined;
    pointsAtY?: number | string | undefined;
    pointsAtZ?: number | string | undefined;
    preserveAlpha?: number | string | undefined;
    preserveAspectRatio?: string | undefined;
    primitiveUnits?: number | string | undefined;
    r?: number | string | undefined;
    radius?: number | string | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    renderingIntent?: number | string | undefined;
    "rendering-intent"?: number | string | undefined;
    repeatCount?: number | string | undefined;
    "repeat-count"?: number | string | undefined;
    repeatDur?: number | string | undefined;
    "repeat-dur"?: number | string | undefined;
    requiredExtensions?: number | string | undefined;
    requiredFeatures?: number | string | undefined;
    restart?: number | string | undefined;
    result?: string | undefined;
    rotate?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
    scale?: number | string | undefined;
    seed?: number | string | undefined;
    shapeRendering?: number | string | undefined;
    "shape-rendering"?: number | string | undefined;
    slope?: number | string | undefined;
    spacing?: number | string | undefined;
    specularConstant?: number | string | undefined;
    specularExponent?: number | string | undefined;
    speed?: number | string | undefined;
    spreadMethod?: string | undefined;
    startOffset?: number | string | undefined;
    stdDeviation?: number | string | undefined;
    stemh?: number | string | undefined;
    stemv?: number | string | undefined;
    stitchTiles?: number | string | undefined;
    stopColor?: string | undefined;
    "stop-color"?: string | undefined;
    stopOpacity?: number | string | undefined;
    "stop-opacity"?: number | string | undefined;
    strikethroughPosition?: number | string | undefined;
    "strikethrough-position"?: number | string | undefined;
    strikethroughThickness?: number | string | undefined;
    "strikethrough-thickness"?: number | string | undefined;
    string?: number | string | undefined;
    stroke?: string | undefined;
    strokeDasharray?: string | number | undefined;
    "stroke-dasharray"?: string | number | undefined;
    strokeDashoffset?: string | number | undefined;
    "stroke-dashoffset"?: string | number | undefined;
    strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
    "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | undefined;
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
    "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit" | undefined;
    strokeMiterlimit?: string | number | undefined;
    "stroke-miterlimit"?: string | number | undefined;
    strokeOpacity?: number | string | undefined;
    "stroke-opacity"?: number | string | undefined;
    strokeWidth?: number | string | undefined;
    "stroke-width"?: number | string | undefined;
    surfaceScale?: number | string | undefined;
    systemLanguage?: number | string | undefined;
    tableValues?: number | string | undefined;
    targetX?: number | string | undefined;
    targetY?: number | string | undefined;
    textAnchor?: string | undefined;
    "text-anchor"?: string | undefined;
    textDecoration?: number | string | undefined;
    "text-decoration"?: number | string | undefined;
    textLength?: number | string | undefined;
    textRendering?: number | string | undefined;
    "text-rendering"?: number | string | undefined;
    to?: number | string | undefined;
    transform?: string | undefined;
    transformOrigin?: string | undefined;
    "transform-origin"?: string | undefined;
    type?: string | undefined;
    u1?: number | string | undefined;
    u2?: number | string | undefined;
    underlinePosition?: number | string | undefined;
    "underline-position"?: number | string | undefined;
    underlineThickness?: number | string | undefined;
    "underline-thickness"?: number | string | undefined;
    unicode?: number | string | undefined;
    unicodeBidi?: number | string | undefined;
    "unicode-bidi"?: number | string | undefined;
    unicodeRange?: number | string | undefined;
    "unicode-range"?: number | string | undefined;
    unitsPerEm?: number | string | undefined;
    "units-per-em"?: number | string | undefined;
    vAlphabetic?: number | string | undefined;
    "v-alphabetic"?: number | string | undefined;
    values?: string | undefined;
    vectorEffect?: number | string | undefined;
    "vector-effect"?: number | string | undefined;
    version?: string | undefined;
    vertAdvY?: number | string | undefined;
    "vert-adv-y"?: number | string | undefined;
    vertOriginX?: number | string | undefined;
    "vert-origin-x"?: number | string | undefined;
    vertOriginY?: number | string | undefined;
    "vert-origin-y"?: number | string | undefined;
    vHanging?: number | string | undefined;
    "v-hanging"?: number | string | undefined;
    vIdeographic?: number | string | undefined;
    "v-ideographic"?: number | string | undefined;
    viewBox?: string | undefined;
    viewTarget?: number | string | undefined;
    visibility?: number | string | undefined;
    vMathematical?: number | string | undefined;
    "v-mathematical"?: number | string | undefined;
    width?: number | string | undefined;
    wordSpacing?: number | string | undefined;
    "word-spacing"?: number | string | undefined;
    writingMode?: number | string | undefined;
    "writing-mode"?: number | string | undefined;
    x1?: number | string | undefined;
    x2?: number | string | undefined;
    x?: number | string | undefined;
    xChannelSelector?: string | undefined;
    xHeight?: number | string | undefined;
    "x-height"?: number | string | undefined;
    xlinkActuate?: string | undefined;
    "xlink:actuate"?: SVGAttributes["xlinkActuate"];
    xlinkArcrole?: string | undefined;
    "xlink:arcrole"?: string | undefined;
    xlinkHref?: string | undefined;
    "xlink:href"?: string | undefined;
    xlinkRole?: string | undefined;
    "xlink:role"?: string | undefined;
    xlinkShow?: string | undefined;
    "xlink:show"?: string | undefined;
    xlinkTitle?: string | undefined;
    "xlink:title"?: string | undefined;
    xlinkType?: string | undefined;
    "xlink:type"?: string | undefined;
    xmlBase?: string | undefined;
    "xml:base"?: string | undefined;
    xmlLang?: string | undefined;
    "xml:lang"?: string | undefined;
    xmlns?: string | undefined;
    xmlnsXlink?: string | undefined;
    xmlSpace?: string | undefined;
    "xml:space"?: string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
    y?: number | string | undefined;
    yChannelSelector?: string | undefined;
    z?: number | string | undefined;
    zoomAndPan?: string | undefined;
  }

  export interface PathAttributes {
    d: string;
  }

  export type TargetedEvent<
    Target extends EventTarget = EventTarget,
    TypedEvent extends Event = Event,
  > = Omit<TypedEvent, "currentTarget"> & {
    readonly currentTarget: Target;
  };

  export type TargetedAnimationEvent<Target extends EventTarget> =
    TargetedEvent<Target, AnimationEvent>;
  export type TargetedClipboardEvent<Target extends EventTarget> =
    TargetedEvent<Target, ClipboardEvent>;
  export type TargetedCommandEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    CommandEvent
  >;
  export type TargetedCompositionEvent<Target extends EventTarget> =
    TargetedEvent<Target, CompositionEvent>;
  export type TargetedDragEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    DragEvent
  >;
  export type TargetedFocusEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    FocusEvent
  >;
  export type TargetedInputEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    InputEvent
  >;
  export type TargetedKeyboardEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    KeyboardEvent
  >;
  export type TargetedMouseEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    MouseEvent
  >;
  export type TargetedPointerEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    PointerEvent
  >;
  export type TargetedSubmitEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    SubmitEvent
  >;
  export type TargetedTouchEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    TouchEvent
  >;
  export type TargetedToggleEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    ToggleEvent
  >;
  export type TargetedTransitionEvent<Target extends EventTarget> =
    TargetedEvent<Target, TransitionEvent>;
  export type TargetedUIEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    UIEvent
  >;
  export type TargetedWheelEvent<Target extends EventTarget> = TargetedEvent<
    Target,
    WheelEvent
  >;
  export type TargetedPictureInPictureEvent<Target extends EventTarget> =
    TargetedEvent<Target, PictureInPictureEvent>;

  export type EventHandler<E extends TargetedEvent> = {
    bivarianceHack(event: E): void;
  }["bivarianceHack"];

  export type AnimationEventHandler<Target extends EventTarget> = EventHandler<
    TargetedAnimationEvent<Target>
  >;
  export type ClipboardEventHandler<Target extends EventTarget> = EventHandler<
    TargetedClipboardEvent<Target>
  >;
  export type CommandEventHandler<Target extends EventTarget> = EventHandler<
    TargetedCommandEvent<Target>
  >;
  export type CompositionEventHandler<Target extends EventTarget> =
    EventHandler<TargetedCompositionEvent<Target>>;
  export type DragEventHandler<Target extends EventTarget> = EventHandler<
    TargetedDragEvent<Target>
  >;
  export type ToggleEventHandler<Target extends EventTarget> = EventHandler<
    TargetedToggleEvent<Target>
  >;
  export type FocusEventHandler<Target extends EventTarget> = EventHandler<
    TargetedFocusEvent<Target>
  >;
  export type GenericEventHandler<Target extends EventTarget> = EventHandler<
    TargetedEvent<Target>
  >;
  export type InputEventHandler<Target extends EventTarget> = EventHandler<
    TargetedInputEvent<Target>
  >;
  export type KeyboardEventHandler<Target extends EventTarget> = EventHandler<
    TargetedKeyboardEvent<Target>
  >;
  export type MouseEventHandler<Target extends EventTarget> = EventHandler<
    TargetedMouseEvent<Target>
  >;
  export type PointerEventHandler<Target extends EventTarget> = EventHandler<
    TargetedPointerEvent<Target>
  >;
  export type SubmitEventHandler<Target extends EventTarget> = EventHandler<
    TargetedSubmitEvent<Target>
  >;
  export type TouchEventHandler<Target extends EventTarget> = EventHandler<
    TargetedTouchEvent<Target>
  >;
  export type TransitionEventHandler<Target extends EventTarget> = EventHandler<
    TargetedTransitionEvent<Target>
  >;
  export type UIEventHandler<Target extends EventTarget> = EventHandler<
    TargetedUIEvent<Target>
  >;
  export type WheelEventHandler<Target extends EventTarget> = EventHandler<
    TargetedWheelEvent<Target>
  >;
  export type PictureInPictureEventHandler<Target extends EventTarget> =
    EventHandler<TargetedPictureInPictureEvent<Target>>;

  export interface DOMAttributes<Target extends EventTarget>
    extends CustomDOMAttributes {
    // Image Events
    onload?: GenericEventHandler<Target> | undefined;
    onloadcapture?: GenericEventHandler<Target> | undefined;
    onerror?: GenericEventHandler<Target> | undefined;
    onerrorcapture?: GenericEventHandler<Target> | undefined;

    // Clipboard Events
    oncopy?: ClipboardEventHandler<Target> | undefined;
    oncopycapture?: ClipboardEventHandler<Target> | undefined;
    oncut?: ClipboardEventHandler<Target> | undefined;
    oncutcapture?: ClipboardEventHandler<Target> | undefined;
    onpaste?: ClipboardEventHandler<Target> | undefined;
    onpastecapture?: ClipboardEventHandler<Target> | undefined;

    // Composition Events
    oncompositionend?: CompositionEventHandler<Target> | undefined;
    oncompositionendcapture?: CompositionEventHandler<Target> | undefined;
    oncompositionstart?: CompositionEventHandler<Target> | undefined;
    oncompositionstartcapture?: CompositionEventHandler<Target> | undefined;
    oncompositionupdate?: CompositionEventHandler<Target> | undefined;
    oncompositionupdatecapture?: CompositionEventHandler<Target> | undefined;

    // Popover Events
    onbeforetoggle?: ToggleEventHandler<Target> | undefined;
    ontoggle?: ToggleEventHandler<Target> | undefined;

    // Dialog Events
    onclose?: GenericEventHandler<Target> | undefined;
    oncancel?: GenericEventHandler<Target> | undefined;

    // Focus Events
    onfocus?: FocusEventHandler<Target> | undefined;
    onfocuscapture?: FocusEventHandler<Target> | undefined;
    onfocusin?: FocusEventHandler<Target> | undefined;
    onfocusincapture?: FocusEventHandler<Target> | undefined;
    onfocusout?: FocusEventHandler<Target> | undefined;
    onfocusoutcapture?: FocusEventHandler<Target> | undefined;
    onblur?: FocusEventHandler<Target> | undefined;
    onblurcapture?: FocusEventHandler<Target> | undefined;

    // Form Events
    onchange?: GenericEventHandler<Target> | undefined;
    onchangecapture?: GenericEventHandler<Target> | undefined;
    oninput?: InputEventHandler<Target> | undefined;
    oninputcapture?: InputEventHandler<Target> | undefined;
    onbeforeinput?: InputEventHandler<Target> | undefined;
    onbeforeinputcapture?: InputEventHandler<Target> | undefined;
    onsearch?: GenericEventHandler<Target> | undefined;
    onsearchcapture?: GenericEventHandler<Target> | undefined;
    onsubmit?: SubmitEventHandler<Target> | undefined;
    onsubmitcapture?: SubmitEventHandler<Target> | undefined;
    oninvalid?: GenericEventHandler<Target> | undefined;
    oninvalidcapture?: GenericEventHandler<Target> | undefined;
    onreset?: GenericEventHandler<Target> | undefined;
    onresetcapture?: GenericEventHandler<Target> | undefined;
    onformdata?: GenericEventHandler<Target> | undefined;
    onformdatacapture?: GenericEventHandler<Target> | undefined;

    // Keyboard Events
    onkeydown?: KeyboardEventHandler<Target> | undefined;
    onkeydowncapture?: KeyboardEventHandler<Target> | undefined;
    onkeypress?: KeyboardEventHandler<Target> | undefined;
    onkeypresscapture?: KeyboardEventHandler<Target> | undefined;
    onkeyup?: KeyboardEventHandler<Target> | undefined;
    onkeyupcapture?: KeyboardEventHandler<Target> | undefined;

    // Media Events
    onabort?: GenericEventHandler<Target> | undefined;
    onabortcapture?: GenericEventHandler<Target> | undefined;
    oncanplay?: GenericEventHandler<Target> | undefined;
    oncanplaycapture?: GenericEventHandler<Target> | undefined;
    oncanplaythrough?: GenericEventHandler<Target> | undefined;
    oncanplaythroughcapture?: GenericEventHandler<Target> | undefined;
    ondurationchange?: GenericEventHandler<Target> | undefined;
    ondurationchangecapture?: GenericEventHandler<Target> | undefined;
    onemptied?: GenericEventHandler<Target> | undefined;
    onemptiedcapture?: GenericEventHandler<Target> | undefined;
    onencrypted?: GenericEventHandler<Target> | undefined;
    onencryptedcapture?: GenericEventHandler<Target> | undefined;
    onended?: GenericEventHandler<Target> | undefined;
    onendedcapture?: GenericEventHandler<Target> | undefined;
    onloadeddata?: GenericEventHandler<Target> | undefined;
    onloadeddatacapture?: GenericEventHandler<Target> | undefined;
    onloadedmetadata?: GenericEventHandler<Target> | undefined;
    onloadedmetadatacapture?: GenericEventHandler<Target> | undefined;
    onloadstart?: GenericEventHandler<Target> | undefined;
    onloadstartcapture?: GenericEventHandler<Target> | undefined;
    onpause?: GenericEventHandler<Target> | undefined;
    onpausecapture?: GenericEventHandler<Target> | undefined;
    onplay?: GenericEventHandler<Target> | undefined;
    onplaycapture?: GenericEventHandler<Target> | undefined;
    onplaying?: GenericEventHandler<Target> | undefined;
    onplayingcapture?: GenericEventHandler<Target> | undefined;
    onprogress?: GenericEventHandler<Target> | undefined;
    onprogresscapture?: GenericEventHandler<Target> | undefined;
    onratechange?: GenericEventHandler<Target> | undefined;
    onratechangecapture?: GenericEventHandler<Target> | undefined;
    onseeked?: GenericEventHandler<Target> | undefined;
    onseekedcapture?: GenericEventHandler<Target> | undefined;
    onseeking?: GenericEventHandler<Target> | undefined;
    onseekingcapture?: GenericEventHandler<Target> | undefined;
    onstalled?: GenericEventHandler<Target> | undefined;
    onstalledcapture?: GenericEventHandler<Target> | undefined;
    onsuspend?: GenericEventHandler<Target> | undefined;
    onsuspendcapture?: GenericEventHandler<Target> | undefined;
    ontimeupdate?: GenericEventHandler<Target> | undefined;
    ontimeupdatecapture?: GenericEventHandler<Target> | undefined;
    onvolumechange?: GenericEventHandler<Target> | undefined;
    onvolumechangecapture?: GenericEventHandler<Target> | undefined;
    onwaiting?: GenericEventHandler<Target> | undefined;
    onwaitingcapture?: GenericEventHandler<Target> | undefined;

    // MouseEvents
    onclick?: MouseEventHandler<Target> | undefined;
    onclickcapture?: MouseEventHandler<Target> | undefined;
    oncontextmenu?: MouseEventHandler<Target> | undefined;
    oncontextmenucapture?: MouseEventHandler<Target> | undefined;
    ondblclick?: MouseEventHandler<Target> | undefined;
    ondblclickcapture?: MouseEventHandler<Target> | undefined;
    ondrag?: DragEventHandler<Target> | undefined;
    ondragcapture?: DragEventHandler<Target> | undefined;
    ondragend?: DragEventHandler<Target> | undefined;
    ondragendcapture?: DragEventHandler<Target> | undefined;
    ondragenter?: DragEventHandler<Target> | undefined;
    ondragentercapture?: DragEventHandler<Target> | undefined;
    ondragexit?: DragEventHandler<Target> | undefined;
    ondragexitcapture?: DragEventHandler<Target> | undefined;
    ondragleave?: DragEventHandler<Target> | undefined;
    ondragleavecapture?: DragEventHandler<Target> | undefined;
    ondragover?: DragEventHandler<Target> | undefined;
    ondragovercapture?: DragEventHandler<Target> | undefined;
    ondragstart?: DragEventHandler<Target> | undefined;
    ondragstartcapture?: DragEventHandler<Target> | undefined;
    ondrop?: DragEventHandler<Target> | undefined;
    ondropcapture?: DragEventHandler<Target> | undefined;
    onmousedown?: MouseEventHandler<Target> | undefined;
    onmousedowncapture?: MouseEventHandler<Target> | undefined;
    onmouseenter?: MouseEventHandler<Target> | undefined;
    onmouseentercapture?: MouseEventHandler<Target> | undefined;
    onmouseleave?: MouseEventHandler<Target> | undefined;
    onmouseleavecapture?: MouseEventHandler<Target> | undefined;
    onmousemove?: MouseEventHandler<Target> | undefined;
    onmousemovecapture?: MouseEventHandler<Target> | undefined;
    onmouseout?: MouseEventHandler<Target> | undefined;
    onmouseoutcapture?: MouseEventHandler<Target> | undefined;
    onmouseover?: MouseEventHandler<Target> | undefined;
    onmouseovercapture?: MouseEventHandler<Target> | undefined;
    onmouseup?: MouseEventHandler<Target> | undefined;
    onmouseupcapture?: MouseEventHandler<Target> | undefined;
    // TODO: Spec for `auxclick` events was changed to make it a PointerEvent but only
    // Chrome has support for it yet. When more browsers align we should change this.
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event#browser_compatibility
    onauxclick?: MouseEventHandler<Target> | undefined;
    onauxclickcapture?: MouseEventHandler<Target> | undefined;

    // Selection Events
    onselect?: GenericEventHandler<Target> | undefined;
    onselectcapture?: GenericEventHandler<Target> | undefined;

    // Touch Events
    ontouchcancel?: TouchEventHandler<Target> | undefined;
    ontouchcancelcapture?: TouchEventHandler<Target> | undefined;
    ontouchend?: TouchEventHandler<Target> | undefined;
    ontouchendcapture?: TouchEventHandler<Target> | undefined;
    ontouchmove?: TouchEventHandler<Target> | undefined;
    ontouchmovecapture?: TouchEventHandler<Target> | undefined;
    ontouchstart?: TouchEventHandler<Target> | undefined;
    ontouchstartcapture?: TouchEventHandler<Target> | undefined;

    // Pointer Events
    onpointerover?: PointerEventHandler<Target> | undefined;
    onpointerovercapture?: PointerEventHandler<Target> | undefined;
    onpointerenter?: PointerEventHandler<Target> | undefined;
    onpointerentercapture?: PointerEventHandler<Target> | undefined;
    onpointerdown?: PointerEventHandler<Target> | undefined;
    onpointerdowncapture?: PointerEventHandler<Target> | undefined;
    onpointermove?: PointerEventHandler<Target> | undefined;
    onpointermovecapture?: PointerEventHandler<Target> | undefined;
    onpointerup?: PointerEventHandler<Target> | undefined;
    onpointerupcapture?: PointerEventHandler<Target> | undefined;
    onpointercancel?: PointerEventHandler<Target> | undefined;
    onpointercancelcapture?: PointerEventHandler<Target> | undefined;
    onpointerout?: PointerEventHandler<Target> | undefined;
    onpointeroutcapture?: PointerEventHandler<Target> | undefined;
    onpointerleave?: PointerEventHandler<Target> | undefined;
    onpointerleavecapture?: PointerEventHandler<Target> | undefined;
    ongotpointercapture?: PointerEventHandler<Target> | undefined;
    ongotpointercapturecapture?: PointerEventHandler<Target> | undefined;
    onlostpointercapture?: PointerEventHandler<Target> | undefined;
    onlostpointercapturecapture?: PointerEventHandler<Target> | undefined;

    // UI Events
    onscroll?: UIEventHandler<Target> | undefined;
    onscrollend?: UIEventHandler<Target> | undefined;
    onscrollcapture?: UIEventHandler<Target> | undefined;

    // Wheel Events
    onwheel?: WheelEventHandler<Target> | undefined;
    onwheelcapture?: WheelEventHandler<Target> | undefined;

    // Animation Events
    onanimationstart?: AnimationEventHandler<Target> | undefined;
    onanimationstartcapture?: AnimationEventHandler<Target> | undefined;
    onanimationend?: AnimationEventHandler<Target> | undefined;
    onanimationendcapture?: AnimationEventHandler<Target> | undefined;
    onanimationiteration?: AnimationEventHandler<Target> | undefined;
    onanimationiterationcapture?: AnimationEventHandler<Target> | undefined;

    // Transition Events
    ontransitioncancel?: TransitionEventHandler<Target>;
    ontransitioncancelcapture?: TransitionEventHandler<Target>;
    ontransitionend?: TransitionEventHandler<Target>;
    ontransitionendcapture?: TransitionEventHandler<Target>;
    ontransitionrun?: TransitionEventHandler<Target>;
    ontransitionruncapture?: TransitionEventHandler<Target>;
    ontransitionstart?: TransitionEventHandler<Target>;
    ontransitionstartcapture?: TransitionEventHandler<Target>;

    // PictureInPicture Events
    onenterpictureinpicture?: PictureInPictureEventHandler<Target>;
    onenterpictureinpicturecapture?: PictureInPictureEventHandler<Target>;
    onleavepictureinpicture?: PictureInPictureEventHandler<Target>;
    onleavepictureinpicturecapture?: PictureInPictureEventHandler<Target>;
    onresize?: PictureInPictureEventHandler<Target>;
    onresizecapture?: PictureInPictureEventHandler<Target>;

    oncommand?: CommandEventHandler<Target>;
  }

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  export interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    "aria-activedescendant"?: string | undefined;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    "aria-atomic"?: Booleanish | undefined;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
    /**
     * Defines a string value that labels the current element, which is intended to be converted into Braille.
     * @see aria-label.
     */
    "aria-braillelabel"?: string | undefined;
    /**
     * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
     * @see aria-roledescription.
     */
    "aria-brailleroledescription"?: string | undefined;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    "aria-busy"?: Booleanish | undefined;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed
     * @see aria-selected.
     */
    "aria-checked"?: Booleanish | "mixed" | undefined;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    "aria-colcount"?: number | undefined;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount
     * @see aria-colspan.
     */
    "aria-colindex"?: number | undefined;
    /**
     * Defines a human readable text alternative of aria-colindex.
     * @see aria-rowindextext.
     */
    "aria-colindextext"?: string | undefined;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex
     * @see aria-rowspan.
     */
    "aria-colspan"?: number | undefined;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    "aria-controls"?: string | undefined;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    "aria-current"?:
      | Booleanish
      | "page"
      | "step"
      | "location"
      | "date"
      | "time"
      | undefined;
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    "aria-describedby"?: string | undefined;
    /**
     * Defines a string value that describes or annotates the current element.
     * @see related aria-describedby.
     */
    "aria-description"?: string | undefined;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    "aria-details"?: string | undefined;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden
     * @see aria-readonly.
     */
    "aria-disabled"?: Booleanish | undefined;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    "aria-dropeffect"?:
      | "none"
      | "copy"
      | "execute"
      | "link"
      | "move"
      | "popup"
      | undefined;
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid
     * @see aria-describedby.
     */
    "aria-errormessage"?: string | undefined;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    "aria-expanded"?: Booleanish | undefined;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    "aria-flowto"?: string | undefined;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    "aria-grabbed"?: Booleanish | undefined;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    "aria-haspopup"?:
      | Booleanish
      | "menu"
      | "listbox"
      | "tree"
      | "grid"
      | "dialog"
      | undefined;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    "aria-hidden"?: Booleanish | undefined;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    "aria-keyshortcuts"?: string | undefined;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    "aria-label"?: string | undefined;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    "aria-labelledby"?: string | undefined;
    /** Defines the hierarchical level of an element within a structure. */
    "aria-level"?: number | undefined;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    "aria-live"?: "off" | "assertive" | "polite" | undefined;
    /** Indicates whether an element is modal when displayed. */
    "aria-modal"?: Booleanish | undefined;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    "aria-multiline"?: Booleanish | undefined;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    "aria-multiselectable"?: Booleanish | undefined;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    "aria-orientation"?: "horizontal" | "vertical" | undefined;
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    "aria-owns"?: string | undefined;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    "aria-placeholder"?: string | undefined;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    "aria-posinset"?: number | undefined;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked
     * @see aria-selected.
     */
    "aria-pressed"?: Booleanish | "mixed" | undefined;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    "aria-readonly"?: Booleanish | undefined;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    "aria-relevant"?:
      | "additions"
      | "additions removals"
      | "additions text"
      | "all"
      | "removals"
      | "removals additions"
      | "removals text"
      | "text"
      | "text additions"
      | "text removals"
      | undefined;
    /** Indicates that user input is required on the element before a form may be submitted. */
    "aria-required"?: Booleanish | undefined;
    /** Defines a human-readable, author-localized description for the role of an element. */
    "aria-roledescription"?: string | undefined;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    "aria-rowcount"?: number | undefined;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount
     * @see aria-rowspan.
     */
    "aria-rowindex"?: number | undefined;
    /**
     * Defines a human readable text alternative of aria-rowindex.
     * @see aria-colindextext.
     */
    "aria-rowindextext"?: string | undefined;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex
     * @see aria-colspan.
     */
    "aria-rowspan"?: number | undefined;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked
     * @see aria-pressed.
     */
    "aria-selected"?: Booleanish | undefined;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    "aria-setsize"?: number | undefined;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
    /** Defines the maximum allowed value for a range widget. */
    "aria-valuemax"?: number | undefined;
    /** Defines the minimum allowed value for a range widget. */
    "aria-valuemin"?: number | undefined;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    "aria-valuenow"?: number | undefined;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    "aria-valuetext"?: string | undefined;
  }

  // All the WAI-ARIA 1.2 role attribute values from https://www.w3.org/TR/wai-aria-1.2/#role_definitions
  export type WAIAriaRole =
    | "alert"
    | "alertdialog"
    | "application"
    | "article"
    | "banner"
    | "blockquote"
    | "button"
    | "caption"
    | "cell"
    | "checkbox"
    | "code"
    | "columnheader"
    | "combobox"
    | "command"
    | "complementary"
    | "composite"
    | "contentinfo"
    | "definition"
    | "deletion"
    | "dialog"
    | "directory"
    | "document"
    | "emphasis"
    | "feed"
    | "figure"
    | "form"
    | "grid"
    | "gridcell"
    | "group"
    | "heading"
    | "img"
    | "input"
    | "insertion"
    | "landmark"
    | "link"
    | "list"
    | "listbox"
    | "listitem"
    | "log"
    | "main"
    | "marquee"
    | "math"
    | "meter"
    | "menu"
    | "menubar"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "navigation"
    | "none"
    | "note"
    | "option"
    | "paragraph"
    | "presentation"
    | "progressbar"
    | "radio"
    | "radiogroup"
    | "range"
    | "region"
    | "roletype"
    | "row"
    | "rowgroup"
    | "rowheader"
    | "scrollbar"
    | "search"
    | "searchbox"
    | "section"
    | "sectionhead"
    | "select"
    | "separator"
    | "slider"
    | "spinbutton"
    | "status"
    | "strong"
    | "structure"
    | "subscript"
    | "superscript"
    | "switch"
    | "tab"
    | "table"
    | "tablist"
    | "tabpanel"
    | "term"
    | "textbox"
    | "time"
    | "timer"
    | "toolbar"
    | "tooltip"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "widget"
    | "window"
    | "none presentation";

  // All the Digital Publishing WAI-ARIA 1.0 role attribute values from https://www.w3.org/TR/dpub-aria-1.0/#role_definitions
  export type DPubAriaRole =
    | "doc-abstract"
    | "doc-acknowledgments"
    | "doc-afterword"
    | "doc-appendix"
    | "doc-backlink"
    | "doc-biblioentry"
    | "doc-bibliography"
    | "doc-biblioref"
    | "doc-chapter"
    | "doc-colophon"
    | "doc-conclusion"
    | "doc-cover"
    | "doc-credit"
    | "doc-credits"
    | "doc-dedication"
    | "doc-endnote"
    | "doc-endnotes"
    | "doc-epigraph"
    | "doc-epilogue"
    | "doc-errata"
    | "doc-example"
    | "doc-footnote"
    | "doc-foreword"
    | "doc-glossary"
    | "doc-glossref"
    | "doc-index"
    | "doc-introduction"
    | "doc-noteref"
    | "doc-notice"
    | "doc-pagebreak"
    | "doc-pagelist"
    | "doc-part"
    | "doc-preface"
    | "doc-prologue"
    | "doc-pullquote"
    | "doc-qna"
    | "doc-subtitle"
    | "doc-tip"
    | "doc-toc";

  export type AriaRole = WAIAriaRole | DPubAriaRole;

  export interface AllHTMLAttributes<RefType extends EventTarget = EventTarget>
    extends Attributes, DOMAttributes<RefType>, AriaAttributes {
    // Standard HTML Attributes
    accept?: string | undefined;
    "accept-charset"?: string | undefined;
    accesskey?: string | undefined;
    action?: string | undefined;
    allow?: string | undefined;
    allowfullscreen?: boolean | undefined;
    allowtransparency?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?: string | undefined;
    autocorrect?: string | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: boolean | string | undefined;
    cellpadding?: number | string | undefined;
    cellspacing?: number | string | undefined;
    charset?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    class?: string | undefined;
    cols?: number | undefined;
    colspan?: number | undefined;
    content?: string | undefined;
    contenteditable?:
      | Booleanish
      | ""
      | "plaintext-only"
      | "inherit"
      | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
    contextmenu?: string | undefined;
    controls?: boolean | undefined;
    controlslist?: string | undefined;
    coords?: string | undefined;
    crossorigin?: string | undefined;
    currenttime?: number | undefined;
    data?: string | undefined;
    datetime?: string | undefined;
    default?: boolean | undefined;
    defaultchecked?: boolean | undefined;
    defaultmuted?: boolean | undefined;
    defaultplaybackrate?: number | undefined;
    defaultvalue?: string | undefined;
    defer?: boolean | undefined;
    dir?: "auto" | "rtl" | "ltr" | undefined;
    disabled?: boolean | undefined;
    disableremoteplayback?: boolean | undefined;
    // deno-lint-ignore no-explicit-any
    download?: any | undefined;
    decoding?: "sync" | "async" | "auto" | undefined;
    draggable?: boolean | undefined;
    enctype?: string | undefined;
    enterkeyhint?:
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send"
      | undefined;
    elementtiming?: string | undefined;
    exportparts?: string | undefined;
    for?: string | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formenctype?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    frameborder?: number | string | undefined;
    headers?: string | undefined;
    height?: number | string | undefined;
    hidden?: boolean | "hidden" | "until-found" | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    "http-equiv"?: string | undefined;
    icon?: string | undefined;
    id?: string | undefined;
    indeterminate?: boolean | undefined;
    inert?: boolean | undefined;
    inputmode?: string | undefined;
    integrity?: string | undefined;
    is?: string | undefined;
    keyoarams?: string | undefined;
    keytype?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    lang?: string | undefined;
    list?: string | undefined;
    loading?: "eager" | "lazy" | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginheight?: number | undefined;
    marginwidth?: number | undefined;
    max?: number | string | undefined;
    maxlength?: number | undefined;
    media?: string | undefined;
    mediagroup?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    minlength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nomodule?: boolean | undefined;
    nonce?: string | undefined;
    novalidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: number | undefined;
    part?: string | undefined;
    pattern?: string | undefined;
    ping?: string | undefined;
    placeholder?: string | undefined;
    playsinline?: boolean | undefined;
    playbackrate?: number | undefined;
    popover?: "auto" | "hint" | "manual" | boolean | undefined;
    popovertarget?: string | undefined;
    popovertargetaction?: "hide" | "show" | "toggle" | undefined;
    poster?: string | undefined;
    preload?: "auto" | "metadata" | "none" | undefined;
    preservesoitch?: boolean | undefined;
    radiogroup?: string | undefined;
    readonly?: boolean | undefined;
    referrerpolicy?:
      | "no-referrer"
      | "no-referrer-when-downgrade"
      | "origin"
      | "origin-when-cross-origin"
      | "same-origin"
      | "strict-origin"
      | "strict-origin-when-cross-origin"
      | "unsafe-url"
      | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    role?: AriaRole | undefined;
    rows?: number | undefined;
    rowspan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: number | undefined;
    sizes?: string | undefined;
    slot?: string | undefined;
    span?: number | undefined;
    spellcheck?: boolean | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    srclang?: string | undefined;
    srcset?: string | undefined;
    srcobject?: MediaStream | MediaSource | Blob | File | null;
    start?: number | undefined;
    step?: number | string | undefined;
    style?: string | CSSProperties | undefined;
    summary?: string | undefined;
    tabindex?: number | undefined;
    target?: string | undefined;
    title?: string | undefined;
    type?: string | undefined;
    usemap?: string | undefined;
    value?: string | string[] | number | undefined;
    volume?: string | number | undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;

    // Non-standard Attributes
    autocapitalize?:
      | "off"
      | "none"
      | "on"
      | "sentences"
      | "words"
      | "characters"
      | undefined;
    disablepictureinpicture?: boolean | undefined;
    results?: number | undefined;
    translate?: boolean | undefined;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    // deno-lint-ignore no-explicit-any
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Microdata Attributes
    itemprop?: string | undefined;
    itemscope?: boolean | undefined;
    itemtype?: string | undefined;
    itemid?: string | undefined;
    itemref?: string | undefined;
  }

  interface HTMLAttributes<RefType extends EventTarget = EventTarget>
    extends Attributes, DOMAttributes<RefType>, AriaAttributes {
    // Standard HTML Attributes
    accesskey?: string | undefined;
    autocapitalize?:
      | "off"
      | "none"
      | "on"
      | "sentences"
      | "words"
      | "characters"
      | undefined;
    autocorrect?: string | undefined;
    autofocus?: boolean | undefined;
    class?: string | undefined;
    contenteditable?:
      | Booleanish
      | ""
      | "plaintext-only"
      | "inherit"
      | undefined;
    dir?: "auto" | "rtl" | "ltr" | undefined;
    draggable?: boolean | undefined;
    enterkeyhint?:
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send"
      | undefined;
    exportparts?: string | undefined;
    hidden?: boolean | "hidden" | "until-found" | undefined;
    id?: string | undefined;
    inert?: boolean | undefined;
    inputmode?: string | undefined;
    is?: string | undefined;
    lang?: string | undefined;
    nonce?: string | undefined;
    part?: string | undefined;
    popover?: "auto" | "hint" | "manual" | boolean | undefined;
    slot?: string | undefined;
    spellcheck?: boolean | undefined;
    style?: string | CSSProperties | undefined;
    tabindex?: number | undefined;
    title?: string | undefined;
    translate?: boolean | undefined;

    // WAI-ARIA Attributes
    role?: AriaRole | undefined;

    // Non-standard Attributes
    disablepictureinpicture?: boolean | undefined;
    elementtiming?: string | undefined;
    results?: number | undefined;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    // deno-lint-ignore no-explicit-any
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Microdata Attributes
    itemid?: string | undefined;
    itemprop?: string | undefined;
    itemref?: string | undefined;
    itemscope?: boolean | undefined;
    itemtype?: string | undefined;
  }

  type HTMLAttributeReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";

  type HTMLAttributeAnchorTarget =
    | "_self"
    | "_blank"
    | "_parent"
    | "_top"
    // deno-lint-ignore ban-types
    | (string & {});

  interface AnchorHTMLAttributes<T extends EventTarget = HTMLAnchorElement>
    extends HTMLAttributes<T> {
    // deno-lint-ignore no-explicit-any
    download?: any;
    href?: string | undefined;
    hreflang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
  }

  interface AreaHTMLAttributes<T extends EventTarget = HTMLAreaElement>
    extends HTMLAttributes<T> {
    alt?: string | undefined;
    coords?: string | undefined;
    // deno-lint-ignore no-explicit-any
    download?: any;
    href?: string | undefined;
    hreflang?: string | undefined;
    media?: string | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    shape?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
  }

  interface AudioHTMLAttributes<T extends EventTarget = HTMLAudioElement>
    extends MediaHTMLAttributes<T> {}

  interface BaseHTMLAttributes<T extends EventTarget = HTMLBaseElement>
    extends HTMLAttributes<T> {
    href?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
  }

  interface BlockquoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
    extends HTMLAttributes<T> {
    cite?: string | undefined;
  }

  interface ButtonHTMLAttributes<T extends EventTarget = HTMLButtonElement>
    extends HTMLAttributes<T> {
    command?: string | undefined;
    commandfor?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formenctype?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    name?: string | undefined;
    popovertarget?: string | undefined;
    popovertargetaction?: "hide" | "show" | "toggle" | undefined;
    type?: "submit" | "reset" | "button" | undefined;
    value?: string | number | undefined;
  }

  interface CanvasHTMLAttributes<T extends EventTarget = HTMLCanvasElement>
    extends HTMLAttributes<T> {
    height?: number | string | undefined;
    width?: number | string | undefined;
  }

  interface ColHTMLAttributes<T extends EventTarget = HTMLTableColElement>
    extends HTMLAttributes<T> {
    span?: number | undefined;
    width?: number | string | undefined;
  }

  interface ColgroupHTMLAttributes<T extends EventTarget = HTMLTableColElement>
    extends HTMLAttributes<T> {
    span?: number | undefined;
  }

  interface DataHTMLAttributes<T extends EventTarget = HTMLDataElement>
    extends HTMLAttributes<T> {
    value?: string | number | undefined;
  }

  interface DelHTMLAttributes<T extends EventTarget = HTMLModElement>
    extends HTMLAttributes<T> {
    cite?: string | undefined;
    datetime?: string | undefined;
  }

  interface DetailsHTMLAttributes<T extends EventTarget = HTMLDetailsElement>
    extends HTMLAttributes<T> {
    open?: boolean | undefined;
  }

  interface DialogHTMLAttributes<T extends EventTarget = HTMLDialogElement>
    extends HTMLAttributes<T> {
    onCancel?: GenericEventHandler<T> | undefined;
    onClose?: GenericEventHandler<T> | undefined;
    open?: boolean | undefined;
    closedby?: "none" | "closerequest" | "any" | undefined;
  }

  interface EmbedHTMLAttributes<T extends EventTarget = HTMLEmbedElement>
    extends HTMLAttributes<T> {
    height?: number | string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
  }

  interface FieldsetHTMLAttributes<T extends EventTarget = HTMLFieldSetElement>
    extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }

  interface FormHTMLAttributes<T extends EventTarget = HTMLFormElement>
    extends HTMLAttributes<T> {
    "accept-charset"?: string | undefined;
    action?: string | undefined;
    autocomplete?: string | undefined;
    enctype?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    novalidate?: boolean | undefined;
    rel?: string | undefined;
    target?: string | undefined;
  }

  interface IframeHTMLAttributes<T extends EventTarget = HTMLIFrameElement>
    extends HTMLAttributes<T> {
    allow?: string | undefined;
    allowfullscreen?: boolean | undefined;
    allowtransparency?: boolean | undefined;
    /** @deprecated */
    frameborder?: number | string | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;
    marginheight?: number | undefined;
    marginwidth?: number | undefined;
    name?: string | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    sandbox?: string | undefined;
    /** @deprecated */
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    width?: number | string | undefined;
  }

  type HTMLAttributeCrossOrigin = "anonymous" | "use-credentials";

  interface ImgHTMLAttributes<T extends EventTarget = HTMLImageElement>
    extends HTMLAttributes<T> {
    alt?: string | undefined;
    crossorigin?: HTMLAttributeCrossOrigin;
    decoding?: "async" | "auto" | "sync" | undefined;
    fetchpriority?: "high" | "auto" | "low" | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcset?: string | undefined;
    usemap?: string | undefined;
    width?: number | string | undefined;
  }

  type HTMLInputTypeAttribute =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    // deno-lint-ignore ban-types
    | (string & {});

  interface InputHTMLAttributes<T extends EventTarget = HTMLInputElement>
    extends HTMLAttributes<T> {
    accept?: string | undefined;
    alt?: string | undefined;
    autocomplete?: string | undefined;
    capture?: "user" | "environment" | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean | undefined;
    defaultchecked?: boolean | undefined;
    defaultvalue?: string | number | undefined;
    disabled?: boolean | undefined;
    enterkeyhint?:
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send"
      | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formenctype?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    height?: number | string | undefined;
    indeterminate?: boolean | undefined;
    list?: string | undefined;
    max?: number | string | undefined;
    maxlength?: number | undefined;
    min?: number | string | undefined;
    minlength?: number | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readonly?: boolean | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | number | undefined;
    width?: number | string | undefined;
    onChange?: GenericEventHandler<T> | undefined;
  }

  interface InsHTMLAttributes<T extends EventTarget = HTMLModElement>
    extends HTMLAttributes<T> {
    cite?: string | undefined;
    datetime?: string | undefined;
  }

  interface KeygenHTMLAttributes<T extends EventTarget = HTMLUnknownElement>
    extends HTMLAttributes<T> {
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keytype?: string | undefined;
    keyparams?: string | undefined;
    name?: string | undefined;
  }

  interface LabelHTMLAttributes<T extends EventTarget = HTMLLabelElement>
    extends HTMLAttributes<T> {
    for?: string | undefined;
    form?: string | undefined;
  }

  interface LiHTMLAttributes<T extends EventTarget = HTMLLIElement>
    extends HTMLAttributes<T> {
    value?: string | number | undefined;
  }

  interface LinkHTMLAttributes<T extends EventTarget = HTMLLinkElement>
    extends HTMLAttributes<T> {
    as?: string | undefined;
    crossorigin?: HTMLAttributeCrossOrigin;
    fetchpriority?: "high" | "low" | "auto" | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imagesrcset?: string | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charset?: string | undefined;
  }

  interface MapHTMLAttributes<T extends EventTarget = HTMLMapElement>
    extends HTMLAttributes<T> {
    name?: string | undefined;
  }

  interface MarqueeHTMLAttributes<T extends EventTarget = HTMLMarqueeElement>
    extends HTMLAttributes<T> {
    behavior?: "scroll" | "slide" | "alternate" | undefined;
    bgcolor?: string | undefined;
    direction?: "left" | "right" | "up" | "down" | undefined;
    height?: number | string | undefined;
    hspace?: number | string | undefined;
    loop?: number | string | undefined;
    scrollamount?: number | string | undefined;
    scrolldelay?: number | string | undefined;
    truespeed?: boolean | undefined;
    vspace?: number | string | undefined;
    width?: number | string | undefined;
  }

  interface MediaHTMLAttributes<T extends EventTarget = HTMLMediaElement>
    extends HTMLAttributes<T> {
    autoplay?: boolean | undefined;
    controls?: boolean | undefined;
    controlslist?: string | undefined;
    crossorigin?: HTMLAttributeCrossOrigin;
    currenttime?: number | undefined;
    defaultmuted?: boolean | undefined;
    defaultplaybackrate?: number | undefined;
    disableremoteplayback?: boolean | undefined;
    loop?: boolean | undefined;
    mediagroup?: string | undefined;
    muted?: boolean | undefined;
    playbackrate?: number | undefined;
    preload?: "auto" | "metadata" | "none" | undefined;
    preservespitch?: boolean | undefined;
    src?: string | undefined;
    srcobject?: MediaStream | MediaSource | Blob | File | null;
    volume?: string | number | undefined;
  }

  interface MenuHTMLAttributes<T extends EventTarget = HTMLMenuElement>
    extends HTMLAttributes<T> {
    type?: string | undefined;
  }

  interface MetaHTMLAttributes<T extends EventTarget = HTMLMetaElement>
    extends HTMLAttributes<T> {
    charset?: string | undefined;
    content?: string | undefined;
    "http-equiv"?: string | undefined;
    name?: string | undefined;
    media?: string | undefined;
  }

  interface MeterHTMLAttributes<T extends EventTarget = HTMLMeterElement>
    extends HTMLAttributes<T> {
    form?: string | undefined;
    high?: number | undefined;
    low?: number | undefined;
    max?: number | string | undefined;
    min?: number | string | undefined;
    optimum?: number | undefined;
    value?: string | number | undefined;
  }

  interface ObjectHTMLAttributes<T extends EventTarget = HTMLObjectElement>
    extends HTMLAttributes<T> {
    classid?: string | undefined;
    data?: string | undefined;
    form?: string | undefined;
    height?: number | string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    usemap?: string | undefined;
    useMap?: string | undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
  }

  interface OlHTMLAttributes<T extends EventTarget = HTMLOListElement>
    extends HTMLAttributes<T> {
    reversed?: boolean | undefined;
    start?: number | undefined;
    type?: "1" | "a" | "A" | "i" | "I" | undefined;
  }

  interface OptgroupHTMLAttributes<T extends EventTarget = HTMLOptGroupElement>
    extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
  }

  interface OptionHTMLAttributes<T extends EventTarget = HTMLOptionElement>
    extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string | number | undefined;
  }

  interface OutputHTMLAttributes<T extends EventTarget = HTMLOutputElement>
    extends HTMLAttributes<T> {
    for?: string | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }

  interface ParamHTMLAttributes<T extends EventTarget = HTMLParamElement>
    extends HTMLAttributes<T> {
    name?: string | undefined;
    value?: string | number | undefined;
  }

  interface ProgressHTMLAttributes<T extends EventTarget = HTMLProgressElement>
    extends HTMLAttributes<T> {
    max?: number | string | undefined;
    value?: string | number | undefined;
  }

  interface QuoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
    extends HTMLAttributes<T> {
    cite?: string | undefined;
  }

  interface ScriptHTMLAttributes<T extends EventTarget = HTMLScriptElement>
    extends HTMLAttributes<T> {
    async?: boolean | undefined;
    /** @deprecated */
    charset?: string | undefined;
    crossorigin?: HTMLAttributeCrossOrigin;
    defer?: boolean | undefined;
    integrity?: string | undefined;
    nomodule?: boolean | undefined;
    referrerpolicy?: HTMLAttributeReferrerPolicy | undefined;
    src?: string | undefined;
    type?: string | undefined;
  }

  interface SelectHTMLAttributes<T extends EventTarget = HTMLSelectElement>
    extends HTMLAttributes<T> {
    autocomplete?: string | undefined;
    defaultvalue?: string | number | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    value?: string | number | undefined;
    onChange?: GenericEventHandler<T> | undefined;
  }

  interface SlotHTMLAttributes<T extends EventTarget = HTMLSlotElement>
    extends HTMLAttributes<T> {
    name?: string | undefined;
  }

  interface SourceHTMLAttributes<T extends EventTarget = HTMLSourceElement>
    extends HTMLAttributes<T> {
    height?: number | string | undefined;
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcset?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
  }

  interface StyleHTMLAttributes<T extends EventTarget = HTMLStyleElement>
    extends HTMLAttributes<T> {
    media?: string | undefined;
    scoped?: boolean | undefined;
    type?: string | undefined;
  }

  interface TableHTMLAttributes<T extends EventTarget = HTMLTableElement>
    extends HTMLAttributes<T> {
    cellpadding?: string | undefined;
    cellspacing?: string | undefined;
    summary?: string | undefined;
    width?: number | string | undefined;
  }

  interface TdHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
    extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colspan?: number | undefined;
    headers?: string | undefined;
    rowspan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
    height?: number | string | undefined;
    width?: number | string | undefined;
    valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
  }

  interface TextareaHTMLAttributes<T extends EventTarget = HTMLTextAreaElement>
    extends HTMLAttributes<T> {
    autocomplete?: string | undefined;
    cols?: number | undefined;
    defaultvalue?: string | number | undefined;
    dirname?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    maxlength?: number | undefined;
    minlength?: number | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readonly?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | undefined;
    value?: string | number | undefined;
    wrap?: string | undefined;
    onChange?: GenericEventHandler<T> | undefined;
  }

  interface ThHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
    extends HTMLAttributes<T> {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colspan?: number | undefined;
    headers?: string | undefined;
    rowspan?: number | undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
  }

  interface TimeHTMLAttributes<T extends EventTarget = HTMLTimeElement>
    extends HTMLAttributes<T> {
    datetime?: string | undefined;
  }

  interface TrackHTMLAttributes<T extends EventTarget = HTMLTrackElement>
    extends MediaHTMLAttributes<T> {
    default?: boolean | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    srclang?: string | undefined;
  }

  interface VideoHTMLAttributes<T extends EventTarget = HTMLVideoElement>
    extends MediaHTMLAttributes<T> {
    disablepictureinpicture?: boolean | undefined;
    height?: number | string | undefined;
    playsinline?: boolean | undefined;
    poster?: string | undefined;
    width?: number | string | undefined;
  }

  export type DetailedHTMLProps<
    HA extends HTMLAttributes<RefType>,
    RefType extends EventTarget = EventTarget,
  > = HA;

  export interface MathMLAttributes<Target extends EventTarget = MathMLElement>
    extends HTMLAttributes<Target> {
    dir?: "ltr" | "rtl" | undefined;
    displaystyle?: boolean | undefined;
    /** @deprecated This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/href  */
    href?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathbackground */
    mathbackground?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathcolor */
    mathcolor?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathsize */
    mathsize?: string | undefined;
    nonce?: string | undefined;
    scriptlevel?: string | undefined;
  }

  export interface AnnotationMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    encoding?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
    src?: string | undefined;
  }

  export interface AnnotationXmlMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    encoding?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
    src?: string | undefined;
  }

  export interface MActionMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#actiontype */
    actiontype?: "statusline" | "toggle" | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#selection */
    selection?: string | undefined;
  }

  export interface MathMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    display?: "block" | "inline" | undefined;
  }

  export interface MEncloseMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    notation?: string | undefined;
  }

  export interface MErrorMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MFencedMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    close?: string | undefined;
    open?: string | undefined;
    separators?: string | undefined;
  }

  export interface MFracMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#denomalign */
    denomalign?: "center" | "left" | "right" | undefined;
    linethickness?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#numalign */
    numalign?: "center" | "left" | "right" | undefined;
  }

  export interface MiMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** The only value allowed in the current specification is normal (case insensitive)
     * See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi#mathvariant */
    mathvariant?:
      | "normal"
      | "bold"
      | "italic"
      | "bold-italic"
      | "double-struck"
      | "bold-fraktur"
      | "script"
      | "bold-script"
      | "fraktur"
      | "sans-serif"
      | "bold-sans-serif"
      | "sans-serif-italic"
      | "sans-serif-bold-italic"
      | "monospace"
      | "initial"
      | "tailed"
      | "looped"
      | "stretched"
      | undefined;
  }

  export interface MmultiScriptsMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#subscriptshift */
    subscriptshift?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#superscriptshift */
    superscriptshift?: string | undefined;
  }

  export interface MNMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MOMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo#accent */
    accent?: boolean | undefined;
    fence?: boolean | undefined;
    largeop?: boolean | undefined;
    lspace?: string | undefined;
    maxsize?: string | undefined;
    minsize?: string | undefined;
    movablelimits?: boolean | undefined;
    rspace?: string | undefined;
    separator?: boolean | undefined;
    stretchy?: boolean | undefined;
    symmetric?: boolean | undefined;
  }

  export interface MOverMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    accent?: boolean | undefined;
  }

  export interface MPaddedMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    depth?: string | undefined;
    height?: string | undefined;
    lspace?: string | undefined;
    voffset?: string | undefined;
    width?: string | undefined;
  }

  export interface MPhantomMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MPrescriptsMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MRootMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MRowMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MSMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
    lquote?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
    rquote?: string | undefined;
  }

  export interface MSpaceMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    depth?: string | undefined;
    height?: string | undefined;
    width?: string | undefined;
  }

  export interface MSqrtMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MStyleMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#background */
    background?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#color */
    color?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontsize */
    fontsize?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontstyle */
    fontstyle?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontweight */
    fontweight?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptminsize */
    scriptminsize?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptsizemultiplier */
    scriptsizemultiplier?: string | undefined;
  }

  export interface MSubMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub#subscriptshift */
    subscriptshift?: string | undefined;
  }

  export interface MSubsupMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#subscriptshift */
    subscriptshift?: string | undefined;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#superscriptshift */
    superscriptshift?: string | undefined;
  }

  export interface MSupMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup#superscriptshift */
    superscriptshift?: string | undefined;
  }

  export interface MTableMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#align */
    align?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnalign */
    columnalign?: "center" | "left" | "right" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnlines */
    columnlines?: "dashed" | "none" | "solid" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnspacing */
    columnspacing?: string | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#frame */
    frame?: "dashed" | "none" | "solid" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#framespacing */
    framespacing?: string | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowalign */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowlines */
    rowlines?: "dashed" | "none" | "solid" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowspacing */
    rowspacing?: string | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#width */
    width?: string | undefined;
  }

  export interface MTdMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    columnspan?: number | undefined;
    rowspan?: number | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#columnalign */
    columnalign?: "center" | "left" | "right" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#rowalign */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
  }

  export interface MTextMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface MTrMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#columnalign */
    columnalign?: "center" | "left" | "right" | undefined;
    /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#rowalign */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
  }

  export interface MUnderMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    accentunder?: boolean | undefined;
  }

  export interface MUnderoverMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {
    accent?: boolean | undefined;
    accentunder?: boolean | undefined;
  }

  export interface SemanticsMathMLAttributes<T extends EventTarget>
    extends MathMLAttributes<T> {}

  export interface IntrinsicSVGElements {
    svg: SVGAttributes<SVGSVGElement>;
    animate: SVGAttributes<SVGAnimateElement>;
    circle: SVGAttributes<SVGCircleElement>;
    animateMotion: SVGAttributes<SVGAnimateMotionElement>;
    animateTransform: SVGAttributes<SVGAnimateTransformElement>;
    clipPath: SVGAttributes<SVGClipPathElement>;
    defs: SVGAttributes<SVGDefsElement>;
    desc: SVGAttributes<SVGDescElement>;
    ellipse: SVGAttributes<SVGEllipseElement>;
    feBlend: SVGAttributes<SVGFEBlendElement>;
    feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>;
    feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>;
    feComposite: SVGAttributes<SVGFECompositeElement>;
    feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>;
    feDistantLight: SVGAttributes<SVGFEDistantLightElement>;
    feDropShadow: SVGAttributes<SVGFEDropShadowElement>;
    feFlood: SVGAttributes<SVGFEFloodElement>;
    feFuncA: SVGAttributes<SVGFEFuncAElement>;
    feFuncB: SVGAttributes<SVGFEFuncBElement>;
    feFuncG: SVGAttributes<SVGFEFuncGElement>;
    feFuncR: SVGAttributes<SVGFEFuncRElement>;
    feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>;
    feImage: SVGAttributes<SVGFEImageElement>;
    feMerge: SVGAttributes<SVGFEMergeElement>;
    feMergeNode: SVGAttributes<SVGFEMergeNodeElement>;
    feMorphology: SVGAttributes<SVGFEMorphologyElement>;
    feOffset: SVGAttributes<SVGFEOffsetElement>;
    fePointLight: SVGAttributes<SVGFEPointLightElement>;
    feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>;
    feSpotLight: SVGAttributes<SVGFESpotLightElement>;
    feTile: SVGAttributes<SVGFETileElement>;
    feTurbulence: SVGAttributes<SVGFETurbulenceElement>;
    filter: SVGAttributes<SVGFilterElement>;
    foreignObject: SVGAttributes<SVGForeignObjectElement>;
    g: SVGAttributes<SVGGElement>;
    image: SVGAttributes<SVGImageElement>;
    line: SVGAttributes<SVGLineElement>;
    linearGradient: SVGAttributes<SVGLinearGradientElement>;
    marker: SVGAttributes<SVGMarkerElement>;
    mask: SVGAttributes<SVGMaskElement>;
    metadata: SVGAttributes<SVGMetadataElement>;
    mpath: SVGAttributes<SVGMPathElement>;
    path: SVGAttributes<SVGPathElement>;
    pattern: SVGAttributes<SVGPatternElement>;
    polygon: SVGAttributes<SVGPolygonElement>;
    polyline: SVGAttributes<SVGPolylineElement>;
    radialGradient: SVGAttributes<SVGRadialGradientElement>;
    rect: SVGAttributes<SVGRectElement>;
    set: SVGAttributes<SVGSetElement>;
    stop: SVGAttributes<SVGStopElement>;
    switch: SVGAttributes<SVGSwitchElement>;
    symbol: SVGAttributes<SVGSymbolElement>;
    text: SVGAttributes<SVGTextElement>;
    textPath: SVGAttributes<SVGTextPathElement>;
    tspan: SVGAttributes<SVGTSpanElement>;
    use: SVGAttributes<SVGUseElement>;
    view: SVGAttributes<SVGViewElement>;
  }

  export interface IntrinsicMathMLElements {
    annotation: AnnotationMathMLAttributes<MathMLElement>;
    "annotation-xml": AnnotationXmlMathMLAttributes<MathMLElement>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction */
    maction: MActionMathMLAttributes<MathMLElement>;
    math: MathMathMLAttributes<MathMLElement>;
    /** This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose  */
    menclose: MEncloseMathMLAttributes<MathMLElement>;
    merror: MErrorMathMLAttributes<MathMLElement>;
    /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfenced */
    mfenced: MFencedMathMLAttributes<MathMLElement>;
    mfrac: MFracMathMLAttributes<MathMLElement>;
    mi: MiMathMLAttributes<MathMLElement>;
    mmultiscripts: MmultiScriptsMathMLAttributes<MathMLElement>;
    mn: MNMathMLAttributes<MathMLElement>;
    mo: MOMathMLAttributes<MathMLElement>;
    mover: MOverMathMLAttributes<MathMLElement>;
    mpadded: MPaddedMathMLAttributes<MathMLElement>;
    mphantom: MPhantomMathMLAttributes<MathMLElement>;
    mprescripts: MPrescriptsMathMLAttributes<MathMLElement>;
    mroot: MRootMathMLAttributes<MathMLElement>;
    mrow: MRowMathMLAttributes<MathMLElement>;
    ms: MSMathMLAttributes<MathMLElement>;
    mspace: MSpaceMathMLAttributes<MathMLElement>;
    msqrt: MSqrtMathMLAttributes<MathMLElement>;
    mstyle: MStyleMathMLAttributes<MathMLElement>;
    msub: MSubMathMLAttributes<MathMLElement>;
    msubsup: MSubsupMathMLAttributes<MathMLElement>;
    msup: MSupMathMLAttributes<MathMLElement>;
    mtable: MTableMathMLAttributes<MathMLElement>;
    mtd: MTdMathMLAttributes<MathMLElement>;
    mtext: MTextMathMLAttributes<MathMLElement>;
    mtr: MTrMathMLAttributes<MathMLElement>;
    munder: MUnderMathMLAttributes<MathMLElement>;
    munderover: MUnderMathMLAttributes<MathMLElement>;
    semantics: SemanticsMathMLAttributes<MathMLElement>;
  }

  export interface IntrinsicElements
    extends IntrinsicSVGElements, IntrinsicMathMLElements {
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: AreaHTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: AudioHTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: BaseHTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    big: HTMLAttributes<HTMLElement>;
    blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLTableCaptionElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: ColHTMLAttributes<HTMLTableColElement>;
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
    data: DataHTMLAttributes<HTMLDataElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: DelHTMLAttributes<HTMLModElement>;
    details: DetailsHTMLAttributes<HTMLDetailsElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: DialogHTMLAttributes<HTMLDialogElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: EmbedHTMLAttributes<HTMLEmbedElement>;
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: FormHTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HTMLAttributes<HTMLHRElement>;
    html: HTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;
    img: ImgHTMLAttributes<HTMLImageElement>;
    input: InputHTMLAttributes<HTMLInputElement>;
    ins: InsHTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    keygen: KeygenHTMLAttributes<HTMLUnknownElement>;
    label: LabelHTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: LiHTMLAttributes<HTMLLIElement>;
    link: LinkHTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: MapHTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    marquee: MarqueeHTMLAttributes<HTMLMarqueeElement>;
    menu: MenuHTMLAttributes<HTMLMenuElement>;
    menuitem: HTMLAttributes<HTMLUnknownElement>;
    meta: MetaHTMLAttributes<HTMLMetaElement>;
    meter: MeterHTMLAttributes<HTMLMeterElement>;
    nav: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: ObjectHTMLAttributes<HTMLObjectElement>;
    ol: OlHTMLAttributes<HTMLOListElement>;
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
    option: OptionHTMLAttributes<HTMLOptionElement>;
    output: OutputHTMLAttributes<HTMLOutputElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    param: ParamHTMLAttributes<HTMLParamElement>;
    picture: HTMLAttributes<HTMLPictureElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: ProgressHTMLAttributes<HTMLProgressElement>;
    q: QuoteHTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    script: ScriptHTMLAttributes<HTMLScriptElement>;
    search: HTMLAttributes<HTMLElement>;
    section: HTMLAttributes<HTMLElement>;
    select: SelectHTMLAttributes<HTMLSelectElement>;
    slot: SlotHTMLAttributes<HTMLSlotElement>;
    small: HTMLAttributes<HTMLElement>;
    source: SourceHTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: StyleHTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: TableHTMLAttributes<HTMLTableElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: TdHTMLAttributes<HTMLTableCellElement>;
    template: HTMLAttributes<HTMLTemplateElement>;
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: ThHTMLAttributes<HTMLTableCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: TimeHTMLAttributes<HTMLTimeElement>;
    title: HTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: TrackHTMLAttributes<HTMLTrackElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    var: HTMLAttributes<HTMLElement>;
    video: VideoHTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;
  }
}
