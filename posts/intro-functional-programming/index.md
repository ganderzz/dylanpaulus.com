---
title: "Intro to Functional Programming"
tags: ["Functional Programming", "Javascript"]
date: "2019-03-31"
published: true
---

This post comes from an example I presented at [Boise Code Camp 2019](http://www.boisecodecamp.org/) comparing imperative and functional ways of solving problems. The goal was not to teach functional programming in its entirety, but introduce a different way of thinking that is outside of traditional approaches (loops, mutation, etc). Having a different frame of reference adds more tools to the toolbox when faced with a problem.

The foundation of functional programming can be presented in three main ideas:

- Immutable Data Structures
- Pure Functions
- First Class Functions

Let's go quickly into what each of these bullets mean.

### Immutable Data Structures

When working in a programming language like JavaScript, we can assign data to variables `let myVariable = 5;`. But, nothing stops up from reassigning the variable to something else later on `myVariable = "Now I'm a string."`. This can be dangerous--maybe another function relies on `myVariable` to be a number, or what if some asynchronous functions are both working on `myVariable` at the same time! We could run into merge conflicts.

#### Example

```javascript
const obj = {
  a: 1,
  b: 2,
};

function addOne(input) {
  return {
    a: input.a + 1,
    b: input.b + 1,
  };
}

const newObj = addOne(obj);

newObj === obj; // false
```

### Pure Functions

Pure functions are side effect free. What does that mean? Well, a function that calculates an output based solely on it's input can be considered a pure function. If our function takes an input, performs a database update, then returns a value, then we contain a side effect in our code--updating the database. Calling the function multiple times might not always return the same result (out of memory, database is locked, etc). Having pure functions is crucial in helping us write bug-free, easily testable code.

#### Example

```javascript
function notPureAdd(a, b) {
  return a + new Date().getMilliseconds();
}

function pureAdd(a, b) {
  return a + b;
}
```

### First Class Functions

The term First Class might seem strange, but all it means is that functions can be passed around and used just like we might use other data-types. For example, strings, ints, floats, etc. A programming language that supports first class functions allow us to pass functions into other functions. Think of this like dependency injection. If you've worked with JavaScript first class functions are used everywhere, and we'll touch on them more in the coming examples.

#### Example

```javascript
// robot expects a function to be passed in
function robot(voiceBox) {
  return voiceBox("bzzzz");
}

// console.log is a function that logs to the console
robot(console.log);
// alert is a function that shows a dialog box
robot(alert);
```

### Comparing Imperative and Functional Programming

To show a basic comparison between imperative and functional programming let's add the numbers in an array `[1, 2, 3, 4]` and get its sum.

Imperatively we might write something like:

```javascript
const list = [1, 2, 3, 4];

let sum = 0;

for (let i = 0; i < list.length; i++) {
  sum += list[i];
}

console.log(sum); // 10
```

Converting this to be in a functional style, we have one big problem. We mutate `sum` to have a different value at every iteration of the list. Remember... immutable data structures.

To make this code functional, let's break down how a summation is calculated.

First, we start at some value, which in our case is `0` (see the line `let sum = 0;`)! Next, we pull out the first item in the array `1` and add it to our sum. Now we have `0 + 1 = 1`. We then repeat this step pulling out `2` and adding it to the sum `1 + 2 = 3`. This continues on until we have traversed the length of the array.

To visualize this in a different way:

```javascript
0 + [1,2,3,4] 0 + 1 + [2,3,4] 1 + 2 + [3,4] 3 + 3 + [4] 6 + 4 10
```

We can think of this algorithm as two separate functions, first we need some way of adding numbers together.

```javascript
function add(a, b) {
  return a + b;
}
```

_Easy!_

Next we'll need some way of looping through an array given to us. Since most functional programming generally relies on recursion instead of loops, we'll create a recursive function that'll loop through our array. Let's look at what that may look like.

```javascript
function loop(list, index = 0) {
  if (!list || index > list.length - 1) {
    // We're at the end of the list
    return;
  }

  return loop(list, index + 1);
}
```

In this function we take the list we want to loop through, and an index we'll use to determine the position in the list we're currently at. If we reach the end of the list, or an invalid list is given, then we're done looping. If not, we'll call `loop` again, incrementing the index. Try adding a `console.log(list[index])` inside the loop function, before `return loop(list, index + 1);`! We should see `1 2 3 4` printed to the console!

To finally sum our array, we'll need to combine both our `loop` and `add` functions. Keep in mind our algorithm above while going through this example:

```javascript
function loop(list, accu = 0, index = 0) {
  if (!list || index > list.length - 1) {
    return accu;
  }

  const result = add(accu, list[index]);

  return loop(list, result, index + 1);
}
```

We rearranged some arguments in the `loop` function. Now we have an `accu` parameter (accumulation), which will keep track of the sum at a given place in the list. We also directly use our `add` function to get the result of the `accu` added with the current item in the list. If we `console.log(loop(list));` we should get the result `10` printed to the console!

How about we take this a step further? What if we didn't want to sum up the list of numbers, but instead multiply them? Currently we'd have to copy our `loop` function, paste it, and change `add` to be something else (`multiply` maybe?). What a pain! Remember first class functions? We'll we can use that idea here to make our code greatly more generic.

```javascript
function loop(func, list, accu = 0, index = 0) {
  if (!list || index > list.length - 1) {
    return accu;
  }

  const result = func(accu, list[index]);

  return loop(func, list, result, index + 1);
}
```

In the example above, the only thing that changed is that we now added a new argument to `loop` that takes a function. Instead of `add`, we'll call our passed in function to get a result. Now we can very easily `add`, `multiply`, `subtract`, etc our list.

- `loop(add, list);`
- `loop(function(a, b) { return a * b; }, list);`

We are no longer just looping through our array, but folding our array like paper until we reach a single result. In functional programming this function might be called `fold`, and in Javascript we see it as `reduce`!

```javascript
function reduce(func, list, accu = 0, index = 0) {
  if (!list || index > list.length - 1) {
    return accu;
  }

  const result = func(accu, list[index]);

  return reduce(func, list, result, index + 1);
}
```

### End

We looked at the basics of functional programming, and how breaking down a problem can give us different solutions to the same problem. `reduce` is seen as the foundation for other operations like `map()` or `filter()`. Here is my test for you, how can we implement these two functions only using our `reduce()` we just created?

_Hint_

Remember the algorithm for reduce?

```javascript
0 + [1,2,3,4] 0 + 1 + [2,3,4] 1 + 2 + [3,4] 3 + 3 + [4] 6 + 4 10
```

What if instead of starting with `0` we start with an `[]` array instead ?

[Answer](https://jsbin.com/femoburako/1/edit?js,console)
