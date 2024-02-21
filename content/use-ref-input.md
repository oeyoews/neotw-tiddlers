```tsx
const inputRef = useRef<HTMLInputElement>(null);

const getFocus = () => {
  inputRef.current?.focus();
};

<input type="text" ref={inputRef} />
```