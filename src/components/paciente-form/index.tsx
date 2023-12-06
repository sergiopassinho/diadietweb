import React, { useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { api } from "../../utils/api";

const PacienteForm: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onNomeChange = (e: any) => {
    setNome(e.target.value);
  };

  const onCpfChange = (e: any) => {
    setCpf(e.target.value);
  };

  const onDataNascimentoChange = (d: any, ds: any) => {
    console.log(ds);
    setDataNascimento(ds);
  };

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onSalvarButton = async () => {
    try {
      await api.post("pacientes", {
        name: nome,
        nascimentoo: dataNascimento,
        cpf: cpf,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Nome">
        <Input placeholder="Nome" onChange={onNomeChange} value={nome} />
      </Form.Item>

      <Form.Item label="Cpf">
        <Input placeholder="Cpf" onChange={onCpfChange} value={cpf} />
      </Form.Item>

      <Form.Item label="Data de Nascimento">
        <DatePicker onChange={onDataNascimentoChange} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Email">
        <Input placeholder="Email" onChange={onEmailChange} value={email} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={onSalvarButton}>Salvar</Button>
      </Form.Item>
    </Form>
  );
};

export { PacienteForm };
