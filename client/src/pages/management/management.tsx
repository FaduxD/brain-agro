import { MantineReactTable } from "mantine-react-table";
import {
  Button,
  Flex,
  Group,
  TextInput,
  Modal,
  Radio,
  Title,
  Autocomplete,
  NumberInput,
  MultiSelect,
  Select,
  Text,
} from "@mantine/core";
import { useManagement } from "./hooks/use-management";
import { Input } from "../../components/input/input";
import { getCities, getStates } from "@brazilian-utils/brazilian-utils";
import { useNavigate } from "react-router-dom";
import type { Farm } from "./interfaces/producer";

export const Management = () => {
  const navigator = useNavigate();
  const {
    table,
    onClickSaveProducer,
    onClickSaveProducerFarm,
    onClickSaveProducerFarmEdit,
    onClickSaveProducerEdit,
    onClickRemoveProducer,
    isProducerModalOpened,
    isProducerFarmModalOpened,
    isProducerEditModalOpened,
    openProducerModal,
    closeProducerModal,
    closeProducerFarmModal,
    closeProducerEditModal,
    isConfirmModalOpened,
    closeConfirmModal,
    isProducerFarmEditModalOpened,
    closeProducerFarmEditModal,
    documentType,
    setDocumentType,
    cpf,
    setCpf,
    cnpj,
    setCnpj,
    name,
    setName,
    selectedProducer,
    harvests,
    nameFarm,
    setNameFarm,
    cityFarm,
    setCityFarm,
    stateFarm,
    setStateFarm,
    totalAreaFarm,
    setTotalAreaFarm,
    atricultureAreaFarm,
    setAtricultureAreaFarm,
    vegetationAreaFarm,
    setVegetationAreaFarm,
    producerId,
    harvestsFarm,
    setHarvestsFarm,
    producer,
    setProducer,
    selectedFarm,
    setSelectedFarm,
  } = useManagement();

  return (
    <div style={{ padding: "20px" }}>
      <Title ta="center">Brain Agriculture - Teste Técnico v2 - Gerenciamento</Title>
      <Text ta="center" fs="italic">
        Desenvolvido por Fabiano Cunha (fadu.flc0@gmail.com)
      </Text>
      <Flex justify="center" gap="lg">
        <Button color="gray" onClick={() => navigator("/")}>
          Voltar para início
        </Button>
        <Button mb="lg" color="green" onClick={openProducerModal}>
          Adicionar produtor
        </Button>
      </Flex>
      <MantineReactTable table={table} />
      <Modal opened={isProducerModalOpened} onClose={closeProducerModal} title="Adicionar produtor" size="md">
        <Radio.Group
          name="document"
          value={documentType}
          onChange={(value) => setDocumentType(value as "cpf" | "cnpj")}
          mb="md"
          withAsterisk>
          <Group mt="xs">
            <Radio value="cpf" label="CPF" />
            <Radio value="cnpj" label="CNPJ" />
          </Group>
        </Radio.Group>
        {documentType === "cpf" ? (
          <Input
            placeholder="000.000.000-00"
            label="CPF"
            mask="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onInput={(e) => setCpf(e.currentTarget.value)}
            withAsterisk
          />
        ) : (
          <Input
            placeholder="00.000.000/0000-00"
            label="CNPJ"
            mask="00.000.000/0000-00"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            onInput={(e) => setCnpj(e.currentTarget.value)}
            withAsterisk
          />
        )}
        <TextInput
          placeholder="Digite o nome do produtor"
          label="Nome do produtor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onInput={(e) => setName(e.currentTarget.value)}
          withAsterisk
        />
        <Flex justify="center">
          <Button mt="md" color="green" onClick={onClickSaveProducer}>
            Salvar
          </Button>
        </Flex>
      </Modal>

      <Modal opened={isConfirmModalOpened} onClose={closeConfirmModal} title="Aviso" size="md">
        <Title order={3}>Tem certeza que deseja excluir esse produtor?</Title>
        <Flex justify="end" gap="md">
          <Button mt="md" color="red" onClick={() => onClickRemoveProducer(selectedProducer?.id || 0)}>
            Deletar
          </Button>
        </Flex>
      </Modal>

      <Modal
        opened={isProducerFarmModalOpened}
        onClose={closeProducerFarmModal}
        title={`Adicionar fazenda para o produtor ${producerId}`}
        size="md">
        <TextInput
          placeholder="Digite o nome da fazenda"
          label="Nome da fazenda"
          value={nameFarm}
          onChange={(e) => setNameFarm(e.target.value)}
          onInput={(e) => setNameFarm(e.currentTarget.value)}
          withAsterisk
        />
        <Autocomplete
          label="Estado"
          placeholder="Selecione um estado"
          data={getStates().map((item) => item.code)}
          value={stateFarm}
          onChange={(e) => setStateFarm(e)}
          withAsterisk
        />
        <Autocomplete
          label="Cidade"
          placeholder="Selecione uma cidade"
          data={stateFarm ? getCities((stateFarm as any) || "") : []}
          value={cityFarm}
          onChange={(e) => setCityFarm(e)}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área total da fazenda"
          label="Área total da fazenda"
          value={totalAreaFarm || ""}
          onChange={(e) => setTotalAreaFarm(Number(e))}
          onInput={(e) => setTotalAreaFarm(Number(e))}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área agricultável da fazenda"
          label="Área agricultável da fazenda"
          value={atricultureAreaFarm || ""}
          onChange={(e) => setAtricultureAreaFarm(Number(e))}
          onInput={(e) => setAtricultureAreaFarm(Number(e))}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área vegetação da fazenda"
          label="Área vegetação da fazenda"
          value={vegetationAreaFarm || ""}
          onChange={(e) => setVegetationAreaFarm(Number(e))}
          onInput={(e) => setVegetationAreaFarm(Number(e))}
          withAsterisk
        />
        <MultiSelect
          label="Culturas"
          placeholder="Escolha as culturas"
          data={harvests.map((item: any) => item.name)}
          value={harvestsFarm}
          onChange={(e) => setHarvestsFarm(e)}
          searchable
          withAsterisk
        />
        <Flex justify="center">
          <Button mt="md" color="green" onClick={onClickSaveProducerFarm}>
            Salvar
          </Button>
        </Flex>
      </Modal>

      <Modal
        opened={isProducerFarmEditModalOpened}
        onClose={closeProducerFarmEditModal}
        title={`Editar fazenda para o produtor ${producerId}`}
        size="md">
        <Select
          label="Selecione a fazenda"
          placeholder="Selecione uma fazenda"
          data={selectedProducer?.farms?.map((item: any) => item.name) || []}
          onChange={(e) => setSelectedFarm(selectedProducer?.farms?.find((item: any) => item.name === e) as Farm)}
          mb="xl"
        />
        <TextInput
          placeholder="Digite o nome da fazenda"
          label="Nome da fazenda"
          value={selectedFarm?.name}
          // onChange={(e) => setNameFarm(e.target.value)}
          onInput={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, name: e.currentTarget.value })}
          withAsterisk
        />
        <Autocomplete
          label="Estado"
          placeholder="Selecione um estado"
          data={getStates().map((item) => item.code)}
          value={selectedFarm?.state}
          onChange={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, state: e })}
          withAsterisk
        />
        <Autocomplete
          label="Cidade"
          placeholder="Selecione uma cidade"
          data={selectedFarm?.state ? getCities((selectedFarm?.state as any) || "") : []}
          value={selectedFarm?.city}
          onChange={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, city: e })}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área total da fazenda"
          label="Área total da fazenda"
          value={selectedFarm?.totalArea || ""}
          // onChange={(e) => setTotalAreaFarm(Number(e))}
          onInput={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, totalArea: Number(e) })}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área agricultável da fazenda"
          label="Área agricultável da fazenda"
          value={selectedFarm?.atricultureArea || ""}
          // onChange={(e) => setAtricultureAreaFarm(Number(e))}
          onInput={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, atricultureArea: Number(e) })}
          withAsterisk
        />
        <NumberInput
          placeholder="Digite a área vegetação da fazenda"
          label="Área vegetação da fazenda"
          value={selectedFarm?.vegetationArea || ""}
          // onChange={(e) => setVegetationAreaFarm(Number(e))}
          onInput={(e) => selectedFarm && setSelectedFarm({ ...selectedFarm, vegetationArea: Number(e) })}
          withAsterisk
        />
        <MultiSelect
          label="Culturas"
          placeholder="Escolha as culturas"
          data={harvests.map((item: any) => item.name)}
          value={
            selectedFarm?.crops?.map((item: any) => {
              return item.plantation.name;
            }) || []
          }
          onChange={(selectedNames: string[]) => {
            if (!selectedFarm) return;

            const updatedCrops = harvests
              .filter((h) => selectedNames.includes(h.name))
              .map((h) => ({
                plantationId: h.id,
                farmId: selectedFarm.id,
                plantation: h,
              }));

            setSelectedFarm({ ...selectedFarm, crops: updatedCrops as any });
          }}
          searchable
          withAsterisk
        />
        <Flex justify="center">
          <Button mt="md" color="green" onClick={onClickSaveProducerFarmEdit}>
            Salvar
          </Button>
        </Flex>
      </Modal>

      <Modal
        opened={isProducerEditModalOpened}
        onClose={closeProducerEditModal}
        title="Editar dados do produtor"
        size="md">
        {producer?.cpf ? (
          <Input
            placeholder="000.000.000-00"
            label="CPF"
            mask="000.000.000-00"
            value={producer?.cpf || producer?.cnpj || ""}
            onChange={(e) =>
              setProducer({
                ...producer,
                cpf: producer?.cpf && e.target.value,
              })
            }
            onInput={(e) =>
              setProducer({
                ...producer,
                cpf: producer?.cpf && e.target.value,
              })
            }
            withAsterisk
          />
        ) : (
          <Input
            placeholder="00.000.000/0000-00"
            label="CNPJ"
            mask="00.000.000/0000-00"
            value={producer?.cnpj || ""}
            onChange={(e) =>
              setProducer({
                ...producer,
                cnpj: producer?.cnpj && e.target.value,
              })
            }
            onInput={(e) =>
              setProducer({
                ...producer,
                cnpj: producer?.cnpj && e.target.value,
              })
            }
            withAsterisk
          />
        )}
        <TextInput
          placeholder="Digite o nome do produtor"
          label="Nome do produtor"
          value={producer?.name || ""}
          onChange={(e) =>
            setProducer({
              ...producer,
              name: e.target.value,
            })
          }
          onInput={(e) =>
            setProducer({
              ...producer,
              name: e.currentTarget.value,
            })
          }
          withAsterisk
        />
        <Flex justify="center">
          <Button mt="md" color="green" onClick={onClickSaveProducerEdit}>
            Salvar
          </Button>
        </Flex>
      </Modal>
    </div>
  );
};
