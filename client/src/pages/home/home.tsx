import { Anchor, Card, Flex, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigator = useNavigate();

  return (
    <div>
      <Flex justify="center" gap="lg" align="center" h="100vh" direction="column">
        <Title>Brain Agriculture - Teste Técnico v2</Title>
        <Text ta="center" fs="italic">
          Desenvolvido por Fabiano Cunha (fadu.flc0@gmail.com)
        </Text>
        <Flex gap="lg">
          <Card shadow="sm" padding="lg" radius="md" w="200px" h="200px" withBorder>
            <Flex justify="center" align="center" flex="1">
              <Anchor onClick={() => navigator("/management")}>Gerenciamento</Anchor>
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" w="200px" h="200px" withBorder>
            <Flex justify="center" align="center" flex="1">
              <Anchor onClick={() => navigator("/dashboard")}>Dashboard</Anchor>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </div>
  );
};
