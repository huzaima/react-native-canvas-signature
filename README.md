# react-native-canvas-signature

React native signature component (Android + iOS)

<div align="center">
<a href="https://badge.fury.io/js/react-native-canvas-signature" target="_blank">
<img src="https://badge.fury.io/js/react-native-canvas-signature.svg" alt="NPM version" />
</a>
<img src="https://img.shields.io/badge/Platforms-android%20%7C%20ios-blue" alt="Supports Android and iOS" />
<a href="https://github.com/huzaima/react-native-canvas-signature/blob/master/LICENSE" target="_blank">
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" />
</a>
</div>

This package provides a React Native component for hand-drawn signatures. Developers can use this package in their apps where they want to take hand-drawn signature from the user.

This library uses [`react-native-canvas`](https://www.npmjs.com/package/react-native-canvas).

## Installation

This package uses _react-native-canvas_ under the hood. Please follow [`react-native-canvas's installation guidelines`](https://www.npmjs.com/package/react-native-canvas) to install it, then install this package using following commands

```bash
# using yarn
yarn add react-native-canvas-signature

# using npm
npm install react-native-canvas-signature
```

## Usage

```javascript
import React, { useRef } from 'react';
import { Button } from 'react-native';
import Signature from 'react-native-canvas-signature';

const Example = () => {
  const ref = useRef();

  return (
    <>
      <Signature
        ref={ref}
        lineWidth={3}
        lineColor="blue"
        canvasStyle={{ borderWidth: 1, borderColor: 'grey' }}
        onBegin={() => console.log('begin')}
        onEnd={() => console.log('end')}
        onChange={(signature) => console.log(signature)}
      />
      <Button title="Clear" onPress={() => ref.current?.clearSignature?.()} />
    </>
  );
};

export default Example;
```

## Available props

| Name           | Type     | Default | Description                                                                |
| -------------- | -------- | ------- | -------------------------------------------------------------------------- |
| containerStyle | style    | {}      | Style of the view container)                                               |
| canvasStyle    | style    | {}      | Style of the canvas                                                        |
| lineWidth      | number   | 3       | Width of the stroke                                                        |
| lineColor      | string   | 'black' | Color of the line                                                          |
| onChange       | function |         | Function called on signature change with base64 encoded string as argument |
| onBegin        | function |         | Function called when user starts drawing the signature                     |
| onEnd          | function |         | Function called when user end drawing the signature                        |

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
