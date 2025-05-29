import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Router from "./router.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "mantine-react-table/styles.css";
import "./index.css";

library.add(fas);

createRoot(document.getElementById("root")!).render(
  <MantineProvider
    // defaultColorScheme="light"
    theme={{
      primaryColor: "green",
    }}>
    <Notifications />
    <Router />
  </MantineProvider>
);
