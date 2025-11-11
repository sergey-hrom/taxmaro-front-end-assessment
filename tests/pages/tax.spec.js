import { mount } from '@vue/test-utils';
import Tax from '../../app/pages/personal-data/tax.vue';
import meMock from '../mocks/me-mock.js';
import { setupVuetify } from '../setup/vuetify.js';

describe('Tax tab form', () => {
    const vuetify = setupVuetify();
    const global = { plugins: [vuetify] };

    const mountTax = (props = { me: meMock }) =>
        mount(Tax, { props, global });

    test('renders with initial tax data', () => {
        const wrapper = mountTax();
        expect(wrapper.vm.form.tax.taxId).toBe('TAX-001');
        expect(wrapper.vm.form.insurance.ssn).toBe('123');
        expect(wrapper.findAllComponents({ name: 'VTextField' }).length).toBe(17);
        expect(wrapper.findAllComponents({ name: 'VSwitch' }).length).toBe(3);
    });

    test('ensures boolean defaults exist when props empty', () => {
        const wrapper = mountTax({ me: { tax: {}, insurance: {} } });
        expect(wrapper.vm.form.tax.noTaxId).toBe(false);
        expect(wrapper.vm.form.insurance.noSsn).toBe(false);
        expect(wrapper.vm.form.insurance.requestFromPensionInsurance).toBe(false);
    });

    test('toggles switches and updates model', async () => {
        const wrapper = mountTax();
        const switches = wrapper.findAllComponents({ name: 'VSwitch' });

        // toggle all switches
        for (const sw of switches) {
            await sw.setValue(true);
        }

        expect(wrapper.vm.form.tax.noTaxId).toBe(true);
        expect(wrapper.vm.form.insurance.noSsn).toBe(true);
        expect(wrapper.vm.form.insurance.requestFromPensionInsurance).toBe(true);
    });

    test('updates all tax fields correctly', async () => {
        const wrapper = mountTax();
        const allFields = wrapper.findAllComponents({ name: 'VTextField' });

        const taxFields = [
            'taxId',
            'extraJob',
            'disability',
            'information',
            'employmentStatus',
            'secondSalary'
        ];

        const taxValues = ['TAX-999', 'yes', 'partial', 'info', 'inactive', 'yes'];

        for (let i = 0; i < taxFields.length; i++) {
            await allFields[i].setValue(taxValues[i]);
        }

        expect(wrapper.vm.form.tax).toMatchObject({
            taxId: 'TAX-999',
            extraJob: 'yes',
            disability: 'partial',
            information: 'info',
            employmentStatus: 'inactive',
            secondSalary: 'yes'
        });
    });

    test('updates all insurance fields correctly', async () => {
        const wrapper = mountTax();
        const allFields = wrapper.findAllComponents({ name: 'VTextField' });

        // because first 6 inputs are tax inputs
        const insuranceFields = allFields.slice(6);

        const insuranceValues = [
            '555', // ssn
            'Spain', // birthCountry
            'Doe', // birthName
            'TK', // healthInsurance
            'Private', // healthInsuranceType
            'BKK', // desiredHealthInsuranceCompany
            'Allianz', // privateHealthInsuranceName
            '120', // privateHealthInsuranceContribution
            '15', // privateNursingInsuranceContribution
            'OldTK', // lastPrivateHealthInsurance
            'Yes' // haveChildren
        ];

        for (let i = 0; i < insuranceFields.length; i++) {
            await insuranceFields[i].setValue(insuranceValues[i]);
        }

        expect(wrapper.vm.form.insurance).toMatchObject({
            ssn: '555',
            birthCountry: 'Spain',
            birthName: 'Doe',
            healthInsurance: 'TK',
            healthInsuranceType: 'Private',
            desiredHealthInsuranceCompany: 'BKK',
            privateHealthInsuranceName: 'Allianz',
            privateHealthInsuranceContribution: '120',
            privateNursingInsuranceContribution: '15',
            lastPrivateHealthInsurance: 'OldTK',
            haveChildren: 'Yes'
        });
    });

    test('disables submit button when form invalid', async () => {
        const wrapper = mountTax();
        wrapper.vm.form.tax.taxId = '';
        await wrapper.vm.$nextTick();
        const btn = wrapper.findComponent({ name: 'SubmitBtn' });
        expect(btn.props('isDisabled')).toBe(true);
    });

    test('emits both tax and insurance on submit', async () => {
        const wrapper = mountTax();
        await wrapper.find('form').trigger('submit.prevent');
        const emitted = wrapper.emitted('update')[0][0];

        expect(emitted).toHaveProperty('tax');
        expect(emitted).toHaveProperty('insurance');
        expect(emitted.tax).toMatchObject({
            taxId: 'TAX-001',
            noTaxId: false
        });
        expect(emitted.insurance).toHaveProperty('requestFromPensionInsurance', false);
    });

    test('emits updated data after modifying fields', async () => {
        const wrapper = mountTax();
        const taxIdField = wrapper.findAllComponents({ name: 'VTextField' }).at(0);
        await taxIdField.setValue('TAX-XYZ');
        await wrapper.find('form').trigger('submit.prevent');

        const emitted = wrapper.emitted('update')[0][0];
        expect(emitted.tax.taxId).toBe('TAX-XYZ');
    });

    test('handles missing tax/insurance props gracefully', () => {
        const wrapper = mountTax({ me: {} });
        expect(wrapper.vm.form.tax.noTaxId).toBe(false);
        expect(wrapper.vm.form.insurance.noSsn).toBe(false);
    });
});
