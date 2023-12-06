import { format } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Button, Card } from "antd";

interface Paciente {
  email: string;
  idPaciente: string;
  name: string;
}

interface Exame {
  anexo: string;
  dataRetorno: string;
  receita: string;
  paciente: Paciente;
}

const handleDownload = (base: string) => {
  const blob = base64toBlob(base);
  const file = new File([blob], "image/jpeg", {
    type: "application/octet-stream",
  });

  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = "exame.jpeg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

const base64toBlob = (base64Data: string) => {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/jpeg" });
};

export const PacientesList = () => {
  const [exames, setExames] = useState<any>([]);

  useEffect(() => {
    async function fetchExames() {
      const result = (await api.get("exames")) as {
        data: Paciente[];
      };
      setExames(result.data as []);
    }

    fetchExames();
  }, []);

  const formatDate = (dataRetorno: string) =>
    format(new Date(dataRetorno), "dd/MM/yyyy");

  return (
    <>
      {exames.map((exame: Exame) => (
        <Card
          title={
            <p>
              <strong>Nome do paciente: </strong>
              {exame.paciente.name}
            </p>
          }
          key={exame.paciente.idPaciente}
          style={{
            width: 300,
            marginBottom: 12,
          }}
        >
          <p>
            <strong>Data de retorno: </strong>
            {formatDate(exame.dataRetorno)}
          </p>
          <p>
            <strong>Observações:</strong> {exame.receita}
          </p>
          <Button
            type="primary"
            onClick={() => {
              handleDownload(exame.anexo);
            }}
          >
            Baixar exame
          </Button>
        </Card>
      ))}
    </>
  );
};
