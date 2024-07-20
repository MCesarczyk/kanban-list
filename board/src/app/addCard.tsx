import { FormEvent, useRef } from "react";
import styled from "@emotion/styled";
import { Task, TaskState } from "./types";

interface AddCardProps {
  addCard: (task: Task) => void;
}

export const AddCard = ({ addCard }: AddCardProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content");
    if (typeof content === "string") {
      addCard({id: Math.random().toString().slice(2), content, state: TaskState.UNASSIGNED, userId: 'user123'});
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current?.focus();
      }
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input ref={inputRef} type="text" name="content" />
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
  border-radius: 8px;
  padding: 4px 8px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
`;
