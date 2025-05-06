import { createElement, jsx, jsxTemplate } from "./jsx-runtime.ts";
import { expect } from "@std/expect";

Deno.test("createElement", () => {
  let vnode = createElement("div", null);
  expect(vnode.type).toEqual("div");
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);

  const comp = () => null;
  vnode = createElement(comp as any, null);
  expect(vnode.type).toEqual(comp);
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);
});

Deno.test("jsx", () => {
  let vnode = jsx("div", null, undefined);
  expect(vnode.type).toEqual("div");
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);

  const comp = () => null;
  vnode = jsx(comp as any, null);
  expect(vnode.type).toEqual(comp);
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);
});

Deno.test("jsx", () => {
  let vnode = jsx("div", null, undefined);
  expect(vnode.type).toEqual("div");
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);

  const comp = () => null;
  vnode = jsx(comp as any, null);
  expect(vnode.type).toEqual(comp);
  expect(vnode.props).toEqual({});
  expect(vnode.key).toEqual(undefined);
});

Deno.test("jsxTemplate", () => {
  const vnode = jsxTemplate`<div>hello</div>`;
  console.log(vnode);
  expect(String(vnode)).toEqual("<div>hello</div>");
});
