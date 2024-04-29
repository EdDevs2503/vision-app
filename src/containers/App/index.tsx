import { config } from "@gluestack-ui/config";
import {
  Center,
  GluestackUIProvider,
  Heading,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { registerRootComponent } from "expo";
import React from "react";

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <SafeAreaView>
        <Center>
          <Heading>Vision App</Heading>
        </Center>
      </SafeAreaView>
    </GluestackUIProvider>
  );
};

registerRootComponent(App);
