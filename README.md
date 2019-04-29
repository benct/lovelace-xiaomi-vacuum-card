# xiaomi-vacuum-card

Simple card for Xiaomi robot vaccums in Home Assistant's Lovelace UI

[![GH-release](https://img.shields.io/badge/version-1.1.1-red.svg?style=flat-square)](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/xiaomi-vacuum-card.js)
[![GH-last-commit](https://img.shields.io/github/last-commit/benct/lovelace-xiaomi-vacuum-card.svg?style=flat-square)](https://github.com/benct/lovelace-xiaomi-vacuum-card/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/benct/lovelace-xiaomi-vacuum-card.svg?style=flat-square)](https://github.com/benct/lovelace-xiaomi-vacuum-card)

### Setup

Add [xiaomi-vacuum-card.js](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/xiaomi-vacuum-card.js) to your `<config>/www/` folder. Add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /local/xiaomi-vacuum-card.js?v=1.1.1
    type: js
```
If you want to use the vacuum background image, add [img/vacuum.png](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/img/vacuum.png) to `<config>/www/img/`.

### *(Optional)* Add to custom updater

1. Make sure you have the [custom_updater](https://github.com/custom-components/custom_updater) component installed and working.

2. Add a new reference under `card_urls` in your `custom_updater` configuration in `configuration.yaml`.

```yaml
custom_updater:
  card_urls:
    - https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/tracker.json
```

### Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:xiaomi-vacuum-card`
| entity | string | **Required** | `vacuum.my_xiaomi_vacuum`
| name | string/bool | `friendly_name` | Override entity friendly name (set to false to hide title)
| background | string/bool | `img/vacuum.png` | Custom path/name of background image (set to false to disable background)
| buttons | bool | `true` | Set to false to hide button row
| vendor | string | xiaomi | Set to ecovacs to use with ecovacs

### Examples

![xiaomi-vacuum-card](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/default.png)

Hidden title/name

![xiaomi-vacuum-card-no-title](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/no-title.png)

Hidden button row

![xiaomi-vacuum-card-no-buttons](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/no-buttons.png)

No background image

![xiaomi-vacuum-card-no-background](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/no-background.png)

```yaml
- type: custom:xiaomi-vacuum-card
  entity: vacuum.xiaomi_vacuum_cleaner
  background: custom/folder/and/file.png
  name: Xiaomi Vacuum
  buttons: false
```

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoff.ee/benct)

### Disclaimer

This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with the Xiaomi Corporation, or any of its subsidiaries or its affiliates. The official Xiaomi website can be found at https://www.mi.com/global/.
