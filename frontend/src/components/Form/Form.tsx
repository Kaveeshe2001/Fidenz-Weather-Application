import { Row } from "react-bootstrap";

type FormProps = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({children, onSubmit}) => {
  return (
    <div className="bg-[#f7f7f7] border border-[var(--title-color-opc)] rounded-xl px-[40px] py-[70px] text-center">
      <form onSubmit={onSubmit}>
        <Row>{children}</Row>
      </form>
    </div>
  )
}

export default Form


