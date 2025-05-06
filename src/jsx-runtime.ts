import type {
  Attributes,
  ComponentClass,
  ComponentType,
  FunctionComponent,
  JSXInternal,
  JSXNode,
  VNode as IVNode,
} from "./jsx.d.ts";
import { escape } from "@std/html";

export type { JSXInternal as JSX };

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

// deno-lint-ignore no-explicit-any
export class VNode<P = any> implements IVNode<P> {
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
    | JSXInternal.HTMLAttributes
      & JSXInternal.SVGAttributes
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
// deno-lint-ignore no-explicit-any
export function createElement<P = any>(
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
    | JSXInternal.HTMLAttributes
      & JSXInternal.SVGAttributes
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
