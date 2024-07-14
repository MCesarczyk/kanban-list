import styled from "@emotion/styled";
import { FormEvent } from "react";

interface AddCardProps {
  addCard: (title: string) => void;
}

export const AddCard = ({ addCard }: AddCardProps) => {
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    if (typeof name === "string") {
      addCard(name);
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input type="text" name="name" />
      <Button>Add</Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 2px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px 8px;
  cursor: pointer;
`;
