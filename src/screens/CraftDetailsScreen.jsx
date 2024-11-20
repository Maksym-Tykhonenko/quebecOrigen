import { View } from "react-native"
import CraftDetails from "../components/CraftDetails"
import MenuPanel from "../components/MenuPanel";

const CraftDetailsScreen = ({ route }) => {
    const { name, fact, history, significance } = route.params;
    
    return (
        <View style={styles.container}>
            <CraftDetails
                name={name}
                fact={fact}
                history={history}
                significance={significance}
             />
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

export default CraftDetailsScreen;