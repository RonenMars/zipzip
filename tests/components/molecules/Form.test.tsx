import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input } from '@components/atoms';
import { Form } from '@components/molecules';

describe('Form', () => {
  it('updates formState when inputs change', () => {
    const { getByTestId } = render(
      <Form>
        <Input name="firstName" placeholder="First Name" data-testid="firstName-input" />
        <Input name="lastName" placeholder="First Name" data-testid="lastName-input" />
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
