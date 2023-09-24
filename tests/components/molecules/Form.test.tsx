import { render, fireEvent } from '@testing-library/react';
import * as Joi from 'joi';

import { Input } from '@components/atoms';
import { Form } from '@components/molecules';
import React from 'react';

const testFormSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
});

describe('Form', () => {
  it('updates formState when inputs change', () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}} validationSchema={testFormSchema}>
        <Input data-testid="firstName-input" label="firstname" name="firstName" placeholder="First Name" />
        <Input data-testid="lastName-input" label="lastname" name="lastName" placeholder="Last Name" />
      </Form>,
    );

    const firstNameInput = getByTestId('firstName-input') as HTMLInputElement;
    const lastNameInput = getByTestId('lastName-input') as HTMLInputElement;

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
  });
});
