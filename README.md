# Choosify

Add the [Choosify](https://choosify.chat) chat plugin to your website.

## Installation

```sh
npm install choosify
# or
yarn add choosify
```

## Usage

```js
import Choosify from 'choosify';

const choosify = Choosify('abc123');
```

Where `abc123` is your Choosify site ID listed on your [Choosify dashboard](https://app.choosify.chat).

That's it. The plugin should now load on your page.

## Alternative installation and usage

Instead of installation via the npm or yarn package manager, Choosify can be imported using a script tag.

To do so, add the following code inside your html `<head>` or `<body>`:

```html
<script src="https://plugin.choosify.chat/plugin.js"></script>
<script>var choosify = Choosify('abc123');</script>
```

Where `abc123` is your Choosify site ID listed on your [Choosify dashboard](https://app.choosify.chat).

## Options

The plugin can be customized by passing options when loading it, e.g. as follows:

```js
const choosify = Choosify('abc123', {
    title: 'Any questions?',
    iconColor: '#4ab563'
});
```

Available options are:
- `title`. Title of the chat window. Default: `Live chat`
- `subtitle`. Subtitle of the chat window. Default: `Any questions? Chat with us.`
- `iconColor`. Color of the icon in hexadecimal format. Default: `#0b5cd5`
- `icon`. Icon image. Default: message icon
- `headerColor`. Color of the header in hexadecimal format. Default: same as `iconColor`
- `operatorName`. Sender name for automated replies. Default: `Operator`
- `operatorIcon`. Sender avatar for automated replies. Default: robot icon

## Methods

### `destroy()`

Completely remove the plugin from the page.

Example:

```js
choosify.destroy();
```
