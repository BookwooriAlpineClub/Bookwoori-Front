declare interface InputProps {
  title: string;
  placeholder: string;
  required: boolean;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}
declare type Period = {
  start: string;
  end: string;
};
