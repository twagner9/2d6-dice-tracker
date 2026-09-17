import { Modal, Text, View } from "react-native";
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
        <View>
          <Text>{"Are the following players returning players?"}</Text>
          <View>
            {Array.from({ length: players.length }, (_, index) => {
              return <Text key={index}>{players[index]}</Text>;
            })}
          </View>
          <Text>
            {
              "If any are not, try adding initials or otherwise being more specific to differentiate the name from previous players. Otherwise, proceed."
            }
          </Text>
        </View>
        <View>
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
      </Modal>
    </>
  );
}
