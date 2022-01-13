<template>
  <div class="mt-10 mb-5">
    <p class="text-center text-2xl">Example Counter Using Inject/Provide</p>
    <p class="text-center mt-3 text-xl">Count: {{ count }}</p>
  </div>
</template>

<script setup>
const count = inject("count");

/**
 * We are pulling in the 'count' variable from the provider.
 *
 * Notice that we are not using any props in this instance to pass down data.
 *
 * This is a basic example since we are only going down 1 level so props would be a more
 * sensible approach. However, this just shows an example of how we would access the 'count' variable,
 * no matter how deep the child component is in the hierarchy.
 */
</script>
