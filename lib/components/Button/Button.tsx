import type { ReactNode } from "react"
import { ButtonStyled } from "./Button.styled"

interface ButtonProps {
  children: ReactNode
}


const Button = ({ children }: ButtonProps) => {
  return <ButtonStyled>{children}</ButtonStyled>
}

export default Button
