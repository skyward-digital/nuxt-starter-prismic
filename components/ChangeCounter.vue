<template>
  <div>
    <Counter />
    <div class="flex justify-center gap-2">
      <button
        class="py-2 px-5 bg-green-500 text-white rounded-xl"
        @click="increment"
      >
        Increment
      </button>
      <button
        class="py-2 px-5 bg-red-500 text-white rounded-xl"
        @click="decrement"
      >
        Decrement
      </button>
    </div>
  </div>
</template>

<script setup>
import Counter from "./Counter";

// Ref is used to allow the DOM to render live updates on the state, in the case it will be 'count'.
const count = ref(0);

/**
 * Provide is used to "provide" a variable to child components,
 * no matter how deep they are in the hierarchy.
 *
 * Since the 'count' variable above is reactive,
 * it will automatically send changes down to the child components.
 *
 * View the 'Counter' child component to see how we 'inject' the variable.
 */

provide("count", count);

// These two functions are used to manipulate the 'count.value' state.
const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>
