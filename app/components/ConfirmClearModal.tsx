import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onResponse: (shouldClear: boolean) => void;
}>;

export default function ConfirmClearModal({ isVisible, onResponse }: Props) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.confirmClearModalContainer}>
        <View style={styles.confirmClearModalTitleContainer}>
          <Text style={styles.titleText}>{"Clear All Rolls?"}</Text>
          <View style={styles.confirmClearModalContentContainer}>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                textAlign: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              {
                "Clearing all rolls cannot be undone. Are you sure you wish to reset?"
              }
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Pressable
                style={styles.modalButton}
                onPress={() => onResponse(false)}
                hitSlop={12}
              >
                <Text>{"Cancel"}</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => onResponse(true)}
                hitSlop={12}
              >
                <Text>{"Reset"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  /**NOTE: styling is not done on the modal itself, but on the top level container.
   * Using the top level view, you can set the background to be translucent with
   * whatever background color is desired
   */
  confirmClearModalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.75)",
    minHeight: "25%",
    maxHeight: "30%",
    margin: "auto",
  },
  confirmClearModalTitleContainer: {
    fontSize: 32,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  titleText: {
    fontSize: 28,
    color: "#fff",
    padding: 5,
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalButton: {
    padding: 5,
    width: "25%",
    margin: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});
