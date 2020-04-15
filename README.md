<div align="center">
  <img width="250" src="https://raw.githubusercontent.com/UniLogin/reactive-properties/master/logo.png">
  <br>

[![NPM](https://img.shields.io/npm/v/reactive-properties.svg)](https://www.npmjs.com/package/reactive-properties)
[![CircleCI](https://img.shields.io/circleci/build/github/UniLogin/reactive-properties/master.svg)](https://circleci.com/gh/UniLogin/reactive-properties/tree/master)
[![License](https://img.shields.io/github/license/UniLogin/reactive-properties.svg)](https://github.com/UniLogin/reactive-properties/blob/master/UNLICENSE)

</div>

# reactive-properties

A lightweight alternative for RX and Redux, that utilises react hooks and dramatically reduces the amount of boiler plate code for the typical React application.

## Installation
```
npm install --save reactive-properties
yarn add reactive-properties
```

## Documetation

### `Property`

```typescript
interface Property<T> {
  
  get(): T // returns the current value

  subscribe(callback: () => void): () => void // subscribe to future values

}
```

Property is just a variable that can be observed.

To get the current value use the `get` method. To subscribe to future updates, use the `subscribe` method. Subscribe returns a function which can be called to unsubscribe from updates.

#### Piping

For developer convenience all properties have a `pipe` method. It can be used to apply operators to a property.

```typescript
property.pipe(
  withEffect(() => { ... }),
  map(x => x * 2),
)
```

### `State`

Simplest property implementation. You provide the default value and can call the `set` method to update the value.

```typescript
const state = new State(5)

console.log(state.get()) // prints 5

state.set(42)

console.log(state.get()) // prints 42

state.subscribe(() => console.log('Update:', state.get()))

state.set(99) // "Update: 99" is printed to the console

```

Sends update notifications to all subscribers when the new value is set.


### `combine`

Used to combine multiple properties into one.

```typescript
const a = new State(2)
const b = new State(2)

const sum = combine([a, b], (a, b) => a + b) // sum is 4

b.set(5) // sum is now 7

a.set(6) // sum is now 11
```

Updates every time when one of the source properties update.

### `map` operator

Works similarly to `Array.map`. Creates a new property which will always have values that are obtained by mapping the original property's values with the provided function.

### `withEffect` operator

Provides a way to add custom imperative logic when something starts observing the property.

```typescript
property.pipe(
  withEffect(() => {
    console.log('Property started to be observed')

    return () => console.log('All observers unsubscribed')
  })
)
```

Works similarly to `React`'s `useEffect`. Can be usefull to start and stop background tasks when user visits a specific page, for example.


### `forEach` operator

Calls provided callback for each value that a property has. Including the current one.

### `waitFor` operator

Converts the property to a promise that resolves when the provided predicate returns true. Promise resolves with the first value that matched the predicate.

### `dedupBy` operator

Stops updates when property values don't change. Example:

```typescript
const state = new State(0)

state.forEach(console.log) // prints 0

state.set(0) // nothing printed

state.set(1) // prints 1

state.set(1) // nothing printed
```
