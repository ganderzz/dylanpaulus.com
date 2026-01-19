---
title: "On Writing Clean Code"
tags: ["programming", "software-engineering", "beginner"]
date: "2019-07-21"
published: true
---

We can all agree that writing clean code is important. It makes it easier to work in a team, and even if we're a single developer, clean code keeps our future selves happy. Ever look at your old code and wonder, "What is this crap?" If you said "no", write more code--the feeling will come. For those who said "yes", let's look at some techniques that will improve your code readability.

## Use Good Names

Coming up with good names is hard, but anything is better than using 'foo'. When creating names use something descriptive: what does the variable hold? what is the purpose of that function? Remember, we write code for humans to read!

Without context of your code it's hard to say, "this is what you should be naming things", but there are a few guidelines we can use when choosing names.

### Booleans

Booleans are used to split code into two paths (true/false.. yes/no). When naming booleans, it helps to ask a question. For example, we might have some code that looks like:

```js
let content = false;

if (content) {
  ...
}
```

This is ok, but it really doesn't give any context of what `content` is. While naming booleans, prefix it with `is`, `are`, `should`, `has`, etc... Just something that makes the variable asking a question.

```js
let hasContent = true;

if (hasContent) {
  ...
}
```

### Lists/Arrays

Make lists/arrays plural--they can hold multiple values so reflect it in the naming!

```js
let salesOrder = []; // :(
let salesOrderList = []; // :|
let salesOrders = []; // :D Yay!
```

### Don't be afraid of going long

Sometimes a single word doesn't explicitly explain what a piece of code does. As in what a function is supposed to do, or what a variable contains. It's perfectly fine to name something with a _sentence_, just watch out if we start naming our variables with _paragraphs_

```js
function doStuff() { ... } // Bad!

function getSalesOrder() { ... } // Better!

function getSalesOrderByLineId() { ... } // Even Better!

function getSalesOrderByItemIdInTheDatabaseThenValidateReturnObject() { ... } // What? Bad!
```

### Let the type-checker do its thing

This mostly applies to programming languages that have type checking. Using the example above with the variable name `salesOrderList`, don't specify the type of a variable in the name. The type-checker already gives us this information. Switching languages (slightly), let's see an example of this in Typescript.

```js
let salesOrderList: SalesOrder[] = []; // We already know the type!
let salesOrders: SalesOrder[] = []; // Better!

let nameString = "Name"; // :(
let name = "Name"; // :D
```

### Use the features of the language

Aside from taking advantage of a type-checker. Look at making good use of a programming language's other grouping features! What I mean by 'grouping features' are things like **class** and **namespace**. There is generally no need to repeat the names of a namespace in a class. Similarly, the same can be applied to repeating class names in a method.

```js
/* It's easy to get lost what's going on. (SalesOrder.SalesOrder.SalesOrder(...)) */
namespace SalesOrder {
  class SalesOrder {
    function SalesOrder() {
      ...
    }
  }
}

/*
 * Following our naming structure, it's extremely easy to figure out what's going on
 * while not repeating ourselves.
 * (Repositories.SalesOrder.GetById(...))
 */
namespace Repositories {
  class SalesOrder {
    function GetById() {
      ...
    }
  }
}

/*
 * This is also perfectly fine, as namespaces generally get include/using/import 'd away
 * to not be seen.
 * (SalesOrderRepository.GetById(...))
 */
namespace Repositories {
  class SalesOrderRepository {
    function GetById() {
      ...
    }
  }
}
```

## Whitespace

No, this isn't tabs vs. spaces. Pick one, then roll with it. What I mean by whitespace is that consistent line-breaks and whitespace between statements of code is extremely valuable. Just like we break logical sections of code into classes/functions/files/etc, we should also separate explicit blocks of code with whitespace.

```js
// Anyone else going cross-eyed? Remember, write code for humans!
function add(a, b) {
  return a + b;
}
function doStuff(a, b) {
  let j = add(a, b);
  if (j > 2) {
    j = 5;
  } else {
    return a;
  }
  for (let i = 0; i < 20; i++) {
    j += i;
  }
  return j;
}
```

```js
// Much better! Statements are separated by new-lines to give context,
// and makes it a lot easier to read!
function add(a, b) {
  return a + b;
}

function doStuff(a, b) {
  let j = a + b;

  if (j > 2) {
    j = 5;
  } else {
    return a;
  }

  for (let i = 0; i < 20; i++) {
    j += i;
  }

  return j;
}
```

To sum it up, leave atleast one blank line before and after:

- **if/else** statements
- **for/while** loops
- **functions/methods/classes/namespaces**

and one blank line before:

- **return** statements at the end of functions

## Functions/Methods

We can take a lot of useful ideas from functional programming ([I give an introduction of function programming here!](/posts/functional-programming/)) when it comes to writing clean code. Let's look at one of these ideas from the functional programming paradigm.

### Only do one thing!

Functions/Methods should only do one thing. Living up to this philosophy makes testing functions easier, swapping functions or other functions trivial, and debugging a breeze!

While naming our function, we are good programmers and give a good descriptive name. But, there are a few dead give aways that a function is doing more work than it should if we see `or` or `and` in the name.

```js
// Common occurance of OR!
function updateOrCreate() {
  ...
}

// Better!
function update() {
  ...
}

function create() {
  ...
}
```

Don't just avoid `or` or `and` while naming functions--be honest with yourself! It'll help with keeping your code more maintainable!

---

### Finally,

**Be Consistent!**

The biggest aspect of writing clean code, even if you end up not using any of the styles above, is to be consistent! Keeping you and your team's coding style the same makes it easier to get up to speed with current projects, and any future endeavors.
