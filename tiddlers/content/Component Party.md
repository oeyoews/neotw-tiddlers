## Reactivity

## Declare state

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function Name() {
  const [name] = useState("John");

  return <h1>Hello {name}</h1>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";
const name = ref("John");
</script>

<template>
  <h1>Hello {{ name }}</h1>
</template>
```

## Update state

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useEffect, useState } from "react";

export default function Name() {
  const [name, setName] = useState("John");

  useEffect(() => {
    setName("Jane");
  }, []);

  return <h1>Hello {name}</h1>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";
const name = ref("John");
name.value = "Jane";
</script>

<template>
  <h1>Hello {{ name }}</h1>
</template>
```

## Computed state

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function DoubleCount() {
  const [count] = useState(10);
  const doubleCount = count * 2;

  return <div>{doubleCount}</div>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, computed } from "vue";
const count = ref(10);
const doubleCount = computed(() => count.value * 2);
</script>

<template>
  <div>{{ doubleCount }}</div>
</template>
```

## Templating

## Minimal template

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
export default function HelloWorld() {
  return <h1>Hello world</h1>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<template>
  <h1>Hello world</h1>
</template>
```

## Styling

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import "./style.css";

export default function CssStyle() {
  return (
    <>
      <h1 className="title">I am red</h1>
      <button style={{ fontSize: "10rem" }}>I am a button</button>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<template>
  <h1 class="title">I am red</h1>
  <button style="font-size: 10rem">I am a button</button>
</template>

<style scoped>
.title {
  color: red;
}
</style>
```

## Loop

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
export default function Colors() {
  const colors = ["red", "green", "blue"];
  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
const colors = ["red", "green", "blue"];
</script>

<template>
  <ul>
    <li
      v-for="color in colors"
      :key="color"
    >
      {{ color }}
    </li>
  </ul>
</template>
```

## Event click

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={incrementCount}>+1</button>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";
const count = ref(0);

function incrementCount() {
  count.value++;
}
</script>

<template>
  <p>Counter: {{ count }}</p>
  <button @click="incrementCount">+1</button>
</template>
```

## Dom ref

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useEffect, useRef } from "react";

export default function InputFocused() {
  const inputElement = useRef(null);

  useEffect(() => inputElement.current.focus(), []);

  return <input type="text" ref={inputElement} />;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, onMounted } from "vue";

const inputElement = ref();

onMounted(() => {
  inputElement.value.focus();
});
</script>

<template>
  <input ref="inputElement">
</template>
```

## Conditional

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

const TRAFFIC_LIGHTS = ["red", "orange", "green"];

export default function TrafficLight() {
  const [lightIndex, setLightIndex] = useState(0);

  const light = TRAFFIC_LIGHTS[lightIndex];

  function nextLight() {
    setLightIndex((lightIndex + 1) % TRAFFIC_LIGHTS.length);
  }

  return (
    <>
      <button onClick={nextLight}>Next light</button>
      <p>Light is: {light}</p>
      <p>
        You must
        {light === "red" && <span>STOP</span>}
        {light === "orange" && <span>SLOW DOWN</span>}
        {light === "green" && <span>GO</span>}
      </p>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, computed } from "vue";
const TRAFFIC_LIGHTS = ["red", "orange", "green"];
const lightIndex = ref(0);

const light = computed(() => TRAFFIC_LIGHTS[lightIndex.value]);

function nextLight() {
  lightIndex.value = (lightIndex.value + 1) % TRAFFIC_LIGHTS.length;
}
</script>

<template>
  <button @click="nextLight">Next light</button>
  <p>Light is: {{ light }}</p>
  <p>
    You must
    <span v-if="light === 'red'">STOP</span>
    <span v-else-if="light === 'orange'">SLOW DOWN</span>
    <span v-else-if="light === 'green'">GO</span>
  </p>
</template>
```

## Lifecycle

## On mount

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState, useEffect } from "react";

export default function PageTitle() {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setPageTitle(document.title);
  }, []);

  return <p>Page title: {pageTitle}</p>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, onMounted } from "vue";
const pageTitle = ref("");
onMounted(() => {
  pageTitle.value = document.title;
});
</script>

<template>
  <p>Page title: {{ pageTitle }}</p>
</template>
```

## On unmount

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <p>Current time: {time}</p>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, onUnmounted } from "vue";

const time = ref(new Date().toLocaleTimeString());

const timer = setInterval(() => {
  time.value = new Date().toLocaleTimeString();
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <p>Current time: {{ time }}</p>
</template>
```

## Component composition

## Props

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import UserProfile from "./UserProfile.jsx";

export default function App() {
  return (
    <UserProfile
      name="John"
      age={20}
      favouriteColors={["green", "blue", "red"]}
      isAvailable
    />
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import UserProfile from "./UserProfile.vue";
</script>

<template>
  <UserProfile
    name="John"
    :age="20"
    :favourite-colors="['green', 'blue', 'red']"
    is-available
  />
</template>
```

## Emit to parent

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";
import AnswerButton from "./AnswerButton.jsx";

export default function App() {
  const [isHappy, setIsHappy] = useState(true);

  function onAnswerNo() {
    setIsHappy(false);
  }

  function onAnswerYes() {
    setIsHappy(true);
  }

  return (
    <>
      <p>Are you happy?</p>
      <AnswerButton onYes={onAnswerYes} onNo={onAnswerNo} />
      <p style={{ fontSize: 50 }}>{isHappy ? "😀" : "😥"}</p>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";
import AnswerButton from "./AnswerButton.vue";

let isHappy = ref(true);

function onAnswerNo() {
  isHappy.value = false;
}

function onAnswerYes() {
  isHappy.value = true;
}
</script>

<template>
  <p>Are you happy?</p>
  <AnswerButton
    @yes="onAnswerYes"
    @no="onAnswerNo"
  />
  <p style="font-size: 50px">
    {{ isHappy ? "😀" : "😥" }}
  </p>
</template>
```

## Slot

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
  return <FunnyButton>Click me!</FunnyButton>;
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import FunnyButton from "./FunnyButton.vue";
</script>

<template>
  <FunnyButton> Click me! </FunnyButton>
</template>
```

## Slot fallback

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import FunnyButton from "./FunnyButton.jsx";

export default function App() {
  return (
    <>
      <FunnyButton />
      <FunnyButton>I got content!</FunnyButton>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import FunnyButton from "./FunnyButton.vue";
</script>

<template>
  <FunnyButton />
  <FunnyButton> I got content! </FunnyButton>
</template>
```

## Context

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState, createContext } from "react";
import UserProfile from "./UserProfile";

export const UserContext = createContext();

export default function App() {
  // In a real app, you would fetch the user data from an API
  const [user, setUser] = useState({
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com",
  });

  function updateUsername(newUsername) {
    setUser((userData) => ({ ...userData, username: newUsername }));
  }

  return (
    <>
      <h1>Welcome back, {user.username}</h1>
      <UserContext.Provider value={{ ...user, updateUsername }}>
        <UserProfile />
      </UserContext.Provider>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref, provide } from "vue";
import UserProfile from "./UserProfile.vue";

const user = ref({
  id: 1,
  username: "unicorn42",
  email: "unicorn42@example.com",
});

function updateUsername(username) {
  user.value.username = username;
}

provide("user", { user, updateUsername });
</script>

<template>
  <h1>Welcome back, {{ user.username }}</h1>
  <UserProfile />
</template>
```

## Form input

## Input text

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function InputHello() {
  const [text, setText] = useState("Hello world");

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <>
      <p>{text}</p>
      <input value={text} onChange={handleChange} />
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";
const text = ref("Hello World");
</script>

<template>
  <p>{{ text }}</p>
  <input v-model="text">
</template>
```

## Checkbox

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function IsAvailable() {
  const [isAvailable, setIsAvailable] = useState(false);

  function handleChange() {
    setIsAvailable(!isAvailable);
  }

  return (
    <>
      <input
        id="is-available"
        type="checkbox"
        checked={isAvailable}
        onChange={handleChange}
      />
      <label htmlFor="is-available">Is available</label>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";

const isAvailable = ref(true);
</script>

<template>
  <input
    id="is-available"
    v-model="isAvailable"
    type="checkbox"
  >
  <label for="is-available">Is available</label>
</template>
```

## Radio

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

export default function PickPill() {
  const [picked, setPicked] = useState("red");

  function handleChange(event) {
    setPicked(event.target.value);
  }

  return (
    <>
      <div>Picked: {picked}</div>

      <input
        id="blue-pill"
        checked={picked === "blue"}
        type="radio"
        value="blue"
        onChange={handleChange}
      />
      <label htmlFor="blue-pill">Blue pill</label>

      <input
        id="red-pill"
        checked={picked === "red"}
        type="radio"
        value="red"
        onChange={handleChange}
      />
      <label htmlFor="red-pill">Red pill</label>
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";

const picked = ref("red");
</script>

<template>
  <div>Picked: {{ picked }}</div>

  <input
    id="blue-pill"
    v-model="picked"
    type="radio"
    value="blue"
  >
  <label for="blue-pill">Blue pill</label>

  <input
    id="red-pill"
    v-model="picked"
    type="radio"
    value="red"
  >
  <label for="red-pill">Red pill</label>
</template>
```

## Select

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import { useState } from "react";

const colors = [
  { id: 1, text: "red" },
  { id: 2, text: "blue" },
  { id: 3, text: "green" },
  { id: 4, text: "gray", isDisabled: true },
];

export default function ColorSelect() {
  const [selectedColorId, setSelectedColorId] = useState(2);

  function handleChange(event) {
    setSelectedColorId(event.target.value);
  }

  return (
    <select value={selectedColorId} onChange={handleChange}>
      {colors.map((color) => (
        <option key={color.id} value={color.id} disabled={color.isDisabled}>
          {color.text}
        </option>
      ))}
    </select>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import { ref } from "vue";

const selectedColorId = ref(2);

const colors = [
  { id: 1, text: "red" },
  { id: 2, text: "blue" },
  { id: 3, text: "green" },
  { id: 4, text: "gray", isDisabled: true },
];
</script>

<template>
  <select v-model="selectedColorId">
    <option
      v-for="color in colors"
      :key="color.id"
      :value="color.id"
      :disabled="color.isDisabled"
    >
      {{ color.text }}
    </option>
  </select>
</template>
```

## Webapp features

## Render app

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
<!doctype html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.jsx"></script>
  </body>
</html>
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<!doctype html>
<html>
  <body>
    <div id="app"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

## Fetch data

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

```
import useFetchUsers from "./useFetchUsers";

export default function App() {
  const { isLoading, error, data: users } = useFetchUsers();

  return (
    <>
      {isLoading ? (
        <p>Fetching users...</p>
      ) : error ? (
        <p>An error occurred while fetching users</p>
      ) : (
        users && (
          <ul>
            {users.map((user) => (
              <li key={user.login.uuid}>
                <img src={user.picture.thumbnail} alt="user" />
                <p>
                  {user.name.first} {user.name.last}
                </p>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

```
<script setup>
import useFetchUsers from "./useFetchUsers";

const { isLoading, error, data: users } = useFetchUsers();
</script>

<template>
  <p v-if="isLoading">Fetching users...</p>
  <p v-else-if="error">An error ocurred while fetching users</p>
  <ul v-else-if="users">
    <li
      v-for="user in users"
      :key="user.login.uuid"
    >
      <img
        :src="user.picture.thumbnail"
        alt="user"
      >
      <p>
        {{ user.name.first }}
        {{ user.name.last }}
      </p>
    </li>
  </ul>
</template>
```

## Router link

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

With [NextJS](https://nextjs.org/docs/api-reference/next/link)

```
import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About us</Link>
      </li>
    </ul>
  );
}
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

With [Nuxt 3](https://v3.nuxtjs.org/guide/directory-structure/pages#navigation)

```
<template>
  <ul>
    <li>
      <NuxtLink to="/"> Home </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/about"> About us </NuxtLink>
    </li>
  </ul>
</template>
```

## Routing

### ![react](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/react.svg) React

With [NextJS](https://nextjs.org/docs/basic-features/pages)

```
|-- pages/
    |-- index.js // index page "/"
    |-- about.js // about page "/about"
    |-- 404.js // handle error HTTP 404 page not found
    |-- 500.js // handle error HTTP 500
    |-- _app.js // global app layout
```

With [Remix](https://remix.run/docs/en/v1/guides/routing)

```
|-- root.jsx // global app layout
|-- routes/
    |-- index.jsx // index page "/"
    |-- about.jsx // about page "/about"
    |-- $.jsx // fallback page
```

### ![vue3](https://raw.githubusercontent.com/matschik/component-party/main/public/framework/vue.svg) Vue 3

With [Nuxt 3](https://v3.nuxtjs.org/guide/directory-structure/pages)

```
|-- pages/
    |-- index.vue // index page "/"
    |-- about.vue // about page "/about"
```
