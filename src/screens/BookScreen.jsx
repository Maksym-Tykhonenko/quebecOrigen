import { View } from "react-native"
import Book from "../components/Book"
import MenuPanel from "../components/MenuPanel";

const BookScreen = () => {
    return (
        <View style={styles.container}>
            <Book />
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

export default BookScreen;