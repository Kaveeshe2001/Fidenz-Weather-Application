import './primaryButton.css'

type PrimaryButtonProps = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    link?: string;
    type?: 'button' | 'submit' | 'reset';
    size?: 'lg';
    variant?: 'active' | 'outline' | 'nonActive';
}

const PrimaryButton = ({
    text,
    onClick,
    link,
    type,
    size,
    variant,
}: PrimaryButtonProps) => {
    const buttonStyle = `primary-btn ${size === 'lg' && 'lg'} ${
        variant === 'active'
            ? 'active'
            : variant === 'outline'
            ? 'outline-btn'
            : variant === 'nonActive'
            ? 'nonActive'
            : ''
    }`;

  return (
    <>
      {link ? (
        <a href={link} className={buttonStyle}>
            {text}
        </a>
      ) : (
        <button className={buttonStyle} onClick={onClick} type={type} >
            {text}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;
