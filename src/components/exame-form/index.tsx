import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import axios from "axios";

const ExameForm: React.FC = () => {
    const [paciente, setPaciente] = useState<string>("");
    const [arquivos, setArquivos] = useState<UploadFile<any>[]>([]);
    const [dataRetorno, setDataRetorno] = useState<string>("");
    const [receita, setReceita] = useState<string>("");

    const onPacienteChange = (e: any) => {
        setPaciente(e.target.value);  
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
            await axios.post("url/exames", {
                dataRetorno: dataRetorno,
                receita: receita,
                anexo: arquivos,
                idPaciente: paciente
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form layout="vertical">
            <Form.Item label="Paciente">
                <Input placeholder="Email" onChange={onPacienteChange} value={paciente} />
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
                <Input.TextArea placeholder="Digite a receita do paciente" onChange={onReceitaChange} value={receita} style={{height: 220, resize: "none"}} />
            </Form.Item>

            <Form.Item>
                <Button onClick={onSalvarButton}>Salvar</Button>
            </Form.Item>
        </Form>
    );
};

export { ExameForm };