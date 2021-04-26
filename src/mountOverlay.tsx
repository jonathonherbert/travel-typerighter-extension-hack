import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { diff_match_patch } from "diff-match-patch";
import { mountProsemirrorNextToNode } from "./pm";
import typerighterStyles from "./style";
import { useInterval } from './util';

const isBrowser = typeof window !== "undefined";
const isFirefox = isBrowser && (window as any).mozInnerScreenX != null;

function App() {
  const [subscribedElements] = useTyperighter();

  return (
    <div className="App">
      <style>
        {`
          ${typerighterStyles}
          /* set up the keyframes; remember to create prefixed keyframes too! */
          @keyframes nodeInserted {
            from {
              opacity: 0.99;
            }
            to {
              opacity: 1;
            }
          }

          input:focus,
          textarea:focus,
          .editable:focus,
          div[contenteditable="true"]:focus,
          div[role="textbox"]:focus,
          .oAzRtb:focus,
          .oAzRtb {
            animation-duration: 0.001s;
            animation-name: nodeInserted;
          }

          .ProseMirror span {
            visibility: visible;
          }

          .ProseMirror > p {
            margin: 0;
          }

          .ProseMirror__container {
            position: absolute;
          }

          .ProseMirror__container * {
            box-sizing: border-box;
          }
        `}
      </style>
      {subscribedElements.map((el) => (
        <TyperighterInputOverlay
          element={el.node}
          style={el.style}
          key={el.node.id}
        />
      ))}
    </div>
  );
}

const inputQueries = [
  'input:focus',
  'textarea:focus',
  '.editable:focus',
  '.oAzRtb'
]

type IPlacedMatch = IMatch & {
  left: number;
  top: number;
  width: number;
  height: number;
};

type IInputOverlayProps = {
  element: ValidTyperighterInput;
  style: CSSProperties;
};
const TyperighterInputOverlay = ({ element, style }: IInputOverlayProps) => {
  const text = useInput(element);
  const [elementRect, setElementRect] = useState(
    undefined as DOMRect | undefined
  );
  const [pmState, setPMState] = useState<
    ReturnType<typeof mountProsemirrorNextToNode> | undefined
  >(undefined);
  // Set the initial input rect, and listen for changes that
  // affect match layout or visibility.
  useEffect(() => {
    // Initial rect
    const rect = element.getBoundingClientRect();
    setElementRect(rect);

    // Changes in size
    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      setElementRect(rect);
    });
    observer.observe(element);

    // Scrolling behavior
    const onScroll = (event: Event) => {
      const rect = element.getBoundingClientRect();
      setElementRect(rect);
    };
    document.addEventListener("scroll", onScroll, true);

    // Clean up afterwards
    return () => {
      observer.disconnect();
      document.removeEventListener("scroll", onScroll);
    };
  }, [element]);

  useEffect(() => {
    const pmState = mountProsemirrorNextToNode(element, (newContent) => {
      console.log(element);
      if (element.tagName === 'DIV') {
        const pmNode = element.querySelector(".ProseMirror__container")!;
        element.innerHTML = newContent;
        element.appendChild(pmNode);
      } else  {
        element.value = newContent;
      }
    });

    setPMState(pmState);
  }, []);

  useEffect(() => {
    if (!pmState) {
      return;
    }
    pmState.setText(text);
    pmState.commands.requestMatchesForDocument("exampleReq", []);
  }, [text, pmState]);

  const computedStyle = elementRect
    ? {
        ...style,
        width: `${elementRect.width}px`,
        height: `${elementRect.height}px`,
      }
    : style;

  if (pmState) {
    console.log(pmState.offsetTop);
    const pmEl = pmState.documentNode.firstChild as HTMLElement;
    console.log(computedStyle)
    Object.entries(computedStyle).forEach(
      ([key, val]) => (pmEl.style[key as any] = val)
    );
    pmState.documentNode.style.width = elementRect?.width.toString() || "0";
    pmState.documentNode.style.height = elementRect?.height.toString() || "0";
    pmState.documentNode.style.top = `${pmState.offsetTop}px`;
    pmState.documentNode.style.left = "0";
    pmState.documentNode.style.visibility = "hidden";
    pmState.documentNode.classList.add("ProseMirror__container");
  }

  return null;
};

const inputs = [] as Element[];

