# xiaomi-vacuum-card

Simple card for Xiaomi robot vaccums in Home Assistant's Lovelace UI

### Setup

Add [xiaomi-vacuum-card.js](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/xiaomi-vacuum-card.js) to your `<config>/www/` folder.
If you want to use the vacuum background image, add [img/vacuum.png](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/img/vacuum.png) to `<config>/www/img/`.
Add the following to your `ui-lovelace.yaml` file:

```yaml
resources:
  - url: /local/multiple-entity-row.js
    type: js
```

### Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:multiple-entity-row`
| entity | string | **Required** | `vacuum.my_xiaomi_vacuum`
| background | string/bool | `img/vacuum.png` | Custom path/name of background image (set to false to disable background)
| buttons | bool | `true` | Set to false to hide button row

### Example

![xiaomi-vacuum-card](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/default.png)
![xiaomi-vacuum-card-no-buttons](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/no-buttons.png)
![xiaomi-vacuum-card-no-background](https://raw.githubusercontent.com/benct/lovelace-xiaomi-vacuum-card/master/examples/no-background.png)

```yaml
- type: custom:xiaomi-vacuum-card
  entity: vacuum.xiaomi_vacuum_cleaner
  background: custom/folder/and/file.png
  buttons: false
```
