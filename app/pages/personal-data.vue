<template>
  <section>
    <h4 class="text-h4 mb-6">Personal Data</h4>

    <v-tabs v-model="activeTab" grow class="mb-6">
      <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          :to="`/personal-data/${tab.path}`"
          replace
          border="2"
      >
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="blue"
        :height="2"
    />

    <v-snackbar
        v-model="showSnackbar"
        location="top"
        timeout="2000"
        color="success"
        text="Data was updated successfully!"
    />

    <v-card v-if="meData" class="pa-6">
      <NuxtPage :me="meData" @update="updateMeDetails" />
    </v-card>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from '#imports';

const route = useRoute();

const tabs = [
  { path: 'personal', label: 'Personal' },
  { path: 'bank', label: 'Bank Data' },
  { path: 'tax', label: 'Tax Data' }
];

const activeTab = ref(route.path);
const meData = ref(null)
const isLoading = ref(false);
const showSnackbar = ref(false);

const loadMeDetails = async () => {
  isLoading.value = true;
  try {
    meData.value = await $fetch('/api/me');
  } catch (err) {
    console.error('Failed to load /api/me:', err);
  } finally {
    isLoading.value = false;
  }
};

const updateMeDetails = async (payload) => {
  isLoading.value = true;
  try {
    meData.value = await $fetch('/api/me', {
      method: 'PUT',
      body: payload
    });
    showSnackbar.value = true; // show successful alert after request
  } catch (err) {
    console.error('Failed to update /api/me:', err);
  } finally {
    isLoading.value = false;
  }
};

// set active tab when route changes
watch(() => route.path, (path) => {
  activeTab.value = path;
});

onMounted(loadMeDetails);
</script>
