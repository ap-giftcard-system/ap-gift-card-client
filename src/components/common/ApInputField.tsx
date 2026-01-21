interface PageProps {
  id: string;
  title?: string;
  type: string;
  value: string | number;
  handleOnFieldChange: (e: any) => void;
  placeholder: string;
  note?: boolean;
  inputRef?: any;
  lightShadow?: boolean;
  disabled?: boolean;
}

const ApInputField = ({
  id,
  title,
  type,
  value,
  handleOnFieldChange,
  placeholder,
  note,
  inputRef,
  lightShadow,
  disabled,
}: PageProps) => {
  return (
    <fieldset>
      {title && (
        <label htmlFor={id} className='font-bold text-lg'>
          {title}:
        </label>
      )}
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleOnFieldChange}
        placeholder={placeholder}
        className={`ap_input ${lightShadow && '!shadow-md'} ${
          disabled ? 'text-gray-500 cursor-not-allowed opacity-90' : ''
        }`}
        min={1}
        step={0.01}
        disabled={disabled}
        required={
          id === 'holderPhone' || id === 'holderEmail' || id === 'giftedBy'
            ? false
            : true
        }
      />
      {note && (
        <div className='text-xs mt-1 font-bold'>
          Note: must provide either email or phone for contact.
        </div>
      )}
    </fieldset>
  );
};

export default ApInputField;
