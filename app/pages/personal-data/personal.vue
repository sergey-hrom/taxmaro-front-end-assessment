<template>
  <v-form v-model="isFormValid" @submit.prevent="onSubmit">
    <v-row>
      <v-col cols="6">
        <h6 class="text-h6 mb-4">General</h6>

        <v-text-field
            v-model="form.firstName"
            label="First name"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.lastName"
            label="Last name"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.email"
            label="Email"
            variant="outlined"
            :rules="[requiredRule, emailRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.phone"
            label="Phone"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.position"
            label="Position"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.department"
            label="Department"
            variant="outlined"
        />
      </v-col>
      <v-col cols="6">
        <h6 class="text-h6 mb-4">Address</h6>

        <v-text-field
            v-model="form.country"
            label="Country"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.city"
            label="City"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.state"
            label="State"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.zip"
            label="Zip"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.address"
            label="Street"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
      </v-col>
    </v-row>
    <SubmitBtn :isDisabled="!isFormValid" />
  </v-form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useValidationRules } from '~/composables/useValidationRules';
import SubmitBtn from '~/components/SubmitBtn';

const props = defineProps({ me: { type: Object, required: true } });

const emit = defineEmits(['update']);

const { requiredRule, emailRule } = useValidationRules();

const isFormValid = ref(true);
const form = reactive({ ...props.me });

const onSubmit = () => {
  const { bankDetail, insurance, tax, ...rest } = form;
  emit('update', rest);
};
</script>
