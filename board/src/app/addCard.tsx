import { FormEvent } from "react";
import styled from "@emotion/styled";
import { Task, TaskState } from "./types";

interface AddCardProps {
  addCard: (task: Task) => void;
}

export const AddCard = ({ addCard }: AddCardProps) => {
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("content");
    if (typeof content === "string") {
      addCard({id: '123xyz', content, state: TaskState.UNASSIGNED, userId: 'user123'});
    }
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Input type="text" name="content" />
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
  padding: px 8px;
  cursor: pointer;
`;
