import { mount } from '@vue/test-utils';
import Personal from '../../app/pages/personal-data/personal.vue';
import meMock from '../mocks/me-mock.js';
import { setupVuetify } from '../setup/vuetify.js';

describe('Personal tab form', () => {
    const vuetify = setupVuetify();
    const global = { plugins: [vuetify] };

    const mountPersonal = (props = { me: meMock }) =>
        mount(Personal, { props, global });

    test('renders with initial personal data', () => {
        const wrapper = mountPersonal();
        expect(wrapper.vm.form.firstName).toBe('John');
        expect(wrapper.findAllComponents({ name: 'VTextField' }).length).toBe(11);
    });

    test('updates all general info fields correctly', async () => {
        const wrapper = mountPersonal();
        const allFields = wrapper.findAllComponents({ name: 'VTextField' });

        const generalValues = [
            'Jane',      // firstName
            'Doe',       // lastName
            'jane@doe.com', // email
            '+987654321', // phone
            'Backend Dev', // position
            'Engineering', // department
            'USA',       // country
            'New York',  // city
            'NY',        // state
            '10001',     // zip
            '5th Avenue' // address
        ];

        for (let i = 0; i < allFields.length; i++) {
            await allFields[i].setValue(generalValues[i]);
        }

        expect(wrapper.vm.form).toMatchObject({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane@doe.com',
            phone: '+987654321',
            position: 'Backend Dev',
            department: 'Engineering',
            country: 'USA',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            address: '5th Avenue'
        });
    });

    test('email field should accept a valid email', async () => {
        const wrapper = mountPersonal();
        const emailField = wrapper.findAllComponents({ name: 'VTextField' })[2];

        await emailField.setValue('valid@email.com');
        expect(wrapper.vm.form.email).toBe('valid@email.com');
    });

    test('emits update with cleaned payload on submit', async () => {
        const wrapper = mountPersonal();
        await wrapper.find('form').trigger('submit.prevent');

        const emitted = wrapper.emitted('update')[0][0];
        expect(emitted.firstName).toBe('John');
        expect(emitted).not.toHaveProperty('bankDetail');
        expect(emitted).not.toHaveProperty('insurance');
        expect(emitted).not.toHaveProperty('tax');
    });

    test('emits updated data after modifying fields', async () => {
        const wrapper = mountPersonal();
        const firstNameField = wrapper.findAllComponents({ name: 'VTextField' })[0];
        await firstNameField.setValue('Alice');

        await wrapper.find('form').trigger('submit.prevent');
        const emitted = wrapper.emitted('update')[0][0];
        expect(emitted.firstName).toBe('Alice');
    });

    test('disables SubmitBtn when form invalid', async () => {
        const wrapper = mountPersonal();
        wrapper.vm.firstName = '';
        await wrapper.vm.$nextTick();

        const btn = wrapper.findComponent({ name: 'SubmitBtn' });
        expect(btn.props('isDisabled')).toBe(true);
    });

    test('handles missing me prop gracefully', () => {
        const wrapper = mountPersonal({ me: {} });
        expect(wrapper.vm.form).toBeTruthy();
        expect(Object.keys(wrapper.vm.form)).toHaveLength(0);
    });
});
