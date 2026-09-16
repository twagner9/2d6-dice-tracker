import { Modal, Text, View } from "react-native";

export default function ConfirmNameDialog({ players }: { players: string[] }) {
  return (
    <>
      <Modal>
        <View>
          <Text>{"Are the following players returning players?"}</Text>
          <View>
            {Array.from({ length: players.length }, (_, index) => {
              return <Text>{players[index]}</Text>;
            })}
          </View>
          <Text>
            {
              "If any are not, try adding initials or otherwise being more specific to differentiate the name from previous players. Otherwise, proceed."
            }
          </Text>
        </View>
        <View>
          {/* TODO: add two buttons that will be at the bottom of the modal */}
        </View>
      </Modal>
    </>
  );
}
