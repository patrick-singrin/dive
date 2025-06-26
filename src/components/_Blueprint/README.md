# dive-blueprint



<!-- Auto Generated Below -->


## Overview

Blueprint Component

A comprehensive template component that demonstrates all patterns and conventions
for creating Stencil Web Components in this project.

## Properties

| Property          | Attribute           | Description                              | Type                                                                      | Default     |
| ----------------- | ------------------- | ---------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| `ariaDescribedBy` | `aria-described-by` |                                          | `string`                                                                  | `''`        |
| `ariaLabel`       | `aria-label`        | ARIA and accessibility properties        | `string`                                                                  | `''`        |
| `content`         | `content`           | The content type/layout                  | `"avatar" \| "icon" \| "text" \| "text-icon"`                             | `'text'`    |
| `description`     | `description`       | Secondary text or description            | `string`                                                                  | `''`        |
| `disabled`        | `disabled`          | Whether the component is disabled        | `boolean`                                                                 | `false`     |
| `hasAvatar`       | `has-avatar`        | Whether to show an avatar                | `boolean`                                                                 | `false`     |
| `hasIcon`         | `has-icon`          | Whether to show an icon                  | `boolean`                                                                 | `false`     |
| `name`            | `name`              | Form-related properties                  | `string`                                                                  | `''`        |
| `required`        | `required`          |                                          | `boolean`                                                                 | `false`     |
| `size`            | `size`              | The size of the component                | `"large" \| "medium" \| "small"`                                          | `'medium'`  |
| `text`            | `text`              | The main text content                    | `string`                                                                  | `''`        |
| `value`           | `value`             |                                          | `string`                                                                  | `''`        |
| `variant`         | `variant`           | The visual variant/type of the component | `"error" \| "info" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event             | Description                          | Type                                |
| ----------------- | ------------------------------------ | ----------------------------------- |
| `blueprintBlur`   | Emitted when component loses focus   | `CustomEvent<FocusEvent>`           |
| `blueprintChange` | Emitted when component value changes | `CustomEvent<BlueprintChangeEvent>` |
| `blueprintClick`  | Emitted when component is clicked    | `CustomEvent<MouseEvent>`           |
| `blueprintFocus`  | Emitted when component gains focus   | `CustomEvent<FocusEvent>`           |


## Slots

| Slot        | Description                                         |
| ----------- | --------------------------------------------------- |
| `"avatar"`  | Avatar content (when content type supports avatars) |
| `"default"` | The main content slot                               |
| `"icon"`    | Icon content (when content type supports icons)     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
