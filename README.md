# Choosify

Use [Choosify](https://choosify.chat) as an ES module.

## Installation

```sh
npm install choosify
# or
yarn install choosify
```

## Usage

```js
import Choosify from 'choosify';

const choosify = Choosify('abc123', { env: 'test' });
```

Where `abc123` is your Choosify site ID your find on your [Choosify dashboard](https://app.choosify.chat).

## Options

Options can be specified e.g. as follows:

```js
const choosify = Choosify('abc123', {
    iconColor: '#4ab563'
    // More options here
});
```

Available options are:
- `title`. Title of the chat window. Default: `Live chat`
- `subtitle`. Subtitle of the chat window. Default: `Any questions? Chat with us.`
- `iconColor`. Color of the icon. Default: `#0b5cd5`
- `icon`. Icon image. Default: message icon
- `headerColor`. Color of the icon. Default: same as `iconColor`
- `operatorName`. Sender name for automated replies. Default: `Operator`
- `operatorIcon`. Sender avatar for automated replies. Default: robot icon

## Methods

### `destroy()`

Completely removes the plugin from the page.

Example:

```js
choosify.destroy();
```
