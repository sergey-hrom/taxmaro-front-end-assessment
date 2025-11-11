import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80
        }
    }
});
