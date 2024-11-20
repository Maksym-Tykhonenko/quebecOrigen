import { View } from "react-native"
import Map from "../components/Map"
import MenuPanel from "../components/MenuPanel";

const MapScreen = ({ route }) => {
    const { image, name, story, coordinates } = route.params
    return (
        <View style={styles.container}>
            <Map
                image={image}
                name={name}
                story={story}
                coordinates={coordinates}
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

export default MapScreen;