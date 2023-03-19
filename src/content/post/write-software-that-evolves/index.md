---
title: "Write Software that Evolves"
tags: ["Software Engineering"]
date: "2018-07-29"
published: true
---

In software development, we can easily get trapped in [analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis). Having the foresight to make all the correct decisions is hard. We make hundreds, if not thousands, of decisions during the lifetime of our software, and we're likely to get something wrong. Instead of trying to get every minutia correct before starting a project, we should aim to write software that can evolve.

### Continuous Minimum Viable Product Development

One approach to combat the constant changing of requirements is to strive for continuous minimum viable product (MVP) development. An MVP is the most basic version of a feature or application that satisfies a need. For example, let's say our client wants the ability to view some information. We may only design a page with a table that holds the data (We wouldn't add additional features like filtering or graphs). Notice how I said _continuous_. This process shouldn't end after the application/feature is released. Keeping improvements incremental and small allows us to be flexible in our requirements. Do no more or less than what's being asked.

### Lazy Evaluation

> “I’m sure the user would need this feature. It’s easy, I’ll just add it”

This kind of thinking is a killer to flexible software. First, every line of code has a cost. Not only are there time, money, and energy in initially writing the code, but also the maintenance and surface area for bugs create its own cost. Second, the feature added could never be used by the user or just wrong! In the best scenario, this doubles the amount of work adding the feature.

Instead of eagerly evaluating requirements, flexible software works best through lazy evaluation. Wait for the client/stakeholder/user to ask for a feature before implementing it (even on improvements you know they'll ask for). Lazy evaluation has a few benefits. It reduces adding features the user won't use--they asked for it. It also allows us to really understand what the user is really asking for. Instead of creating something then asking, "is this what you want?" we're able to get upfront the ideal process.

### Summary

Instead of picking a target and firing--hoping we hit something, combining continuous MVP and lazy evaluation keeps us agile. It allows firing in a direction and incrementally changing course as the target moves. Of course, do your homework and gather requirements beforehand, but aim for software that can evolve over time instead of trying to get it right from the start.