const useTyperighter = (): [
  InputState[],
  React.Dispatch<React.SetStateAction<InputState[]>>
] => {
  const [subscribedElements, setSubscribedElements] = useState(
    [] as InputState[]
  );
  const addInput = (newInput: ValidTyperighterInput) => {
    setSubscribedElements((currentElements) => {
      if (currentElements.map((_) => _.node).includes(newInput)) {
        return currentElements;
      }
      const style = getStyleForElement(newInput);
      console.log(`Registered new input,  ${newInput.id}`);
      return [...currentElements, { node: newInput, style }];
    });
  };

  // Listen for new Typerighter-enabled elements
  useEffect(() => {

    const insertListener = (event: AnimationEvent) => {
      console.log(event.animationName);
      if (
        event.animationName === "nodeInserted" &&
        isTyperighterifiable(event.target) &&
        !inputs.includes(event.target)
      ) {
        const newInput = event.target as ValidTyperighterInput;
        addInput(newInput);
      }
    };

    console.log("Listening for new input elements");
    document.addEventListener("animationstart", insertListener);
  });

  // useInterval(() => {
  //   const docInputs = inputQueries.flatMap(query => {
  //     console.log(query)
  //     console.log(document.querySelectorAll(query))
  //     const els = Array.from(document.querySelectorAll(query))
  //     console.log({els})
  //     return els;
  //   });
  //   console.log('interval check')
  //   docInputs.forEach(input => {
  //     if (inputs.includes(input) || !isTyperighterifiable(input)) return;
  //     console.log('adding input', input)
  //     addInput(input);
  //     inputs.push(input)
  //   })
  // }, 2000);

  return [subscribedElements, setSubscribedElements];
};

const diff = new diff_match_patch();

const useInput = (inputElement: ValidTyperighterInput) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const handleInputChanged = async (event: Event) => {
      console.log(event)
      const node: HTMLDivElement = ((event as any).target as HTMLDivElement).cloneNode() as any;
      const sig = node.querySelector('.gmail_signature')!

      const text: string = (event as any).target.innerHTML
      const split = text.indexOf('<div dir="ltr" ')
      const remainingText = text.slice(0, split || Infinity);
      console.log({text, remainingText})

      setText(remainingText);
    };

    inputElement.addEventListener("input", handleInputChanged);
  }, [inputElement]);

  return text;
};

/**
 * Copy the styles from the given input element.
 */
const getStyleForElement = (element: ValidTyperighterInput): CSSProperties => {
  const computed = window.getComputedStyle(element) as CSSProperties;
  const style = {} as CSSProperties;
  const isInput = element.nodeName === "INPUT";
  // Default textarea styles
  style.whiteSpace = "pre-wrap";
  if (!isInput) style.wordWrap = "break-word"; // only for textarea-s

  // Position off-screen
  style.position = "absolute"; // required to return coordinates properly
  // if (!debug)
  //   style.visibility = 'hidden';  // not 'display: none' because we want rendering

  properties.forEach((prop) => {
    if (isInput && prop === "lineHeight") {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === "border-box") {
        var height = parsePropAsInt(computed.height);
        var outerHeight =
          parsePropAsInt(computed.paddingTop) +
          parsePropAsInt(computed.paddingBottom) +
          parsePropAsInt(computed.borderTopWidth) +
          parsePropAsInt(computed.borderBottomWidth);
        var targetHeight = outerHeight + parsePropAsInt(computed.lineHeight);
        if (height > targetHeight) {
          style.lineHeight = height - outerHeight + "px";
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight;
        } else {
          //style.lineHeight = "0";
        }
      } else {
        style.lineHeight = computed.height;
      }
    } else {
      (style[prop] as any) = computed[prop] as string;
    }
  });

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parsePropAsInt(computed.height))
      style.overflowY = "scroll";
  } else {
    style.overflow = "hidden"; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  return style;
};

const parsePropAsInt = (prop: string | number | void): number =>
  prop ? (typeof prop === "number" ? prop : parseInt(prop.toString())) : 0;

const isTyperighterifiable = (
  maybeElement: unknown
): maybeElement is HTMLTextAreaElement | HTMLInputElement =>
  maybeElement instanceof HTMLInputElement ||
  maybeElement instanceof HTMLTextAreaElement ||
  maybeElement instanceof HTMLDivElement;

type ValidTyperighterInput = HTMLInputElement | HTMLTextAreaElement;
type InputState = { node: ValidTyperighterInput; style: CSSProperties };

interface IMatch {
  from: number;
  to: number;
  text: string;
  id: string;
}

const properties: Partial<keyof CSSProperties>[] = [
  "direction", // RTL support
  "boxSizing",
  "width", // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  "height",
  "overflowX",
  "overflowY", // copy the scrollbar for IE

  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",

  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",

  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration", // might not make a difference, but better be safe

  "letterSpacing",
  "wordSpacing",

  "tabSize",
  // "MozTabSize",
];

export default App;
