import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { api } from "../../utils/api";

interface Paciente {
  email: string;
  idPaciente: string;
  name: string;
}

const ExameForm: React.FC = () => {
  const { Option } = Select;

  const [pacienteId, setPacienteId] = useState<string>("");
  const [pacientes, setPacientes] = useState<Paciente[] | []>([]);
  const [arquivos, setArquivos] = useState<UploadFile<any>[]>([]);
  const [dataRetorno, setDataRetorno] = useState<string>("");
  const [receita, setReceita] = useState<string>("");

  const onPacienteIdChange = (id: any) => {
    setPacienteId(id);
  };

  const onDataRetornoChange = (d: any, ds: any) => {
    setDataRetorno(ds);
  };

  const onReceitaChange = (e: any) => {
    setReceita(e.target.value);
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setArquivos([...info.fileList]);
  };

  const onSalvarButton = async () => {
    try {
      await api.post("exames", {
        dataRetorno: dataRetorno,
        receita: receita,
        anexo: arquivos,
        idPaciente: pacienteId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = (await api.get("pacientes")) as {
        data: Paciente[];
      };
      setPacientes(result.data as Paciente[]);
    }

    fetchData();
  }, []);

  return (
    <Form layout="vertical">
      <Form.Item label="Paciente">
        <Select
          placeholder="Paciente"
          onChange={onPacienteIdChange}
          value={pacienteId}
        >
          {Array.isArray(pacientes) &&
            pacientes?.map((value) => (
              <Option value={value.idPaciente}>
                {value.name} ({value.email})
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item label="Anexo">
        <Upload onChange={onUploadChange} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Anexar</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Data de Retorno">
        <DatePicker onChange={onDataRetornoChange} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item label="Receita">
        <Input.TextArea
          placeholder="Digite a receita do paciente"
          onChange={onReceitaChange}
          value={receita}
          style={{ height: 220, resize: "none" }}
        />
      </Form.Item>

      <Form.Item>
        <Button onClick={onSalvarButton}>Salvar</Button>
      </Form.Item>
    </Form>
  );
};

export { ExameForm };
