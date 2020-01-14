---
title: "Making React Fast: Tips on Optimizing ReactJS"
tags: ["React", "Javascript"]
path: "/blog/making-react-fast"
image: 14191719577_2a8423ce9b_c.jpg
date: "2020-01-13"
---

React does a fantastic job abstracting away the rendering of webpages. When state changes, our UI's reflect it. Have you ever gotten done writing your application just to notice things seem off? Clicking a button to display a popover studders for a second. Or, animations don't run smoothly. React is just a view layer. There is a single bottleneck causing "jank" (studdering in the interaction with a view)... Rendering. If our applications never had to render they'd all be blazing fast running at millions of frames per second (I had top scientists run the numbers)! Unfortunitely, or maybe fortunitely, we don't live in that world.

Because most devices have screens refreshing 60 times a second, our applications have very little time to update, render, and interact with users. [According to Google all work needs to be completed within 10ms](https://developers.google.com/web/fundamentals/performance/rendering/).

<br />
This isn't much time!

### What causes React to render?

// TODO

### shouldComponentUpdate()

// TODO

### PureComponent/Memo

// TODO

### Extracting Components

// TODO
