import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { registerRootComponent } from "expo";
import React from "react";
import { RecoilRoot } from "recoil";

import Router from "../Router";

const App: React.FC = () => {
  return (
    <GluestackUIProvider config={config}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </GluestackUIProvider>
  );
};

registerRootComponent(App);
