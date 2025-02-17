import {FormlyFieldConfig} from '@ngx-formly/core';
import {createFieldComponent} from "@ngx-formly/core/testing";
import {MultiSelectDropdownModule} from "./multi-select-dropdown.module";

const renderComponent = (field: FormlyFieldConfig) => {
  return createFieldComponent(field, {
    imports: [MultiSelectDropdownModule],
  });
};

describe('MultiSelectDropdownComponent', () => {
  it('should set default value', () => {
    const { query, fixture } = renderComponent({
      key: 'name',
      type: 'select-multiple',
      defaultValue: 'Galette 1',
      props: {
        label: 'Name',
        options: [
          { value: 1, label: 'Galette 1' },
          { value: 2, label: 'Galette 2' },
          { value: 3, label: 'Galette 3' },
        ],
      }
    });

    expect(query('sfo-multi-select-dropdown')).not.toBeNull();
    expect(query('label').nativeElement.textContent).toEqual('Name');

    expect(fixture.componentInstance.field.model).toEqual({name: 'Galette 1'});
  });
});
