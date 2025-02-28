```vue
<script setup lang="ts">
import Son from './Son.vue';

const son = ref<InstanceType<typeof Son> | null>(null);

son.value?.sayHello();
</script>

<template>
  <Son ref="child" name="son" />
</template>

```


```vue
<script setup lang="ts">
interface Props {
  name: string;
}

function sayHello() {}

defineExpose({
  sayHello,
});

withDefaults(defineProps<Props>(), {
  name: '88',
});
</script>

<template>
  {{ name }}
</template>

```
