import { Center, Heading, SafeAreaView, VStack } from "@gluestack-ui/themed";
import React from "react";

const Permissions: React.FC = () => {
  return (
    <SafeAreaView>
      <VStack>
        <Center>
          <Heading>Permissions</Heading>
        </Center>
      </VStack>
      <Center flex={1} />
    </SafeAreaView>
  );
};

export default Permissions;
