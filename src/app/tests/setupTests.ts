import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// Limpia el DOM después de cada prueba
afterEach(() => {
  cleanup();
});
