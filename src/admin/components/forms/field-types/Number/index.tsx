import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { NumberParser } from '@internationalized/number';
import useField from '../../useField';
import Label from '../../Label';
import Error from '../../Error';
import FieldDescription from '../../FieldDescription';
import withCondition from '../../withCondition';
import { number } from '../../../../../fields/validations';
import { Props } from './types';
import { getTranslation } from '../../../../../utilities/getTranslation';

import './index.scss';

const NumberField: React.FC<Props> = (props) => {
  const {
    name,
    path: pathFromProps,
    required,
    validate = number,
    label,
    max,
    min,
    admin: {
      readOnly,
      style,
      className,
      width,
      step,
      placeholder,
      description,
      condition,
      formatOptions,
    } = {},
  } = props;

  const { i18n } = useTranslation();

  const path = pathFromProps || name;

  const memoizedValidate = useCallback((value, options) => {
    return validate(value, { ...options, min, max, required });
  }, [validate, min, max, required]);

  const {
    value,
    showError,
    setValue,
    errorMessage,
  } = useField({
    path,
    validate: memoizedValidate,
    condition,
  });

  const handleChange = useCallback((e) => {
    const val = formatOptions
      ? new NumberParser(i18n.language, formatOptions).parse(e.target.value)
      : parseFloat(e.target.value);
    if (Number.isNaN(val)) {
      setValue('');
    } else {
      setValue(val);
    }
  }, [setValue, formatOptions, i18n.language]);

  const classes = [
    'field-type',
    'number',
    className,
    showError && 'error',
    readOnly && 'read-only',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        ...style,
        width,
      }}
    >
      <Error
        showError={showError}
        message={errorMessage}
      />
      <Label
        htmlFor={`field-${path.replace(/\./gi, '__')}`}
        label={label}
        required={required}
      />
      <div className="number__wrap">
        {formatOptions ? (
          <React.Fragment>
            <input
              value={typeof value === 'number' ? value : ''}
              type="hidden"
              name={path}
            />
            <input
              id={`field-${path.replace(/\./gi, '__')}`}
              value={typeof value === 'number' ? new Intl.NumberFormat(i18n.language, formatOptions).format(value) : ''}
              onChange={handleChange}
              disabled={readOnly}
              placeholder={getTranslation(placeholder, i18n)}
              type="text"
              onWheel={(e) => {
                (e.target as HTMLInputElement).blur();
              }}
            />
          </React.Fragment>
        ) : (
          <input
            id={`field-${path.replace(/\./gi, '__')}`}
            value={typeof value === 'number' ? value : ''}
            onChange={handleChange}
            disabled={readOnly}
            placeholder={getTranslation(placeholder, i18n)}
            type="number"
            name={path}
            step={step}
            onWheel={(e) => {
              (e.target as HTMLInputElement).blur();
            }}
          />
        )}
      </div>
      <FieldDescription
        value={value}
        description={description}
        formatOptions={formatOptions}
      />
    </div>
  );
};

export default withCondition(NumberField);
