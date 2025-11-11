import { mount } from '@vue/test-utils';
import Bank from '../../app/pages/personal-data/bank.vue';
import meMock from '../mocks/me-mock.js';
import { setupVuetify } from '../setup/vuetify.js';

describe('Bank tab form', () => {
    const vuetify = setupVuetify();
    const global = { plugins: [vuetify] };

    const mountBank = (props = { me: meMock }) =>
        mount(Bank, { props, global });

    test('renders with initial bank data', () => {
        const wrapper = mountBank();
        expect(wrapper.vm.form.bankName).toBe('Deutsche Bank');
        expect(wrapper.findAllComponents({ name: 'VTextField' }).length).toBe(6);
        expect(wrapper.findAllComponents({ name: 'VRadioGroup' }).length).toBe(1);
    });

    test('defaults paymentMethod to "cash" when undefined', () => {
        const wrapper = mountBank({ me: { bankDetail: {} } });
        expect(wrapper.vm.form.paymentMethod).toBe('cash');
    });

    test('updates all text fields correctly', async () => {
        const wrapper = mountBank();
        const allFields = wrapper.findAllComponents({ name: 'VTextField' });

        const fieldValues = [
            '12345', // bankId
            'Sparkasse', // bankName
            'SPKDEBB', // bankBic
            'DE001234567890', // iban
            '77', // id
            'Jane Doe' // payee
        ];

        for (let i = 0; i < allFields.length; i++) {
            await allFields[i].setValue(fieldValues[i]);
        }

        expect(wrapper.vm.form).toMatchObject({
            bankId: '12345',
            bankName: 'Sparkasse',
            bankBic: 'SPKDEBB',
            iban: 'DE001234567890',
            id: '77',
            payee: 'Jane Doe'
        });
    });

    test('updates paymentMethod when selecting radio options', async () => {
        const wrapper = mountBank();

        const radioGroup = wrapper.findComponent({ name: 'VRadioGroup' });
        expect(radioGroup.exists()).toBe(true);

        // Select each option one by one
        const options = ['cash', 'transfer', 'cheque'];
        for (const value of options) {
            await radioGroup.setValue(value);
            expect(wrapper.vm.form.paymentMethod).toBe(value);
        }
    });

    test('emits valid update payload on submit', async () => {
        const wrapper = mountBank();
        await wrapper.find('form').trigger('submit.prevent');

        const emitted = wrapper.emitted('update')[0][0];
        expect(emitted).toHaveProperty('bankDetail');
        expect(emitted.bankDetail).toMatchObject({
            bankName: 'Deutsche Bank',
            bankBic: 'DEUTDEFF',
            iban: 'DE89370400440532013000',
            id: '1',
            bankId: '9876',
            paymentMethod: 'transfer',
            payee: 'John Doe'
        });
    });

    test('emits updated bankDetail data after editing fields', async () => {
        const wrapper = mountBank();

        const fields = wrapper.findAllComponents({ name: 'VTextField' });
        await fields[0].setValue('999'); // bankId
        await fields[1].setValue('Test Bank');
        await fields[2].setValue('TESTBIC');
        await fields[3].setValue('DE1234567890');
        await fields[4].setValue('44');
        await fields[5].setValue('Jane');

        await wrapper.find('form').trigger('submit.prevent');
        const emitted = wrapper.emitted('update')[0][0];

        expect(emitted.bankDetail.bankId).toBe('999');
        expect(emitted.bankDetail.bankName).toBe('Test Bank');
        expect(emitted.bankDetail.payee).toBe('Jane');
    });

    test('disables SubmitBtn when form invalid', async () => {
        const wrapper = mountBank();
        wrapper.vm.form.payee = '';
        await wrapper.vm.$nextTick();
        const btn = wrapper.findComponent({ name: 'SubmitBtn' });
        expect(btn.props('isDisabled')).toBe(true);
    });

    test('handles missing me prop gracefully', () => {
        const wrapper = mountBank({ me: {} });
        expect(wrapper.vm.form.paymentMethod).toBe('cash');
    });
});
