import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

interface INoteModalProps {
  title: string;
  isOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleOnChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NoteModal({ title, isOpen, handleOk, handleCancel, handleOnChange }: INoteModalProps) {
  return (
    <>
      <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <TextArea
          className="w-full"
          name="note"
          onChange={handleOnChange}
          placeholder={title}
          rows={4}
        />
      </Modal>
    </>
  );
}
