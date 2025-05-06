import type {
  Attributes,
  Component,
  ComponentClass,
  ComponentType,
  EmptyObj,
  FunctionComponent,
  JSXInternal,
  JSXNode,
  VNode as IVNode,
} from "./jsx.d.ts";
import { escape } from "@std/html";

declare namespace JSX {
  export type LibraryManagedAttributes<Component, Props> =
    JSXInternal.LibraryManagedAttributes<Component, Props>;

  export interface IntrinsicAttributes
    extends JSXInternal.IntrinsicAttributes {}

  // deno-lint-ignore no-explicit-any
  export type ElementType<P = any> = JSXInternal.ElementType<P>;

  export interface Element extends JSXInternal.Element {}
  export type ElementClass =
    // deno-lint-ignore no-explicit-any
    | Component<any>
    // deno-lint-ignore no-explicit-any
    | FunctionComponent<any>;

  export interface ElementAttributesProperty
    extends JSXInternal.ElementAttributesProperty {
  }

  export interface DOMCSSProperties extends JSXInternal.DOMCSSProperties {
  }
  export type AllCSSProperties = JSXInternal.AllCSSProperties;
  export interface CSSProperties extends JSXInternal.CSSProperties {
  }
  export interface SVGAttributes<Target extends EventTarget = SVGElement>
    extends JSXInternal.SVGAttributes<Target> {}
  export interface PathAttributes extends JSXInternal.PathAttributes {
  }

  export type TargetedEvent<
    Target extends EventTarget = EventTarget,
    TypedEvent extends Event = Event,
  > = JSXInternal.TargetedEvent<Target, TypedEvent>;

  export type TargetedAnimationEvent<Target extends EventTarget> =
    JSXInternal.TargetedAnimationEvent<Target>;
  export type TargetedClipboardEvent<Target extends EventTarget> =
    JSXInternal.TargetedClipboardEvent<Target>;
  export type TargetedCommandEvent<Target extends EventTarget> =
    JSXInternal.TargetedCommandEvent<
      Target
    >;
  export type TargetedCompositionEvent<Target extends EventTarget> =
    JSXInternal.TargetedCompositionEvent<Target>;
  export type TargetedDragEvent<Target extends EventTarget> =
    JSXInternal.TargetedDragEvent<
      Target
    >;
  export type TargetedFocusEvent<Target extends EventTarget> =
    JSXInternal.TargetedFocusEvent<
      Target
    >;
  export type TargetedInputEvent<Target extends EventTarget> =
    JSXInternal.TargetedInputEvent<
      Target
    >;
  export type TargetedKeyboardEvent<Target extends EventTarget> =
    JSXInternal.TargetedKeyboardEvent<
      Target
    >;
  export type TargetedMouseEvent<Target extends EventTarget> =
    JSXInternal.TargetedMouseEvent<
      Target
    >;
  export type TargetedPointerEvent<Target extends EventTarget> =
    JSXInternal.TargetedPointerEvent<
      Target
    >;
  export type TargetedSubmitEvent<Target extends EventTarget> =
    JSXInternal.TargetedSubmitEvent<
      Target
    >;
  export type TargetedTouchEvent<Target extends EventTarget> =
    JSXInternal.TargetedTouchEvent<
      Target
    >;
  export type TargetedToggleEvent<Target extends EventTarget> =
    JSXInternal.TargetedToggleEvent<
      Target
    >;
  export type TargetedTransitionEvent<Target extends EventTarget> =
    JSXInternal.TargetedTransitionEvent<Target>;
  export type TargetedUIEvent<Target extends EventTarget> =
    JSXInternal.TargetedUIEvent<
      Target
    >;
  export type TargetedWheelEvent<Target extends EventTarget> =
    JSXInternal.TargetedWheelEvent<
      Target
    >;
  export type TargetedPictureInPictureEvent<Target extends EventTarget> =
    JSXInternal.TargetedPictureInPictureEvent<Target>;

  export type EventHandler<E extends TargetedEvent> = JSXInternal.EventHandler<
    E
  >;

  export type AnimationEventHandler<Target extends EventTarget> =
    JSXInternal.AnimationEventHandler<Target>;
  export type ClipboardEventHandler<Target extends EventTarget> =
    JSXInternal.ClipboardEventHandler<Target>;
  export type CommandEventHandler<Target extends EventTarget> =
    JSXInternal.CommandEventHandler<Target>;
  export type CompositionEventHandler<Target extends EventTarget> =
    JSXInternal.CompositionEventHandler<Target>;
  export type DragEventHandler<Target extends EventTarget> =
    JSXInternal.DragEventHandler<Target>;
  export type ToggleEventHandler<Target extends EventTarget> =
    JSXInternal.ToggleEventHandler<Target>;
  export type FocusEventHandler<Target extends EventTarget> =
    JSXInternal.FocusEventHandler<Target>;
  export type GenericEventHandler<Target extends EventTarget> =
    JSXInternal.GenericEventHandler<Target>;
  export type InputEventHandler<Target extends EventTarget> =
    JSXInternal.InputEventHandler<Target>;
  export type KeyboardEventHandler<Target extends EventTarget> =
    JSXInternal.KeyboardEventHandler<Target>;
  export type MouseEventHandler<Target extends EventTarget> =
    JSXInternal.MouseEventHandler<Target>;
  export type PointerEventHandler<Target extends EventTarget> =
    JSXInternal.PointerEventHandler<Target>;
  export type SubmitEventHandler<Target extends EventTarget> =
    JSXInternal.SubmitEventHandler<Target>;
  export type TouchEventHandler<Target extends EventTarget> =
    JSXInternal.TouchEventHandler<Target>;
  export type TransitionEventHandler<Target extends EventTarget> =
    JSXInternal.TransitionEventHandler<Target>;
  export type UIEventHandler<Target extends EventTarget> =
    JSXInternal.UIEventHandler<Target>;
  export type WheelEventHandler<Target extends EventTarget> =
    JSXInternal.WheelEventHandler<Target>;
  export type PictureInPictureEventHandler<Target extends EventTarget> =
    JSXInternal.PictureInPictureEventHandler<Target>;

