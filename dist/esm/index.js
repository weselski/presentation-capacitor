import { registerPlugin } from '@capacitor/core';
const CapacitorPresentation = registerPlugin('CapacitorPresentation', {
    web: () => import('./web').then(m => new m.CapacitorPresentationWeb()),
});
export * from './definitions';
export { CapacitorPresentation };
//# sourceMappingURL=index.js.map