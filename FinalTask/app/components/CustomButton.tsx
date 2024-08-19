interface CustomButtonProps {
  data: string;
  bg: string;
  border: false | { thickness: string; color: string };
  color: string;
  padding: string;
}

const CustomButton = ({ data, bg, border, color, padding }:CustomButtonProps) => {
  return (
    <button
      className={`font-[600] text-[12px] ${color} ${bg} ${padding} rounded-[2rem] ${border && `${border.color} ${border.thickness}`}`}
    >
      {data}
    </button>
  );
};

export default CustomButton;
