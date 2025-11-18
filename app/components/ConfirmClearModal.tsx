import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onResponse: (shouldClear: boolean) => void;
}>;

export default function ConfirmClearModal({ isVisible, onResponse }: Props) {
  return (
    <Modal
      style={styles.clearModalStyle}
      animationType="fade"
      transparent={false}
      visible={isVisible}
    >
      <View style={styles.confirmClearModalContainer}>
        <View style={styles.confirmClearModalTitleContainer}>
          <Text>{"Clear All Rolls?"}</Text>
          <View style={styles.confirmClearModalContentContainer}>
            <Text>
              {
                "Clearing all rolls cannot be undone. Are you sure you wish to reset?"
              }
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => onResponse(true)}
                hitSlop={12}
              >
                <Text>{"Yes"}</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => onResponse(false)}
              >
                <Text>{"No"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  clearModalStyle: {
    maxHeight: 100,
    maxWidth: 150,
    backgroundColor: "#25292e",
  },
  confirmClearModalContainer: {
    flex: 1,
    flexDirection: "column",
  },
  confirmClearModalTitleContainer: {
    fontSize: 32,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  confirmClearModalContentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 18,
  },
  yesNoButtonContainerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    padding: 10,
  },
  modalButton: {},
});
