import { Modal, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ConfirmNameDialog({
  players,
  shouldShowModal,
  startGame,
}: {
  players: string[];
  shouldShowModal: (show: boolean) => void;
  startGame: () => void;
}) {
  return (
    <>
      <Modal>
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <View style={styles.displayExistingNamesView}>
              <Text style={styles.modalText}>
                {"Are the following players returning players?"}
              </Text>
              <View style={styles.namesList}>
                {Array.from({ length: players.length }, (_, index) => {
                  return (
                    <Text style={styles.modalText} key={index}>
                      {players[index]}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.explanationView}>
                <Text style={styles.modalText}>
                  {
                    "If any are not, try adding initials or otherwise being more specific to differentiate the name from previous players. Otherwise, proceed."
                  }
                </Text>
              </View>
            </View>
            <View style={styles.confirmButtonsView}>
              <Button
                theme="new game"
                label={"Cancel"}
                onPress={() => shouldShowModal(false)}
                enabled={true}
              />
              <Button
                theme="new game"
                label={"Proceed"}
                onPress={startGame}
                enabled={true}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, 0.9)",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  displayExistingNamesView: {
    alignItems: "center",
  },
  namesList: {
    flexDirection: "row",
    margin: 10,
    gap: 10,
  },
  explanationView: {
    alignContent: "center",
  },
  confirmButtonsView: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 15,
  },
  modalText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
