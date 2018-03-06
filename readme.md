## Lumavate Components

These are set of base components developed by the API Team.  They were built using [Stencil](https://stenciljs.com/), which is a simple compiler for
generating Web Components.

By default, these components rely on the Roboto font and Google Material Icons.  Please include the following in your app, if you plan to use these
components.

### To use in your project
```bash
 npm install @lumavate/components --save

 and include 

 '../node_modules/@lumavate/components/dist/lumavate-components.js'
```

```html
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

### Components

| Name      | Description                             |
| -------------- | ---                                     |
| `lumavate-quote` | Simple component to display quoted text |
| `lumavate-large-nav-card`      | Allows you to display a large navigation card  |
| `lumavate-small-nav-card`     | Allows you to display a small navication card. |


### lumavate-quote
```html
 <lumavate-quote
    quote-text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    font-size=12
    show-card=true
    card-color='#FFF'
    quotation-marks=true
    color='#6A1F64'>
  </lumavate-quote>
```

### lumavate-large-nav-card
```html
  <lumavate-large-nav-card
    caption=true
    caption-text='Dropbox Onboarding Case Study'
    caption-text-color='#000'
    caption-background-color='#FFF'
    card-color='#D8E7FF'
    card-image=true
    image-source='http://via.placeholder.com/140x40'
    image-scaling='contain'
    card-link-'https://www.google.com'>
  </lumavate-large-nav-card>
```

### lumavate-small-nav-card
```html
  <lumavate-small-nav-card
    sub-title=true
    sub-title-text='This is Subtitle'
    title-text='Dropbox Onboarding Case Study'
    title-text-color='#000'
    card-color='#D8E7FF'
    card-image=true
    image-source='http://via.placeholder.com/140x40'
    image-scaling='contain'
    card-ling='https://www.dropbox.com'>
  </lumavate-small-nav-card>
```
