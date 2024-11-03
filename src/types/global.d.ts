declare interface InputProps {
  title: string;
  placeholder: string;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}
