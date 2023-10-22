import React, { ReactNode, useEffect, useMemo } from 'react';
import { regExpTestOnlyDigits } from '@utils/constants/otp';
import { Form } from '@components/molecules';
import clsx from 'clsx';
import { OTPInputSchema } from '@validations/otp/otp.schema';

type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  isError: boolean;
};

/**
 * OTPInput component for rendering an OTP input form with validation and navigation.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} props.value - The current OTP value.
 * @param {number} [props.valueLength=1] - The expected length of the OTP.
 * @param {(value: string) => void} props.onChange - A callback function to handle OTP value changes.
 * @param {boolean} props.isError - Indicates if there is an error in the OTP input.
 *
 * @returns {ReactNode} The rendered OTPInput component.
 */
const OTPInput = ({ value, valueLength = 1, onChange, isError }: Props): ReactNode => {
  const baseClass = useMemo(
    () => ['w-full h-16 border border-purple-300 text-center font-bold rounded-lg dark:text-white'],
    [],
  );

  const [inputClass, setInputClass] = React.useState(clsx(baseClass));
  const errorClass = 'border-red text-red';

  useEffect(() => {
    setInputClass(clsx(baseClass, { [errorClass]: isError }));
  }, [baseClass, isError]);

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (regExpTestOnlyDigits.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = regExpTestOnlyDigits.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);

      const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }

    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const prevInputEl = target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  return (
    <Form onSubmit={() => {}} validationSchema={OTPInputSchema}>
      <div className="flex w-full gap-2 flex-row-reverse mt-6">
        {valueItems.map((digit, idx) => (
          <input
            autoComplete="one-time-code"
            className={inputClass}
            inputMode="numeric"
            key={idx}
            maxLength={valueLength}
            name={idx.toString()}
            onChange={(e) => inputOnChange(e, idx)}
            onFocus={inputOnFocus}
            onKeyDown={inputOnKeyDown}
            pattern="\d{1}"
            type="text"
            value={digit}
          />
        ))}
      </div>
    </Form>
  );
};

export default OTPInput;