  export interface DOMAttributes<Target extends EventTarget>
    extends JSXInternal.DOMAttributes<Target> {}

  export interface AriaAttributes extends JSXInternal.AriaAttributes {}
  export type WAIAriaRole = JSXInternal.WAIAriaRole;
  export type DPubAriaRole = JSXInternal.DPubAriaRole;
  export type AriaRole = JSXInternal.AriaRole;

  export interface AllHTMLAttributes<RefType extends EventTarget = EventTarget>
    extends JSXInternal.AllHTMLAttributes<RefType> {}

  export interface HTMLAttributes<RefType extends EventTarget = EventTarget>
    extends JSXInternal.HTMLAttributes<RefType> {}

  export type HTMLAttributeReferrerPolicy =
    JSXInternal.HTMLAttributeReferrerPolicy;
  export type HTMLAttributeAnchorTarget = JSXInternal.HTMLAttributeAnchorTarget;

  export interface AnchorHTMLAttributes<
    T extends EventTarget = HTMLAnchorElement,
  > extends JSXInternal.AnchorHTMLAttributes<T> {
  }

  export interface AreaHTMLAttributes<T extends EventTarget = HTMLAreaElement>
    extends JSXInternal.AreaHTMLAttributes<T> {
  }

  export interface AudioHTMLAttributes<T extends EventTarget = HTMLAudioElement>
    extends JSXInternal.AudioHTMLAttributes<T> {
  }

  export interface BaseHTMLAttributes<T extends EventTarget = HTMLBaseElement>
    extends JSXInternal.BaseHTMLAttributes<T> {
  }

  export interface BlockquoteHTMLAttributes<
    T extends EventTarget = HTMLQuoteElement,
  > extends JSXInternal.BlockquoteHTMLAttributes<T> {
  }

  export interface ButtonHTMLAttributes<
    T extends EventTarget = HTMLButtonElement,
  > extends JSXInternal.ButtonHTMLAttributes<T> {
  }

  export interface CanvasHTMLAttributes<
    T extends EventTarget = HTMLCanvasElement,
  > extends JSXInternal.CanvasHTMLAttributes<T> {
  }

  export interface ColHTMLAttributes<
    T extends EventTarget = HTMLTableColElement,
  > extends JSXInternal.ColHTMLAttributes<T> {
  }

  export interface ColgroupHTMLAttributes<
    T extends EventTarget = HTMLTableColElement,
  > extends JSXInternal.ColgroupHTMLAttributes<T> {
  }

  export interface DataHTMLAttributes<
    T extends EventTarget = HTMLDataElement,
  > extends JSXInternal.DataHTMLAttributes<T> {
  }

  export interface DelHTMLAttributes<
    T extends EventTarget = HTMLModElement,
  > extends JSXInternal.DelHTMLAttributes<T> {
  }

  export interface IntrinsicElements extends JSXInternal.IntrinsicElements {}
}

const $$_TYPEOF = Symbol.for("deno.jsx");
const VOID_ELEMENTS = new Set<string>(
  [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ],
);

interface DangerousProps {
  dangerouslySetInnerHTML?: { __html: string };
}
function isDangerousProps(props: unknown): props is DangerousProps {
  return props !== null && typeof props === "object" &&
    "dangerouslySetInnerHTML" in props;
}

function isComponentClass<P>(type: unknown): type is ComponentClass<P> {
  return typeof type === "function" && "render" in type;
}

function isFunctionComponent<P>(type: unknown): type is FunctionComponent<P> {
  return typeof type === "function" && !("render" in type);
}

export class VNode<P = EmptyObj> implements IVNode<P> {
  $$typeof = $$_TYPEOF;

  constructor(
    public type: string | ComponentType<P>,
    public props: Attributes & P,
    public key: string | number | undefined,
  ) {}

  [Symbol.toPrimitive](): string {
    return this.#renderToString();
  }

  #renderToString(): string {
    const { type, props } = this;

