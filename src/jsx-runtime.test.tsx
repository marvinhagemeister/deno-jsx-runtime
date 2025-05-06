import {
  createElement,
  Fragment,
  jsx,
  jsxAttr,
  jsxEscape,
  jsxTemplate,
} from "./jsx-runtime.ts";
import { expect } from "@std/expect";

// Type checking
function Foo() {
  return <div />;
}

const _typeCheckComponent = (
  <Foo>
    <div class="foo">asd</div>
  </Foo>
);

Deno.test("createElement - null props", () => {
  let vnode = createElement("div", null);
  expect(vnode.type).toEqual("div");
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);

  const comp = () => null;
  vnode = createElement(comp, null);
  expect(vnode.type).toEqual(comp);
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);
});

Deno.test("createElement - html props", () => {
  const vnode = createElement("input", {
    key: "key",
    class: "foo",
    required: true,
    "alignment-baseline": undefined,
  });
  expect(vnode.type).toEqual("input");
  expect(vnode.props).toEqual({
    class: "foo",
    required: true,
    "alignment-baseline": undefined,
  });
  expect(vnode.key).toEqual("key");
});

Deno.test("jsx", () => {
  let vnode = jsx("div", null, undefined);
  expect(vnode.type).toEqual("div");
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);

  const comp = () => null;
  vnode = jsx(comp, null);
  expect(vnode.type).toEqual(comp);
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);
});

Deno.test("jsx - html props", () => {
  const vnode = jsx("input", {
    class: "foo",
    required: true,
    "alignment-baseline": undefined,
  }, "key");
  expect(vnode.type).toEqual("input");
  expect(vnode.props).toEqual({
    class: "foo",
    required: true,
    "alignment-baseline": undefined,
  });
  expect(vnode.key).toEqual("key");
});

Deno.test("jsxTemplate", () => {
  const vnode = jsxTemplate`<div>hello</div>`;
  expect(String(vnode)).toEqual("<div>hello</div>");
});

Deno.test("jsxEscape", () => {
  expect(jsxEscape("&><'\"")).toEqual("&amp;&gt;&lt;&#39;&quot;");
});

Deno.test("jsxAttr", () => {
  expect(jsxAttr("&><'\"", "&><'\"")).toEqual(
    '&amp;&gt;&lt;&#39;&quot;="&amp;&gt;&lt;&#39;&quot;"',
  );
});

Deno.test("render - ignore key", () => {
  expect(String(<div key="foo" />)).toEqual(
    "<div></div>",
  );

  let key: string | undefined;
  // deno-lint-ignore no-explicit-any
  function Foo(props: any) {
    key = props.key;
    return null;
  }

  expect(String(<Foo key="key" />)).toEqual("");
  expect(key).toEqual(undefined);
});

Deno.test("render - dangerouslySetInnerHTML", () => {
  expect(
    String(<div class="foo" dangerouslySetInnerHTML={{ __html: "foo" }} />),
  ).toEqual(
    '<div class="foo">foo</div>',
  );
});

Deno.test("render - Fragment dangerouslySetInnerHTML", () => {
  expect(
    String(<Fragment dangerouslySetInnerHTML={{ __html: "foo" }} />),
  ).toEqual(
    "foo",
  );
});

Deno.test("render - children", () => {
  expect(String(<div>foo</div>)).toEqual(
    "<div>foo</div>",
  );
});

Deno.test("render - children escaping", () => {
  expect(String(<div>{"&><'\""}</div>)).toEqual(
    "<div>&amp;&gt;&lt;&#39;&quot;</div>",
  );
});

Deno.test("render - attribute escaping", () => {
  // deno-lint-ignore jsx-curly-braces
  expect(String(<div class={"&><'\""} />)).toEqual(
    '<div class="&amp;&gt;&lt;&#39;&quot;"></div>',
  );

  expect(String(<div {...{ class: "&><'\"" }} />)).toEqual(
    '<div class="&amp;&gt;&lt;&#39;&quot;"></div>',
  );
});

Deno.test("render - throw on invalid children", () => {
  // deno-lint-ignore no-explicit-any
  expect(() => String(<div>{{} as any}</div>)).toThrow(
    "invalid JSX",
  );

  // deno-lint-ignore no-explicit-any
  expect(() => String(<div>foo{{} as any}</div>)).toThrow(
    "invalid JSX",
  );
});

Deno.test("render - Fragments", () => {
  // deno-lint-ignore jsx-no-useless-fragment
  expect(String(<></>)).toEqual("");
  expect(String(<>foo</>)).toEqual("foo");
  expect(String(<>{"&><'\""}</>)).toEqual("&amp;&gt;&lt;&#39;&quot;");
});

Deno.test("render - ignore function attribute values", () => {
  let vnode = createElement("button", { type: "button", onclick: () => {} });
  expect(String(vnode)).toEqual('<button type="button"></button>');

  vnode = jsxTemplate`<button type="button"${
    jsxAttr("onclick", () => {})
  }></button>`;
  expect(String(vnode)).toEqual('<button type="button"></button>');
});

Deno.test("render - ignore function children", () => {
  // deno-lint-ignore no-explicit-any
  let vnode = createElement("div", null, (() => {}) as any);
  expect(String(vnode)).toEqual("<div></div>");

  vnode = jsxTemplate`<div>${jsxEscape(() => {})}</div>`;
  expect(String(vnode)).toEqual("<div></div>");
});
