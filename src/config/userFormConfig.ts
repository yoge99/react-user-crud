export type FieldType = 'text' | 'email' | 'tel';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
}

export const userFormConfig: FormFieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
  },
];
