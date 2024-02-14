import { Typography, TypographyProps } from "@mui/material";

interface IProps extends TypographyProps {
  text: string;
}

const EllipsisTypography = ({ text, ...restProps }: IProps) => {
  return (
    <Typography
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
      {...restProps}
    >
      {text}
    </Typography>
  );
};

export default EllipsisTypography