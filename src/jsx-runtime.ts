import type {
  Attributes,
  ComponentClass,
  ComponentType,
  EmptyObj,
  FunctionComponent,
  JSX,
  JsxNode,
  VNode as IVNode,
} from "./jsx.d.ts";
import { encodeEntities } from "./utils.ts";

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
    console.log("To string");
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

        s += ` ${encodeEntities(name)}="${encodeEntities(String(value))}"`;
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

function renderChild(child: JsxNode): string {
  if (
    child === null || child === undefined || child === false ||
    child === true
  ) {
    return "";
  } else if (
    typeof child === "string" || typeof child === "number" ||
    typeof child === "bigint"
  ) {
    return encodeEntities(String(child));
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
  props: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, unknown> & {
    children?: JsxNode;
  },
  key?: string,
): VNode;
export function createElement<P>(
  type: ComponentType<P>,
  props: Attributes & P & { children?: JsxNode },
  key?: string,
): VNode<P>;
export function createElement<P = EmptyObj>(
  type: string | ComponentType<P>,
  props: P,
  children?: JsxNode,
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
  props: JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, unknown> & {
    children?: JsxNode;
  },
  key?: string,
): VNode;
export function jsx<P>(
  type: ComponentType<P>,
  props: Attributes & P & { children?: JsxNode },
  key?: string,
): VNode<P>;
// deno-lint-ignore no-explicit-any
export function jsx<P extends Attributes = any>(
  type: string | ComponentType<P>,
  props: P,
  key: Attributes["key"],
): VNode<P> {
  return new VNode(type, props, key);
}

export const jsxs = jsx;

export function Fragment(props: Attributes): JsxNode {
  return props.children;
}

export function isValidElement(vnode: unknown): vnode is VNode {
  return vnode instanceof VNode && vnode.$$typeof === $$_TYPEOF;
}

export function Template(
  _props: { templates: TemplateStringsArray; exprs: JsxNode[] },
): JsxNode {
  return null;
}

export function jsxTemplate(
  templates: TemplateStringsArray,
  ...exprs: JsxNode[]
): VNode<{ templates: string[]; exprs: JsxNode[] }> {
  return new VNode(
    // deno-lint-ignore no-explicit-any
    Template as any,
    // deno-lint-ignore no-explicit-any
    { templates: templates as any, exprs },
    undefined,
  );
}
