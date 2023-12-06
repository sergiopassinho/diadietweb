import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { api } from "../../utils/api";
import emailjs from "emailjs-com";

interface Paciente {
  email: string;
  idPaciente: string;
  name: string;
}

interface Medicamento {
  idMedicamento: string;
  name: string;
  dataValidade: string;
  composicao: string;
}

const ReceitaForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Option } = Select;

  const [pacienteEmail, setPacienteEmail] = useState<string>("");
  const [medicamento, setMedicamento] = useState<string>("");
  const [pacientes, setPacientes] = useState<Paciente[] | []>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[] | []>([]);
  const [receita, setReceita] = useState<string>("");
  const [dataValidade, setDataValidade] = useState<string>("");
  const [composicao, setComposicao] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  const onNomeChange = (e: any) => {
    setNome(e.target.value);
  };

  const onComposicaoChange = (e: any) => {
    setComposicao(e.target.value);
  };

  const onDataValidadeChange = (d: any, ds: any) => {
    setDataValidade(ds);
  };

  const onReceitaChange = (e: any) => {
    setReceita(e.target.value);
  };
  const onPacienteIdChange = (value: any) => {
    setPacienteEmail(value);
  };

  useEffect(() => {
    async function fetchData() {
      const result = (await api.get("pacientes")) as {
        data: Paciente[];
      };
      setPacientes(result.data as Paciente[]);
    }

    async function fetchMedicamentos() {
      const result = (await api.get("medicamentos")) as {
        data: Medicamento[];
      };
      setMedicamentos(result.data as Medicamento[]);
    }

    fetchData();
    fetchMedicamentos();
  }, []);

  const onSalvarButton = async () => {
    try {
      const templateParams = {
        to_email: pacienteEmail,
        medicamento: medicamento,
        receita: receita,
      };

      console.log(pacienteEmail);

      const emailResponse = await emailjs.send(
        "service_w3ywub2",
        "template_w5jnyqn",
        templateParams,
        "PMGT06eV8FHNIKEaP"
      );

      console.log("Email sent successfully:", emailResponse);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const onCreateMedicamento = async () => {
    try {
      await api.post("medicamentos", {
        name: nome,
        dataValidade: dataValidade,
        composicao: composicao,
      });

      const result = (await api.get("medicamentos")) as {
        data: Medicamento[];
      };
      setMedicamentos(result.data as Medicamento[]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Paciente">
        <Select
          placeholder="Paciente"
          onChange={onPacienteIdChange}
          value={pacienteEmail}
        >
          {Array.isArray(pacientes) &&
            pacientes?.map((value) => (
              <Option value={value.email}>
                {value.name} ({value.email})
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Medicamento">
        <Select
          placeholder="Medicamento"
          onChange={setMedicamento}
          value={medicamento}
        >
          {Array.isArray(medicamentos) &&
            medicamentos?.map((value) => (
              <Option value={value.name}>{value.name}</Option>
            ))}
        </Select>

        <Button onClick={showModal} style={{ marginTop: 6 }}>
          Criar novo medicamento
        </Button>
      </Form.Item>

      <Form.Item label="Receita">
        <Input.TextArea
          placeholder="Observações da receita"
          onChange={onReceitaChange}
          value={receita}
          style={{ height: 220, resize: "none" }}
        />
      </Form.Item>

      <Button type="primary" onClick={onSalvarButton}>
        Enviar ao email do paciente
      </Button>

      <Modal
        title="Cadastrar novo medicamento"
        open={isModalOpen}
        onOk={() => {
          onCreateMedicamento();
          handleOk();
        }}
        okText={"Criar medicamento"}
        cancelText={"Cancelar"}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Nome">
            <Input placeholder="Nome" onChange={onNomeChange} value={nome} />
          </Form.Item>

          <Form.Item label="Data de Validade">
            <DatePicker
              onChange={onDataValidadeChange}
              format="YYYY-MM-DD"
              placeholder="Data"
            />
          </Form.Item>

          <Form.Item label="Composição e Dosagem">
            <Input
              placeholder="composição e dosagem"
              onChange={onComposicaoChange}
              value={composicao}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  );
};

export { ReceitaForm };
