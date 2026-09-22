import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Button from "./Button";

export default function SelectWinnerModal({
  getWinner,
  setShowModal,
  playerNames,
  playerIds,
}: {
  getWinner: (winnerId: number) => void;
  setShowModal: (show: boolean) => void;
  playerNames: string[];
  playerIds: number[];
}) {
  const [selectedWinner, setSelectedWinner] = useState<number>(-1);

  return (
    <>
      <Modal>
        <View style={styles.modalView}>
          <View style={styles.dropdownView}>
            <SelectDropdown
              data={playerNames}
              onSelect={(selectedName, index) => {
                setSelectedWinner(playerIds[index]);
              }}
              renderButton={(selectedName, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    {
                      <Text style={styles.dropdownNameText}>
                        {selectedName || "Select a winner"}
                      </Text>
                    }
                    <FontAwesome
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      size={16}
                      color={"#fff"}
                      style={{}}
                    />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View
                    style={{
                      ...styles.dropdownItemStyle,
                      ...(isSelected && { backgroundColor: "#47576c" }),
                    }}
                  >
                    <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                );
              }}
            ></SelectDropdown>
          </View>
          <View style={styles.buttonView}>
            <Button
              label={"Cancel"}
              onPress={() => setShowModal(false)}
              enabled={true}
              buttonStyle={styles.bottomButtonStyle}
              labelStyle={styles.bottomButtonLabelStyle}
            />
            <Button
              label={"Finish"}
              onPress={() => getWinner(selectedWinner)}
              enabled={true}
              buttonStyle={styles.bottomButtonStyle}
              labelStyle={styles.bottomButtonLabelStyle}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#25292e",
  },
  dropdownView: {
    alignContent: "center",
    borderRadius: 8,
    borderWidth: 3,
    borderColor: "#ffd33d",
    backgroundColor: "#7590b32e",
  },
  dropdownNameText: {
    color: "#fff",
    fontSize: 22,
    flex: 1,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#7590b32e",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTextStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "#293341",
  },
  dropdownItemTxtStyle: {
    color: "#fff",
    fontSize: 18,
  },
  buttonView: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  bottomButtonContainerStyle: {},
  bottomButtonStyle: { width: 85, height: 30 },
  bottomButtonLabelStyle: {
    fontSize: 20,
  },
});

/**
 * <SelectDropdown
    data={emojisWithIcons}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Select your mood'}
          </Text>
          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  /> */
