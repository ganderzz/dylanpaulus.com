---
layout: post
title: "Getting Started: Learning Elm
category: "elm"
---

# Getting Started: Learning Elm

### Getting Started

We'll create a very basic program. When the mouse moves, print its position. 

First, we'll need to create a directory we'll be writing out Elm code in (`mkdir elm-mouse && cd elm-mouse`). After creating the directory and navigating inside it, run the following terminal command to scaffold the project: `elm-make`. Elm will automatically download the required packages, and set up an **elm-project.json** file for keeping track of dependencies. This is similar to the **package.json** file NPM uses.

For this project, we'll need an additional package. The Mouse package. Let's install it by running the command: `elm-package install elm-lang/mouse`.

Create a new file called **main.elm**. This is where the entirety of the program will live.

### Scaffolding

In Elm files are put into modules, giving us a way to separate out common code blocks. We'll start out defining our own module... let's call it **Main**.

```
module Main exposing (..)
```

This code looks fine, but what is this `exposing (..)` bit? Think of exposing like `export` in ES6 JavaScript. **exposing** tells Elm what we want the outside world to have access to. In the case above, we will export *everything*. Again, think of `(..)` as sayings `export *` (If we had the ability in JS!).

Next, we'll import the external modules we'll be using in our program.

```
import Html exposing (program, div, text)
import Mouse
```

This is very similar to JavaScript's import. We'll import only *program, div, and text* from the HTML modules, and then import everything from the Mouse module.

 Reflecting back, our code in **main.elm** should look like:

 ```
module Main exposing (..)

import Html exposing (program, div, text)
import Mouse
 ```


### Elm Architecture