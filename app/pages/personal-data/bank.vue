<template>
  <v-form
      v-model="isFormValid"
      @submit.prevent="emit('update', { bankDetail: form })"
  >
    <v-row>
      <v-col cols="6">
        <h6 class="text-h6 mb-4">Bank details</h6>

        <v-text-field
            v-model="form.bankId"
            label="Bank ID"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.bankName"
            label="Bank name"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.bankBic"
            label="Bank BIC"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
      </v-col>

      <v-col cols="6">
        <div class="mb-12"></div>

        <v-text-field
            v-model="form.iban"
            label="IBAN"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.id"
            label="ID"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.payee"
            label="Payee"
            variant="outlined"
            :rules="[requiredRule]"
        />
      </v-col>

      <v-col cols="12">
        <h6 class="text-h6 mb-2">Payment method</h6>
        <v-radio-group v-model="form.paymentMethod" :rules="[requiredRule]" color="primary" hideDetails>
          <v-radio label="Cash" value="cash" />
          <v-radio label="Bank Transfer" value="transfer" />
          <v-radio label="Cheque" value="cheque" />
        </v-radio-group>
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

const { requiredRule } = useValidationRules();

const isFormValid = ref(true);
const form = reactive({ ...props.me.bankDetail });
form.paymentMethod ||= 'cash'; // set default paymentMethod value
</script>
