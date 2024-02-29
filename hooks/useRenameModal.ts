import { create } from "zustand";

const defautValues = { id: "", title: "" };

interface IRenameModel {
  isOpen: boolean;
  initialValues: typeof defautValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModel>((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defautValues,
    }),
  initialValues: defautValues,
}));
