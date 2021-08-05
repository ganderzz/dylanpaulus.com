---
title: "Tips on Improving FabricJS Speed"
tags: ["Javascript", "FabricJS"]
date: "2018-10-11"
published: true
---

[FabricJS](http://fabricjs.com/) is an awesome library that handles [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) interactions and rendering. Inherently it is a pretty performant library, but recently we ran into an issue where we needed to render ~8mb of json data (10k objects). Given any framework, it is no easy task to render this much data. The biggest culprit while rendering a lot of objects is renders (or rerenders). When the canvas has to show any change, it renders the _entire_ canvas. This includes clearing the canvas, looping through each object, and drawing it. In this post I'll go through some of the techniques we used to improve interaction and rendering speed.

#### Cut out the basics

FabricJS has a [small post about optimizing performance](https://github.com/fabricjs/fabric.js/wiki/Optimizing-performance). All great tips, but the one to look at is setting `renderOnAddRemove` to false. Adding this property to the canvas will prevent Fabric from re-rendering if a shape is added or deleted. This gives huge speed improvements on initial loads while adding a lot of shapes to the canvas.

```javascript
const canvas = new fabric.Canvas("myId", { renderOnAddRemove: false });
```

_Caution:_ `canvas.renderAll();` will have to be called whenever we want a change to show on the canvas

#### Enliven over loadFromJSON

`loadFromJSON` is a really helpful function when we want to deserialize JSON to the canvas, but it comes with some draw-backs. First, `loadFromJSON` will clear the canvas before it loads the JSON objects. This can be bad if we added shapes to the canvas before loading then JSON. Second, it will call `renderAll` once the JSON is finished. This is bad when we have additional operations to perform after our JSON object is loaded (ie. adding more shapes or selecting then).

Alternatively we can use a function called `enlivenObjects`.

```javascript
const canvas = new fabric.Canvas("myId", { renderOnAddRemove: false }););
// enlivenObjects([array of json objects], [callback])
fabric.util.enlivenObjects([{}, {}, {}], (objs) => {
    objs.forEach((item) => {
        canvas.add(item);
    });
    canvas.renderAll(); // Make sure to call once we're ready!
});
```

`enlivenObjects` takes in an array of the serialized FabricJS JSON (found in: [json].objects), and returns the Fabric object representation of it. We use a callback to get the parsed objects. This is similar to how `loadFromJSON` handles [loading behind the scenes](https://github.com/fabricjs/fabric.js/blob/464708aafccc0d5a4e3a7b6604db2d00ad3bc475/src/mixins/canvas_serialization.mixin.js#L55)! The bonus here is there are no unneeded renders and canvas clearing. We can control when the canvas gets rendered!

#### Don't Canvas Everything

The more shapes on the canvas, the more work Fabric has to do on a render. One way around this is to take out any shapes that don't need to be manipulated or animated. We achieve this by converting those un-interactive layers to an image `canvas.toDataURL("png");` and rendering it as an HTML `<img />` tag. Then, overlay the canvas on top of the image; only using the canvas for the interactive bits while showing everything.
