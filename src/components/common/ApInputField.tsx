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
        className={`ap_input ${lightShadow && '!shadow-md'}`}
        min={1}
        step={0.01}
        required={id === 'holderPhone' || id === 'holderEmail' ? false : true}
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
