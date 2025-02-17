import { customGaletteFields, ASIDE_SALADS } from './galette-creative.form';

// describe('customGaletteFields', () => {
//   it('should have base field with default value "galette"', () => {
//     const baseField = customGaletteFields.find(field => field.key === 'base');
//     expect(baseField?.defaultValue).toBe('galette');
//   });
//
//   it('should have fillings field with required true when base is "galette"', () => {
//     const fillingsField = customGaletteFields.find(field => field.key === 'fillings');
//     const model = { base: 'galette' };
//     expect(fillingsField?.expressions?.['props.required']({ model })).toBe(true);
//   });
//
//   it('should have fillings field with required false when base is "crepe"', () => {
//     const fillingsField = customGaletteFields.find(field => field.key === 'fillings');
//     const model = { base: 'crepe' };
//     expect(fillingsField?.expressions?.['props.required']({ model })).toBe(false);
//   });
//
//   it('should hide aside field when base is "crepe"', () => {
//     const asideField = customGaletteFields.find(field => field.key === 'aside');
//     const model = { base: 'crepe' };
//     expect(asideField?.expressions?.hide({ model })).toBe(true);
//   });
//
//   it('should not hide aside field when base is "galette"', () => {
//     const asideField = customGaletteFields.find(field => field.key === 'aside');
//     const model = { base: 'galette' };
//     expect(asideField?.expressions?.hide({ model })).toBe(false);
//   });
//
//   it('should have aside field with options from ASIDE_SALADS', () => {
//     const asideField = customGaletteFields.find(field => field.key === 'aside');
//     expect(asideField?.props?.options).toEqual(ASIDE_SALADS);
//   });
//
//   it('should update price field value on form value changes', () => {
//     const priceField = customGaletteFields.find(field => field.key === 'price');
//     const formState = {
//       getPricing: jest.fn().mockReturnValue(10)
//     };
//     const model = { price: 5 };
//     const formControl = { patchValue: jest.fn() };
//     priceField?.hooks?.onInit({ form: { valueChanges: { subscribe: (fn: any) => fn() } }, options: { formState }, model, formControl });
//     expect(formControl.patchValue).toHaveBeenCalledWith(10, { emitEvent: true, onlySelf: true });
//   });
// });
