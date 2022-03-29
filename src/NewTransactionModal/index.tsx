import { FormEvent, useState } from "react";
import Modal from 'react-modal';
import closeImg from '../assets/close.svg'
import incomeImg from '../assets/income.svg'
import outcomeImg from '../assets/outcome.svg'
import { useTransactions } from "../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./style";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void; 
}
export function NewTransiction({isOpen, onRequestClose}: NewTransactionModalProps) {
const {createTransaction} = useTransactions();
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategorie] = useState('');
  const [type, setType] = useState('deposit')

async function handleCreateNewTransaction(event: FormEvent) {
  event.preventDefault();

 await createTransaction({
    title,
    amount: value,
    type,
    category,
  })

  setTitle('');
  setValue(0);
  setCategorie('');
  setType('deposit');
  onRequestClose();
}

  return(
    <>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="fechar" />
      </button>

    <Container onSubmit={handleCreateNewTransaction}>
    <h2>Cadastrar transação</h2>

    <input
      placeholder="título"
      value={title}
      onChange={event => setTitle(event.target.value)}
    />
    <input
      placeholder="Valor"
      type="number"
      value={value}
      onChange={event => setValue(Number(event.target.value))}
    />

    <TransactionTypeContainer>
      <RadioBox
      type="button"
      onClick={() => {setType('deposit')}}
      isActive = { type === 'deposit'}
      activeColor="green"
      >
        <img src={incomeImg} alt="buttonEntrada"/>
        <span>Entrada</span>
      </RadioBox>
      <RadioBox
      type="button"
      onClick={() => {setType('withdraw')}}
      isActive = { type === 'withdraw'}
      activeColor="red"
      >
        <img src={outcomeImg} alt="buttonSaida"/>
        <span>Saída</span>
      </RadioBox>
    </TransactionTypeContainer>

    <input
      placeholder="categoria"
      value={category}
      onChange={event => setCategorie(event.target.value)}
    />

    <button type="submit">Cadastrar</button>
  </Container>
      </Modal>
    </>
  )
}