import { Container } from "./styles.js"

export function ButtonText({ title, isactive = false, ...rest }) {
  return(
    <Container 
    type="button"
    $isActive = {isactive.toString()}
    {...rest}
    >
      {title}
    </Container>
  )
}