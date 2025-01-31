import React from 'react';

// Get all possible permutations of all power sets
//
// Super simple, non-algorithmic solution since the
// number of class names will not be greater than 4
function powerSetPermutations(arr: string[]): undefined | string[] {
  const arrLength = arr.length;
  if (arrLength === 0 || arrLength === 1) return arr;
  if (arrLength === 2) {
    // prettier-ignore
    return [
      arr[0],
      arr[1],
      `${arr[0]}.${arr[1]}`,
      `${arr[1]}.${arr[0]}`
    ];
  }
  if (arrLength === 3) {
    return [
      arr[0],
      arr[1],
      arr[2],
      `${arr[0]}.${arr[1]}`,
      `${arr[0]}.${arr[2]}`,
      `${arr[1]}.${arr[0]}`,
      `${arr[1]}.${arr[2]}`,
      `${arr[2]}.${arr[0]}`,
      `${arr[2]}.${arr[1]}`,
      `${arr[0]}.${arr[1]}.${arr[2]}`,
      `${arr[0]}.${arr[2]}.${arr[1]}`,
      `${arr[1]}.${arr[0]}.${arr[2]}`,
      `${arr[1]}.${arr[2]}.${arr[0]}`,
      `${arr[2]}.${arr[0]}.${arr[1]}`,
      `${arr[2]}.${arr[1]}.${arr[0]}`
    ];
  }
  if (arrLength >= 4) {
    // Currently does not support more than 4 extra
    // class names (after `.token` has been removed)
    return [
      arr[0],
      arr[1],
      arr[2],
      arr[3],
      `${arr[0]}.${arr[1]}`,
      `${arr[0]}.${arr[2]}`,
      `${arr[0]}.${arr[3]}`,
      `${arr[1]}.${arr[0]}`,
      `${arr[1]}.${arr[2]}`,
      `${arr[1]}.${arr[3]}`,
      `${arr[2]}.${arr[0]}`,
      `${arr[2]}.${arr[1]}`,
      `${arr[2]}.${arr[3]}`,
      `${arr[3]}.${arr[0]}`,
      `${arr[3]}.${arr[1]}`,
      `${arr[3]}.${arr[2]}`,
      `${arr[0]}.${arr[1]}.${arr[2]}`,
      `${arr[0]}.${arr[1]}.${arr[3]}`,
      `${arr[0]}.${arr[2]}.${arr[1]}`,
      `${arr[0]}.${arr[2]}.${arr[3]}`,
      `${arr[0]}.${arr[3]}.${arr[1]}`,
      `${arr[0]}.${arr[3]}.${arr[2]}`,
      `${arr[1]}.${arr[0]}.${arr[2]}`,
      `${arr[1]}.${arr[0]}.${arr[3]}`,
      `${arr[1]}.${arr[2]}.${arr[0]}`,
      `${arr[1]}.${arr[2]}.${arr[3]}`,
      `${arr[1]}.${arr[3]}.${arr[0]}`,
      `${arr[1]}.${arr[3]}.${arr[2]}`,
      `${arr[2]}.${arr[0]}.${arr[1]}`,
      `${arr[2]}.${arr[0]}.${arr[3]}`,
      `${arr[2]}.${arr[1]}.${arr[0]}`,
      `${arr[2]}.${arr[1]}.${arr[3]}`,
      `${arr[2]}.${arr[3]}.${arr[0]}`,
      `${arr[2]}.${arr[3]}.${arr[1]}`,
      `${arr[3]}.${arr[0]}.${arr[1]}`,
      `${arr[3]}.${arr[0]}.${arr[2]}`,
      `${arr[3]}.${arr[1]}.${arr[0]}`,
      `${arr[3]}.${arr[1]}.${arr[2]}`,
      `${arr[3]}.${arr[2]}.${arr[0]}`,
      `${arr[3]}.${arr[2]}.${arr[1]}`,
      `${arr[0]}.${arr[1]}.${arr[2]}.${arr[3]}`,
      `${arr[0]}.${arr[1]}.${arr[3]}.${arr[2]}`,
      `${arr[0]}.${arr[2]}.${arr[1]}.${arr[3]}`,
      `${arr[0]}.${arr[2]}.${arr[3]}.${arr[1]}`,
      `${arr[0]}.${arr[3]}.${arr[1]}.${arr[2]}`,
      `${arr[0]}.${arr[3]}.${arr[2]}.${arr[1]}`,
      `${arr[1]}.${arr[0]}.${arr[2]}.${arr[3]}`,
      `${arr[1]}.${arr[0]}.${arr[3]}.${arr[2]}`,
      `${arr[1]}.${arr[2]}.${arr[0]}.${arr[3]}`,
      `${arr[1]}.${arr[2]}.${arr[3]}.${arr[0]}`,
      `${arr[1]}.${arr[3]}.${arr[0]}.${arr[2]}`,
      `${arr[1]}.${arr[3]}.${arr[2]}.${arr[0]}`,
      `${arr[2]}.${arr[0]}.${arr[1]}.${arr[3]}`,
      `${arr[2]}.${arr[0]}.${arr[3]}.${arr[1]}`,
      `${arr[2]}.${arr[1]}.${arr[0]}.${arr[3]}`,
      `${arr[2]}.${arr[1]}.${arr[3]}.${arr[0]}`,
      `${arr[2]}.${arr[3]}.${arr[0]}.${arr[1]}`,
      `${arr[2]}.${arr[3]}.${arr[1]}.${arr[0]}`,
      `${arr[3]}.${arr[0]}.${arr[1]}.${arr[2]}`,
      `${arr[3]}.${arr[0]}.${arr[2]}.${arr[1]}`,
      `${arr[3]}.${arr[1]}.${arr[0]}.${arr[2]}`,
      `${arr[3]}.${arr[1]}.${arr[2]}.${arr[0]}`,
      `${arr[3]}.${arr[2]}.${arr[0]}.${arr[1]}`,
      `${arr[3]}.${arr[2]}.${arr[1]}.${arr[0]}`
    ];
  }
}

