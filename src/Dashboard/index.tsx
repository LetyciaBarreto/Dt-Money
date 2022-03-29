import { Sumary } from "../components/Sumary";
import { Table } from "../components/Table";
import { Container } from "./style";

export function Dashboard() {
  return (
    <Container>
      <Sumary />
      <Table/>
    </Container>
  )
}