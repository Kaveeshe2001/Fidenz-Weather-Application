type InputProps = {
    label?: string;
    type: string;
    id: string;
    placeHolder?: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    accept?: string;
}

const Input = ({
    label,
    type,
    id,
    placeHolder,
    name,
    value,
    onChange,
    error,
    accept,
}: InputProps) => {
  return (
    <div className="relative leading-none mb-5 text-left">
        {label && (
            <label 
                className="block text-[var(--title-color)] text-[15px] font-semibold mb-2.5" 
                htmlFor={id}
            >
                    {label}
            </label>
        )}
        <input
            type={type}
            placeholder={placeHolder}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            accept={accept}
            className="w-full h-[52px] bg-[var(--white-color)] text-[var(--paragraph-color)] font-normal px-[10px] py-[20px] border border-[var(--primary-color2-opc)] rounded-md text-sm focus:border-[var(--primary-color)] focus:outline-none"
        />
        <span className="error-message">{error}</span>
    </div>
  );
};

export default Input;
