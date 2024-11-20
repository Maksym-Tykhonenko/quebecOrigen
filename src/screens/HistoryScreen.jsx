import { View } from "react-native"
import History from "../components/History"
import MenuPanel from "../components/MenuPanel";

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <History />
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

export default HistoryScreen;