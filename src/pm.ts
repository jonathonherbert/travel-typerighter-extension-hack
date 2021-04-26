import {
  createTyperighterPlugin,
  createView,
  createBoundCommands,
  MatcherService,
  TyperighterAdapter,
  IMatch,
} from "@guardian/prosemirror-typerighter";
import { MatchType } from "@guardian/prosemirror-typerighter/dist/src/ts/utils/decoration";
import { DOMParser, DOMSerializer, Fragment, Schema } from "prosemirror-model";
import { nodes } from "prosemirror-schema-basic";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

const stripCSS = (prop: string): number => parseInt(prop.replace('px', ''))

export const gmailSchema = new Schema({
  nodes: {
    doc: {
      content: "(div | hard_break)+",
    },
    text: nodes.text,
    div: {
      content: "inline*",
      group: "block",
      parseDOM: [{ tag: "div" }],
      toDOM() {
        return ["div", 0];
      },
    },
    hard_break: {
      group: "block",
      selectable: false,
      parseDOM: [{ tag: "br" }],
      toDOM() {
        return ["br", 0];
      },
    },
  },
});

export const flatSchema = new Schema({
  nodes: {
    doc: {
      content: "(text | hard_break)+",
    },
    text: nodes.text,
    hard_break: nodes.hard_break,
  },
});

const getParsers = (el: HTMLElement) => {
  if (el.tagName === "DIV") {
    const parser = DOMParser.fromSchema(gmailSchema);
    const serialiser = DOMSerializer.fromSchema(gmailSchema);

    return {
      parser,
      serialiser,
      schema: gmailSchema,
    };
  }
  const parser = DOMParser.fromSchema(gmailSchema);
  const serialiser = DOMSerializer.fromSchema(gmailSchema);

  return {
    parser,
    serialiser,
    schema: flatSchema,
  };
};

export const mountProsemirrorNextToNode = (
  el: HTMLElement,
  onChange: (newDoc: string) => void
) => {
  const {schema, parser, serialiser} = getParsers(el)
  const documentNode = document.createElement("div");
  const sidebarNode = document.createElement("div");
  const overlayNode = document.createElement("div");
  const editorScrollElement = document.createElement("div");

  const closestDiv =
    el.tagName === "DIV"
      ? (el.parentNode! as Element).closest("div")
      : el.closest("div");

  if (!closestDiv) {
    return console.warn("Could not find node to append overlay", el);
  }
  console.log({ closestDiv, el });
  document.body.append(overlayNode);
  closestDiv.append(documentNode);
  closestDiv.style.position = "relative";

  const {
    plugin: typerighterPlugin,
    store,
    getState,
  } = createTyperighterPlugin<MatchType[], IMatch>({
    filterOptions: {
      filterMatches: (_: MatchType[], matches: IMatch[]) => matches,
      initialFilterState: [],
    },
    isElementPartOfTyperighterUI: (el) => overlayNode.contains(el),
  });

  const state = EditorState.create({
    schema,
    plugins: [typerighterPlugin],
  });
  const view = new EditorView(documentNode, {
    state,
    dispatchTransaction: (tr) => {
      const newState = view.state.apply(tr);
      view.updateState(newState);
      if (tr.docChanged) {
        const dom = serialiser.serializeFragment(
          (newState.doc as unknown) as Fragment
        );
        const e = document.createElement("div");
        e.appendChild(dom);
        onChange(e.children[0]!.innerHTML);
      }
    },
  });

  const commands = createBoundCommands(view, getState);
  const adapter = new TyperighterAdapter("http://localhost:9100");
  const matcherService = new MatcherService(store, commands, adapter);
  const typerighterView = createView({
    store,
    commands,
    view,
    sidebarNode,
    matcherService,
    overlayNode,
    editorScrollElement,
  });

  return {
    offsetTop: stripCSS(window.getComputedStyle(closestDiv).paddingTop) + stripCSS(window.getComputedStyle(closestDiv).marginTop) + stripCSS(window.getComputedStyle(el).marginTop),
    commands,
    documentNode,
    setText: (text: string) => {
      console.log("setText");
      const node = document.createElement("div");
      node.innerHTML = text.replace("&nbsp;", " ");
      console.log({ text, node });
      const doc = parser.parse(node);
      const newState = EditorState.create({
        schema,
        plugins: [typerighterPlugin],
        doc,
      });
      view.updateState(newState);
      console.log({ text, newState });
    },
  };
};
