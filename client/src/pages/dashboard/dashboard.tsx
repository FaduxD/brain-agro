import { Button, Card, Flex, Text, Title } from "@mantine/core";
import { useDashboard } from "./hooks/use-dashboard";
import { PieChart } from "@mantine/charts";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigator = useNavigate();
  const { stats, colors } = useDashboard();

  return (
    <div style={{ padding: "20px" }}>
      <Title ta="center">Brain Agriculture - Teste Técnico v2 - Dashboard</Title>
      <Text ta="center" fs="italic">
        Desenvolvido por Fabiano Cunha (fadu.flc0@gmail.com)
      </Text>
      <Flex justify="center" mb="xl">
        <Button onClick={() => navigator("/")} mt="md" color="gray">
          Voltar para início
        </Button>
      </Flex>
      <Flex justify="center" gap="xl" bg="white" direction="column" mt="100px">
        <Flex justify="center" gap="xl" style={{ borderBottom: "1px solid #ccc" }}>
          <Card>
            <Flex direction="column" align="center">
              <Title order={2}>Total de fazendas cadastradas</Title>
              <Title order={1}>{stats?.totalFarms}</Title>
            </Flex>
          </Card>
          <Card>
            <Flex direction="column" align="center">
              <Title order={2}>Total de hectares</Title>
              <Title order={1}>{stats?.totalHectares}</Title>
            </Flex>
          </Card>
        </Flex>
        <Flex justify="center" gap="xl">
          <div>
            <Text fz="md" mb="sm" ta="center">
              Estados (em porcentagem)
            </Text>
            <PieChart
              withLabelsLine
              labelsPosition="outside"
              labelsType="percent"
              withLabels
              withTooltip
              tooltipDataSource="segment"
              data={
                stats?.farmsByState?.map((f: any, index: number) => ({
                  value: f.count,
                  name: f.state,
                  color: colors[index % colors.length],
                })) || []
              }
            />
          </div>

          <div>
            <Text fz="md" mb="sm" ta="center">
              Culturas plantadas (em quantidade)
            </Text>
            <PieChart
              withLabelsLine
              labelsPosition="outside"
              labelsType="value"
              withLabels
              withTooltip
              tooltipDataSource="segment"
              data={
                stats?.cropsByName?.map((f: any, index: number) => ({
                  value: f.count,
                  name: f.crop,
                  color: colors[index % colors.length],
                })) || []
              }
            />
          </div>

          <div>
            <Text fz="md" mb="sm" ta="center">
              Uso do solo em agricultura e vegetação (em quantidade)
            </Text>
            <PieChart
              withLabelsLine
              labelsPosition="outside"
              labelsType="value"
              withLabels
              withTooltip
              tooltipDataSource="segment"
              data={
                stats?.soilArea?.map((f: any, index: number) => ({
                  value: f.hectares,
                  name: f.type,
                  color: colors[index % colors.length],
                })) || []
              }
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};
