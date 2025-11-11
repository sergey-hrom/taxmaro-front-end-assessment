<template>
  <div class="text-center">
    <v-btn
        class="mt-4"
        :disabled="isDisabled"
        type="submit"
        color="primary"
        size="x-large"
        width="250"
        rounded="xs"
        density="comfortable"
    >
      Save
    </v-btn>
  </div>
</template>

<script setup>
defineProps({ isDisabled: { type: Boolean, default: false } });
</script>
