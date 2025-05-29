import { formatCNPJ, formatCPF } from "@brazilian-utils/brazilian-utils";
import { Button, Flex } from "@mantine/core";
import axios from "axios";
import { useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { MRT_Localization_PT_BR } from "mantine-react-table/locales/pt-BR/index.cjs";
import type { Farm, Producer } from "../interfaces/producer";
import type { Harvest } from "../interfaces/harvest";
import { notifications } from "@mantine/notifications";

export const useManagement = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [documentType, setDocumentType] = useState<"cpf" | "cnpj">("cpf");
  const [cpf, setCpf] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [harvests, setHarvests] = useState<Harvest[]>([]);

  const [nameFarm, setNameFarm] = useState<string>("");
  const [cityFarm, setCityFarm] = useState<string>("");
  const [stateFarm, setStateFarm] = useState<string>("");
  const [totalAreaFarm, setTotalAreaFarm] = useState<number | null>(null);
  const [atricultureAreaFarm, setAtricultureAreaFarm] = useState<number | null>(null);
  const [vegetationAreaFarm, setVegetationAreaFarm] = useState<number | null>(null);
  const [producerId, setProducerId] = useState<number | null>(null);
  const [harvestsFarm, setHarvestsFarm] = useState<string[]>([]);

  const [producer, setProducer] = useState<Partial<Producer> | null>(null);

  const [isProducerModalOpened, { open: openProducerModal, close: closeProducerModal }] = useDisclosure(false);
  const [isProducerFarmModalOpened, { open: openProducerFarmModal, close: closeProducerFarmModal }] =
    useDisclosure(false);
  const [isProducerFarmEditModalOpened, { open: openProducerFarmEditModal, close: closeProducerFarmEditModal }] =
    useDisclosure(false);
  const [isProducerEditModalOpened, { open: openProducerEditModal, close: closeProducerEditModal }] =
    useDisclosure(false);
  const [isConfirmModalOpened, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);

  useEffect(() => {
    const fetchData = async () => {
      const producers = await axios.get("/api/producer");

      setProducers(producers.data);

      const harvests = await axios.get("/api/harvest");
      setHarvests(harvests.data);
    };
    fetchData();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "cpf",
        header: "CPF/CNPJ",
        accessorFn: (row) => (row.cpf ? formatCPF(row.cpf) : row.cnpj ? formatCNPJ(row.cnpj) : "-"),
      },
      {
        accessorKey: "name",
        header: "Nome",
      },
      {
        accessorKey: "farms",
        accessorFn: (row) => row.farms?.length,
        header: "Fazendas",
      },
      {
        accessorKey: "createdAt",
        header: "Criado em",
        accessorFn: (row) => new Date(row.createdAt).toLocaleString("pt-BR"),
      },
      {
        header: "Ações",
        id: "actions",
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Flex gap="xs">
            <Button
              size="xs"
              onClick={() => {
                setProducerId(row.original.id);
                setSelectedProducer(row.original);
                openProducerFarmModal();
              }}>
              Adicionar fazenda
            </Button>
            <Button
              size="xs"
              color="blue"
              onClick={() => {
                setProducerId(row.original.id);
                setProducer(row.original);
                openProducerEditModal();
              }}>
              Editar produtor
            </Button>
            <Button
              size="xs"
              color="blue"
              onClick={() => {
                setProducerId(row.original.id);
                setSelectedProducer(row.original);
                openProducerFarmEditModal();
              }}>
              Ver fazendas
            </Button>
            <Button
              size="xs"
              color="red"
              onClick={() => {
                setSelectedProducer(row.original);
                openConfirmModal();
              }}>
              Excluir produtor
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: producers,
    initialState: {
      sorting: [
        {
          id: "id",
          desc: true,
        },
      ],
    },
    localization: MRT_Localization_PT_BR,
  });

  const onClickSaveProducer = async () => {
    const body = {
      name,
      cpf: documentType === "cpf" ? cpf?.replace(/[^0-9]/g, "") : undefined,
      cnpj: documentType === "cnpj" ? cnpj?.replace(/[^0-9]/g, "") : undefined,
    };

    try {
      const response = await axios.post("/api/producer", body);

      notifications.show({
        color: "green",
        title: "Sucesso",
        message: "Produtor criado com sucesso",
      });

      setProducers((prev) => [...prev, response.data]);
      setName("");
      setCpf("");
      setCnpj("");
      closeProducerModal();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao salvar produtor";

      notifications.show({
        title: "Erro",
        message,
      });
    }
  };

  const onClickSaveProducerFarm = async () => {
    const harvestsId = harvestsFarm.flatMap((harvest) => {
      const harvestFind = harvests.find((h) => h.name === harvest);
      if (!harvestFind) return [];
      return { plantationId: Number(harvestFind.id) };
    });

    const body = {
      name: nameFarm,
      city: cityFarm,
      state: stateFarm,
      totalArea: totalAreaFarm,
      atricultureArea: atricultureAreaFarm,
      vegetationArea: vegetationAreaFarm,
      plantation: harvestsId,
      producerId: producerId,
    };

    try {
      const response = await axios.post("/api/farm", body);

      notifications.show({
        color: "green",
        title: "Sucesso",
        message: "Fazenda criada com sucesso",
      });

      setProducers((prev) =>
        prev.map((producer) =>
          producer.id === response.data.producerId
            ? {
                ...producer,
                farms: producer.farms.some((farm) => farm.id === response.data.id)
                  ? producer.farms.map((farm) => (farm.id === response.data.id ? response.data : farm))
                  : [...producer.farms, response.data],
              }
            : producer
        )
      );
      setNameFarm("");
      setCityFarm("");
      setStateFarm("");
      setTotalAreaFarm(null);
      setAtricultureAreaFarm(null);
      setVegetationAreaFarm(null);
      setProducerId(null);
      setHarvestsFarm([]);
      closeProducerFarmModal();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao salvar fazenda";

      notifications.show({
        color: "red",
        title: "Erro",
        message,
      });
    }
  };

  const onClickSaveProducerFarmEdit = async () => {
    const body = {
      name: selectedFarm?.name,
      city: selectedFarm?.city,
      state: selectedFarm?.state,
      totalArea: selectedFarm?.totalArea,
      atricultureArea: selectedFarm?.atricultureArea,
      vegetationArea: selectedFarm?.vegetationArea,
      plantation: selectedFarm?.crops?.map((crop) => {
        return { plantationId: crop.plantationId, farmId: crop.farmId };
      }),
      producerId: selectedFarm?.producerId,
    };

    try {
      await axios.patch(`/api/farm/${selectedFarm?.id}`, body);

      notifications.show({
        color: "green",
        title: "Sucesso",
        message: "Fazenda editada com sucesso",
      });

      const producers = await axios.get("/api/producer");

      setProducers(producers.data);

      setNameFarm("");
      setCityFarm("");
      setStateFarm("");
      setTotalAreaFarm(null);
      setAtricultureAreaFarm(null);
      setVegetationAreaFarm(null);
      setProducerId(null);
      setSelectedFarm(null);
      setHarvestsFarm([]);
      closeProducerFarmEditModal();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao editar fazenda";

      notifications.show({
        color: "red",
        title: "Erro",
        message,
      });
    }
  };

  const onClickSaveProducerEdit = async () => {
    const body = {
      name: producer?.name,
      cpf: (producer?.cpf && producer?.cpf?.replace(/[^0-9]/g, "")) || undefined,
      cnpj: (producer?.cnpj && producer?.cnpj?.replace(/[^0-9]/g, "")) || undefined,
    };

    try {
      const response = await axios.patch(`/api/producer/${producerId}`, body);

      notifications.show({
        color: "green",
        title: "Sucesso",
        message: "Produtor editado com sucesso",
      });
      setProducers((prev) => prev.map((producer) => (producer.id === response.data.id ? response.data : producer)));
      setProducer(null);
      closeProducerEditModal();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao editar produtor";

      notifications.show({
        color: "red",
        title: "Erro",
        message,
      });
    }
  };

  const onClickRemoveProducer = async (producerId: number) => {
    try {
      await axios.delete(`/api/producer/${producerId}`);

      notifications.show({
        color: "green",
        title: "Sucesso",
        message: "Produtor removido com sucesso",
      });
      setProducers((prev) => prev.filter((producer) => producer.id !== producerId));
      setSelectedProducer(null);
      closeConfirmModal();
    } catch (error: any) {
      const message = error.response?.data?.message || "Erro ao remover produtor";

      notifications.show({
        color: "red",
        title: "Erro",
        message,
      });
    }
  };

  return {
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
    openProducerFarmEditModal,
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
  };
};
