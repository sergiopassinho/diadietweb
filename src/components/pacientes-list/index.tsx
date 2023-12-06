import { format } from "date-fns";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Card } from "antd";

interface Paciente {
  email: string;
  idPaciente: string;
  name: string;
}

interface Exame {
  dataRetorno: string;
  receita: string;
  paciente: Paciente;
}

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
          title={exame.paciente.name}
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
            <strong>Receita:</strong> {exame.receita}
          </p>
        </Card>
      ))}
    </>
  );
};
