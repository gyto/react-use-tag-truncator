# useTagTruncator

## Installation

---

```
yarn add react-use-tag-truncator
```
```
npm install react-use-tag-truncator
```

## TODO

---

Minor stuff need to be done in project:
- [ ] Fix remaining flowtype errors
- [x] Demo
- [ ] Test


## Usage

---

```js

import useTagTruncator from "react-use-tag-truncator";

const App = () => {
  const [
    containerRef,
    isExtended,
    toggleExtend,
    hiddenCount,
  ] = useTagTruncator();
  
  return (
    <ul
      ref={containerRef}
      style={{
        maxHeight: isExtended ? "none" : "65px",
        width: "300px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {Array.from({ length: 26} ).map((_, index) => (
        <li key={index}>item #{index + 1}</li>
      ))}
      <li onClick={toggleExtend}>
        {isExtended ? "Hide" : `+ ${hiddenCount} more...`}
      </li>
    </ul>
  )
}
```

## Licence

---

MIT


---

Credit to [react-truncate-list](https://github.com/maladr0it/react-truncate-list)
