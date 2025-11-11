<template>
  <v-form v-model="isFormValid" @submit.prevent="emit('update', form)">
    <v-row>
      <v-col cols="6">
        <h6 class="text-h6 mb-4">Tax details</h6>

        <v-row>
          <v-col cols="12">
            <v-switch
                v-model="form.tax.noTaxId"
                label="No Tax ID"
                variant="outlined"
                color="primary"
            />
          </v-col>
        </v-row>
        <v-text-field
            v-model="form.tax.taxId"
            label="Tax ID"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.tax.extraJob"
            label="Extra job"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.tax.disability"
            label="Disability"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.tax.information"
            label="Information"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.tax.employmentStatus"
            label="Employment status"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.tax.secondSalary"
            label="Second salary"
            variant="outlined"
            :rules="[requiredRule]"
        />
      </v-col>
      <v-col cols="6">
        <h6 class="text-h6 mb-4">Health insurance data</h6>

        <v-row>
          <v-col cols="6">
            <v-switch
                v-model="form.insurance.noSsn"
                label="No SSN"
                variant="outlined"
                color="primary"
            />
          </v-col>
          <v-col cols="6">
            <v-switch
                v-model="form.insurance.requestFromPensionInsurance"
                label="Pension insurance request"
                variant="outlined"
                color="primary"
            />
          </v-col>
        </v-row>
        <v-text-field
            v-model="form.insurance.ssn"
            label="SSN"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.birthCountry"
            label="Сountry of birth"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.birthName"
            label="Birth Name"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.healthInsurance"
            label="Health insurance"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.healthInsuranceType"
            label="Health insurance type"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.desiredHealthInsuranceCompany"
            label="Desired health insurance company"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.privateHealthInsuranceName"
            label="Private health insurance name"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.privateHealthInsuranceContribution"
            label="Private health insurance contribution"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.privateNursingInsuranceContribution"
            label="Private nursing insurance contribution"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.lastPrivateHealthInsurance"
            label="Last private health insurance"
            variant="outlined"
            :rules="[requiredRule]"
            class="mb-2"
        />
        <v-text-field
            v-model="form.insurance.haveChildren"
            label="Any children"
            variant="outlined"
            :rules="[requiredRule]"
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

const { requiredRule } = useValidationRules();

const isFormValid = ref(true);
const form = reactive({
  tax: { ...props.me.tax },
  insurance: { ...props.me.insurance },
});
// set default values for switchers
form.tax.noTaxId ??= false;
form.insurance.noSsn ??= false;
form.insurance.requestFromPensionInsurance ??= false;
</script>
