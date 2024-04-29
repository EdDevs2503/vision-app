import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, SafeAreaView } from "@gluestack-ui/themed";
import { registerRootComponent } from "expo";
import React from "react";

import Permissions from "../Permissions";

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <Permissions />
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

registerRootComponent(App);
