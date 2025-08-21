import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Icon,
  Portal,
  Text,
} from "react-native-paper";

import { PackageTypeDTO } from "../../../../types/DTO/PackageTypeDTO";
import UploadReceiptOnUpgradeDialog from "./UploadReceiptOnUpgradeDialog";

type UpgradeDialogProps = {
  visible: boolean;
  onDismiss: () => void;
  plans: PackageTypeDTO[];
  hasPendingUpgrade: boolean;
  onUpgrade: (plan: PackageTypeDTO) => void;
};

const UpgradeDialog: React.FC<UpgradeDialogProps> = ({
  visible,
  onDismiss,
  plans,
  hasPendingUpgrade,
  onUpgrade,
}) => {
  const [openUploadReceipt, setOpenUploadReceipt] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PackageTypeDTO | null>(null);

  const handleUpgrade = (plan: PackageTypeDTO) => {
    setSelectedPlan(plan);
    setOpenUploadReceipt(true);
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          maxHeight: "90%",
          borderRadius: 16,
          backgroundColor: "white",
        }}
      >
        <Dialog.Title>Upgrade Package</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{ padding: 16, gap: 15 }}>
            {plans.map((plan) => (
              <Card key={plan.id}>
                <Card.Title
                  title={plan.name}
                  titleStyle={{ fontWeight: "bold" }}
                  left={() => (
                    <Avatar.Icon
                      size={40}
                      icon="star"
                      color="yellow"
                      style={{ backgroundColor: "transparent" }}
                    />
                  )}
                />
                <Card.Content>
                  <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                    ₱{plan.price.toLocaleString()}
                  </Text>
                  {plan.slashedPrice && (
                    <Text
                      variant="labelSmall"
                      style={{
                        textDecorationLine: "line-through",
                        color: "red",
                      }}
                    >
                      ₱{plan.slashedPrice.toLocaleString()}
                    </Text>
                  )}
                  <Text style={{ marginTop: 8 }}>{plan.description}</Text>
                  <View style={{ marginTop: 8 }}>
                    {plan.features.map((feature, idx) => (
                      <View
                        key={idx}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Icon source="check" size={20} color="green" />
                        <Text style={{ marginLeft: 4 }}>{feature.name}</Text>
                      </View>
                    ))}
                  </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "center" }}>
                  <Button
                    mode="contained"
                    style={{ marginTop: 5, width: "100%" }}
                    buttonColor="blue"
                    disabled={hasPendingUpgrade}
                    onPress={() => handleUpgrade(plan)} // <-- Add this
                  >
                    {hasPendingUpgrade ? "Pending Upgrade" : "Upgrade"}
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Render the UploadReceiptOnUpgradeDialog */}
      {selectedPlan && (
        <UploadReceiptOnUpgradeDialog
          open={openUploadReceipt}
          handleClose={() => setOpenUploadReceipt(false)}
          plan={selectedPlan as PackageTypeDTO}
        />
      )}
    </Portal>
  );
};

export default UpgradeDialog;