const classNameCombinations: { [key: string]: string[] | undefined } = {};

function getClassNameCombinations(classNames: string[]) {
  if (classNames.length === 0 || classNames.length === 1) return classNames;
  const key = classNames.join('.');
  if (!classNameCombinations[key]) {
    classNameCombinations[key] = powerSetPermutations(classNames);
  }
  return classNameCombinations[key];
}

export function createStyleObject(
  classNames: string[],
  elementStyle: any = {},
  stylesheet: any
) {
  const nonTokenClassNames = classNames.filter(
    className => className !== 'token'
  );
  const classNamesCombinations = getClassNameCombinations(nonTokenClassNames);
  return classNamesCombinations?.reduce((styleObject, className) => {
    return { ...styleObject, ...stylesheet[className] };
  }, elementStyle);
}

export function createClassNameString(classNames: string[]) {
  return classNames.join(' ');
}

export function createChildren(stylesheet: any, useInlineStyles: any) {
  let childrenCount = 0;
  return (children: any[]) => {
    childrenCount += 1;
    return children.map((child, i) =>
      createElement({
        node: child,
        stylesheet,
        style: {},
        useInlineStyles,
        key: `code-segment-${childrenCount}-${i}`
      })
    );
  };
}

export default function createElement({
  node,
  stylesheet,
  style = {},
  useInlineStyles,
  key
}: {
  node: any;
  stylesheet: any;
  style?: any;
  useInlineStyles: any;
  key: string|number;
}) {
  const {
    properties,
    type,
    tagName: TagName,
    value
  }: {
    properties: any;
    type: string;
    tagName: any;
    value: string;
  } = node;

  if (type === 'text') {
    return value;
  } else if (TagName) {
    const childrenCreator = createChildren(stylesheet, useInlineStyles);

    let props;

    if (!useInlineStyles) {
      props = {
        ...properties,
        className: createClassNameString(properties.className)
      };
    } else {
      const allStylesheetSelectors: string[] = Object.keys(stylesheet).reduce(
        (classes: string[], selector) => {
          selector.split('.').forEach(className => {
            if (!classes.includes(className)) classes.push(className);
          });
          return classes;
        },
        []
      );

      // For compatibility with older versions of react-syntax-highlighter
      const startingClassName =
        properties.className && properties.className.includes('token')
          ? ['token']
          : [];

      const className =
        properties.className &&
        startingClassName.concat(
          properties.className.filter(
            (className: string) => !allStylesheetSelectors.includes(className)
          )
        );

      props = {
        ...properties,
        className: createClassNameString(className) || undefined,
        style: createStyleObject(
          properties.className,
          Object.assign({}, properties.style, style),
          stylesheet
        )
      };
    }

    const children: any = childrenCreator(node.children);

    return TagName({ key, ...props, children });
  }
}
