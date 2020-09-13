# Changelog
All notable changes to this project will be documented in this file.

## 4.0.0

Refactored most of the code and added several features and improvements.
May contain **breaking changes** and require some **configuration changes**!
See [README](https://github.com/benct/lovelace-xiaomi-vacuum-card) for more information.

- **Added:** Dropdown menu for selecting operation mode/fan speed (#9, #48)
- **Added:** Support additional buttons and custom service calls (#26, #41, #50, #51)
- **Added:** Support hiding any state or attribute (#42, #47)
- **Added:** Display icons with state values and support icons on all attributes
- **Added:** Display vacuum entity's battery icon if available
- **Added:** Vendor support for Neato vacuums (#16)
- **Added:** Vendor support for Xiaomi Mi vacuums (#34)
- **Added:** Vendor support for Deebot (slim) vacuums (#53)
- **Changed:** Simplify several vendor integrations
- **Changed:** Render proper icon buttons with optional labels
- **Changed:** Make background image disabled by default
- **Fixed:** Incorrect padding causing hidden text shadows under title

## 3.0.1

- **Fixed:** Incorrect unit on `roomba` boolean attribute values (#24)

## 3.0.0

- **Changed:** Major refactoring and cleanup of code
- **Changed:** Use LitElement instead of Polymer
- **Added:** Support for HA Cast [https://cast.home-assistant.io](https://cast.home-assistant.io)
- **Added:** Support custom button icons
- **Added:** Support hiding specific vacuum attributes (#27)
- **Added:** Vendor support for iRobot Roomba vacuums (#24)

## 2.4.0

- **Added:** Option to hide all labels/details (#20)
- **Added:** Vendor support for Robovac vacuums (#23)

## 2.3.2

- **Fixed:** Error on undefined state objects

## 2.3.1

- **Changed:** Vendor `ecovacs_ozmo` changed to more accurate `deebot` (#17)
- **Changed:** Round computed numbers for `deebot` values
- **Fixed:** Main value units showing as undefined

## 2.3.0

- **Added:** Support alternate attributes for Valetudo/Dustcloud firmware (#15)
- **Added:** Support alternate attributes for Ecovacs Ozmo models (#17)
- **Changed:** Improved general attribute and value handling

## 2.2.1

- **Fixed:** Wrong button color on light themes (#11)

## 2.2.0

- **Added:** Clean spot button and service call (#7)
- **Added:** Options to show/hide individual buttons

## 2.1.0

- **Added:** Customization/translation of labels (#6)
- **Fixed:** Link to changelog in custom_updater json (#5)
- **Fixed:** Incorrect option name in readme example

## 2.0.0

- **Added:** Support for custom_updater component (#2)
- **Added:** Vendor support for Ecovacs vacuums (#3)
- **Changed:** Significant code improvements
- **Changed:** Accommodate future vendor implementations
- **Fixed:** Use standardized name and path for background images (#4)

**Breaking**
- Option `background` renamed to `image`
- Custom image URLs must now include the `/local/` path prefix

## 1.1.1

- **Fixed:** Unsupported function syntax for some browsers

## 1.1.0

- **Added:** Support for `frienly_name` / custom name (#1)
- **Added:** Version information

## 1.0.0

- **Initial release**
