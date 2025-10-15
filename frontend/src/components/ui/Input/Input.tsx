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
            className="h-[52px] w-full rounded-[5px] border border-[rgba(var(--primary-color2-opc),0.15)] bg-[var(--white-color)] px-[20px] py-[10px] text-sm font-normal text-[var(--paragraph-color)] focus:border-[var(--primary-color)] focus:outline-none"
        />
        <span className="error-message">{error}</span>
    </div>
  );
};

export default Input;
