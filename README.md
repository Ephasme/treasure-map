# Treasure Map

This project is a test for Carbon.it.

You have to have Node.JS 11+ and Yarn 1.15.2+ installed on your machine.

To run it you can use the `yarn start` command.

You have the `--filename` option in order to choose your input as well as the `--output` option in order to choose your output filename.

## Note on application structure

I adopted TypeScript with a very functional approach. For the DI I opted for a pure DI and curry functions factories. I also chose to use immutability in order to have a very easy to reason architecture. Everything in the app state is readonly, each state is computed with reducers (redux style) and mutations are triggered via dispatch function and orchestrated with commands.

The higher order functions are designed with CQRS in mind: commands can dispatch mutations and queries are state agnostic.

All of this makes my code very testable and very easy to maintain. Adding behaviour can be achieved without altering what already exists and side effects aren't very likely to happen. It also diminishes the likelyhood of regressions.

I have 78 unit tests and a snapshot test which ensure that the result is correct.
I have 3 integration tests with the `run.test.ts` file.
I added a test coverage metrics which is higher than 97%.

## What I would improve

I think I would separate the unit tests and the integ tests more distinctly and remove the integ tests from the coverage.
I think there are some optimisations to do by merging the TREASURE_FOUND and ADVENTURER_FOUND_TREASURE mutations.

## Conclusion

I was happy to do this test. I hope it will please you and comfort your idea that I'm worthy of you interest.

Please don't hesitate to give me feedback I will listen to it carefully.