    if (isComponentClass(type)) {
      const component = new type(props);
      const result = component.render();
      if (result === null) return "";
      return result[Symbol.toPrimitive]();
    } else if (isFunctionComponent(type)) {
      if (type === Template) {
        let s = ``;
        // deno-lint-ignore no-explicit-any
        const { exprs, templates } = props as any;
        for (let i = 0; i < templates.length; i++) {
          s += templates[i];

          if (i < exprs.length) {
            s += renderChild(exprs[i]);
          }
        }

        return s;
      }
      const result = type(props);
      if (result === null) return "";
      return result[Symbol.toPrimitive]();
    } else if (typeof type === "string") {
      let s = `<${this.type}`;

      // Attributes
      const keys = Object.keys(props);
      for (let i = 0; i < keys.length; i++) {
        const name = keys[i];
        if (name === "children") continue;

        // deno-lint-ignore no-explicit-any
        const value = (props as any)[name];

        if (
          value === null || value === undefined || typeof value === "function"
        ) {
          continue;
        }

        s += ` ${escape(name)}="${escape(String(value))}"`;
      }

      if (VOID_ELEMENTS.has(type)) {
        s += ">";
        return s;
      }

      if (isDangerousProps(props)) {
        const raw = props.dangerouslySetInnerHTML?.__html ?? "";
        return `${s}${raw}</${type}>`;
      }

      // Children
      if ("children" in props) {
        // deno-lint-ignore no-explicit-any
        const children = props.children as any;
        s += renderChild(children);
      }

      return `${s}</${type}>`;
    }

    return "";
  }
}

function renderChild(child: JSXNode): string {
  if (
    child === null || child === undefined || child === false ||
    child === true
  ) {
    return "";
  } else if (
    typeof child === "string" || typeof child === "number" ||
    typeof child === "bigint"
  ) {
    return escape(String(child));
  } else if (Array.isArray(child)) {
    let s = "";
    for (let i = 0; i < child.length; i++) {
      const result = renderChild(child[i]);
      s += result;
    }
    return s;
  } else if (isValidElement(child)) {
    return child[Symbol.toPrimitive]();
  }

  throw new Error(`Trying to inject invalid JSX child: ${child}`);
}

export function createElement(
  type: string,
  props:
    | null
    | JSX.HTMLAttributes
      & JSX.SVGAttributes
      & Record<string, unknown>
      & {
        children?: JSXNode;
      },
  key?: string,
): VNode;
export function createElement<P>(
  type: ComponentType<P>,
  props: null | Attributes & P & { children?: JSXNode },
  key?: string,
): VNode<P>;
export function createElement<P = EmptyObj>(
  type: string | ComponentType<P>,
  props: null | P,
  children?: JSXNode,
): VNode<P> {
  const normalizedProps: Record<string, unknown> = {};
  let key: string | undefined;
  for (const name in props) {
    if (name == "key") {
      key = String(props[name]);
    } else if (name == "ref") {
      continue;
    } else {
      normalizedProps[name] = props[name];
    }
  }

  if (arguments.length > 2) {
    normalizedProps.children = arguments.length > 3
      ? Array.prototype.slice.call(arguments, 2)
      : children;
  }

  return new VNode(type, normalizedProps as unknown as Attributes & P, key);
}

export function jsx(
  type: string,
  props:
    | null
    | JSX.HTMLAttributes
      & JSX.SVGAttributes
      & Record<string, unknown>
      & {
        children?: JSXNode;
      },
  key?: string,
): VNode;
export function jsx<P>(
  type: ComponentType<P>,
  props: null | Attributes & P & { children?: JSXNode },
  key?: string,
): VNode<P>;
// deno-lint-ignore no-explicit-any
export function jsx<P extends Attributes = any>(
  type: string | ComponentType<P>,
  props: null | P,
  key: Attributes["key"],
): VNode<P> {
  return new VNode(type, props ?? {} as P, key);
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export function Fragment(props: Attributes): JSXNode {
  return props.children;
}

export function isValidElement(vnode: unknown): vnode is VNode {
  return vnode instanceof VNode && vnode.$$typeof === $$_TYPEOF;
}

export function Template(
  _props: { templates: TemplateStringsArray; exprs: JSXNode[] },
): JSXNode {
  return null;
}

export function jsxTemplate(
  templates: TemplateStringsArray,
  ...exprs: JSXNode[]
): VNode<{ templates: string[]; exprs: JSXNode[] }> {
  return new VNode(
    // deno-lint-ignore no-explicit-any
    Template as any,
    // deno-lint-ignore no-explicit-any
    { templates: templates as any, exprs },
    undefined,
  );
}

export function jsxAttr(name: string, value: unknown): string {
  if (
    name === "key" ||
    value == null ||
    value === false ||
    typeof value === "function" ||
    typeof value === "object"
  ) {
    return "";
  }

  if (value === true) return name;

  return `${escape(name)}="${escape(String(value))}"`;
}

export function jsxEscape(
  value: unknown,
): string | null | VNode | Array<string | null | VNode> {
  if (
    value == null ||
    typeof value === "boolean" ||
    typeof value === "function"
  ) {
    return null;
  }

  if (typeof value === "object") {
    if (isValidElement(value)) return value;

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        value[i] = jsxEscape(value[i]);
      }
      return value;
    }
  }

  return escape(String(value));
}
