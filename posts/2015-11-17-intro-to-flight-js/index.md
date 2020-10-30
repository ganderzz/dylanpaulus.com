---
title: "Intro to FlightJS"
tags: ["Javascript", "FlightJS"]
date: "2015-11-17"
published: true
---

> _This post is part of the archive. These are mainly random posts that were written throughout the years in no coherent order._

### FlightJS

FlightJs isn’t the new kid on the block. This little framework has gone unnoticed in Github-land for years. Taken from the FlightJS Github: “Flight is a lightweight, component-based JavaScript framework that maps behavior to DOM nodes.” Reworded, we use reusable components that listen for event calls. These events then in turn perform actions on the DOM or manipulate pieces of our code. Today we will get started with FlightJs, and show how simple it is to use. Though this is an introduction guide, I will assume that we have a fair proficiency with HTML, CSS, and JavaScript.
Getting Started

In this Intro to FlightJS guide we will do what many intro framework guides do, make a counter. Let’s get to work.
Head over to the FlightJS Github, and install FlightJS using your favorite method.
HTML code:

```html
<h1>FlightJS Counter</h1>
<div class="”counter”">
  <h2 class="”counter-total”">0</h2>
  <div class="”counter-function”">
    <a href="”#subtract”" class="”counter-subtract”">-</a>
    <a href="”#add”" class="”counter-add”">+</a>
  </div>
</div>
```

### Counter

To get started, let us create a FlightJS component. Since we will be creating a counter, we’ll create a Counter component.

```javascript
var Counter = flight.component(function() {
   this.defaultAttrs({});
   this.after(“initialize”, function() {
   });
});
```

We did a few things in the example above. First, we created a new Flight component called Counter. Next, we defined that we have no default attributes to the Counter component (this will change soon). Attributes provide two big benefits: Component attributes create private variables for a component.

Secondly, attributes give us a way to assign unique data to each instance of a component. Lastly, we have this weird `this.after(“initialize”)` thing going on at the end. This is where a lot of the power comes from. Flight will execute the function we provide, as the second argument, after the initialize function has ran (initialize is an internal flight function) . Basically we’re telling Flight that once it gets itself in order, let us do what we need to.

So what does a counter need? We need a total number that will be counted on. Oh yeah, and some buttons, that when clicked, either add or subtract one from the total. Let’s add this to our JavaScript.

```javascript
var Counter = flight.component(function() {
   this.defaultAttrs({
      "subtractSelector": ".counter-subtract",
      "additionSelector": ".counter-add",
      "count": 0
   });
   this.subtract(function() {});
   this.add(function() {});
   this.after(“initialize”, function() {
     this.on("click", {
        "subtractSelector": this.subtract,
        "additionSelector": this.add
     });
   });
});
```

First we added some attributes. These attributes provide us a DOM element for our subtract and add buttons—named subtractSelector and additionSelector respectively—and defines our starting number count. We then created some stubbed functions for once the selector’s event is triggered. Finally, an event handler is created. `this.on(“”)` creates an event binding it to whatever we define within the quotes. In this case, we are waiting on a click event to be performed on our DOM selectors subtractSelector and additionSelector. Once a click is recognized, the corresponding function is called. (`this.subtract()` or `this.add()`)

Continuing, here is our finished code:

```javascript
var Counter = flight.component(function() {
   this.defaultAttrs({
      "subtractSelector": ".counter-subtract",
      "additionSelector": ".counter-add",
      "count": 0
   });
   this.subtract = function() {
      this.attr.count--;
   }

   this.add = function() {
      this.attr.count++;
   }

   this.uiDisplayCount = function() {
      this.$node.find(“h2.counter-total”).html( this.attr.count );
   }

   this.after("add subtract", function() {
      this.uiDisplayCount();
   });
   this.after(“initialize”, function() {
     this.uiDisplayCount();
     this.on("click", {
        "subtractSelector": this.subtract,
        "additionSelector": this.add
     });
   });
});
```

Finally we get functionality. The subtract and add function perform a -1 or +1 on the total count depending on which event is triggered. Once we perform these actions on our count, we have no way of displaying the new information. This is where `this.uiDisplayCount` plays its role. From any jQuery enthusiast, this function is straight forward. Take our count attribute, and insert it into the html of .counter-total. But, what is `this.$node`? This.\$node is a property given to us from Flight that grabs a jQuery object of the DOM this component is attached to. Later on we will attach the Counter component to the DOM, and see how this plays out. Going to the next function, we tell our component to execute the uiDisplayCount function after the add or subtract functions are done being executed.

Now there is one thing missing, how do we actually attach this to the DOM?
`Counter.attachTo(“.counter”, { count: 100 });`

Going back to before, our `this.$node` property would return a jQuery object of our .counter, `$(“.counter”)`. As we can see by the second parameter, we can also change what our default attributes are once we attach the component. This helps enforce the modular code Flight preaches. We can change the attributes to fit whatever the situation.

```javascript
Counter.attachTo(“.counter”, { count: 100 });
Counter.attachTo(“.counter-new”, {
                   count: 0,
                   subtractSelector: ".new-subtract"
                });
Counter.attachTo(".counter-new-new", {
                   subtractSelector: ".s",
                   additionSelector: ".a"
                });
```

### We Did It

And that is it, we completed our counter! We can see from this little example, Flight gives us some powerful tools in creating modulated code without the need to learn new paradigms. As always, there is much more Flight can do. For additional information on Flight check out their Github.

#### Counter Example

Here is our finished product: [http://codepen.io/ganderzz/pen/pjNdNq](http://codepen.io/ganderzz/pen/pjNdNq)
