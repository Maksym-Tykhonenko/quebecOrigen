import { View } from "react-native"
import Craft from "../components/Craft"
import MenuPanel from "../components/MenuPanel";

const CraftScreen = () => {
    return (
        <View style={styles.container}>
            <Craft />
            <View style={styles.menu}>
                <MenuPanel />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        width: "100%",
        bottom: 0
    }
}

export default CraftScreen;