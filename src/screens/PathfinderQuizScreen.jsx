import { View } from "react-native"
import PathfinderQuiz from "../components/PathfinderQuiz"

const PathfinderQuizScreen = ({ route }) => {
    const { quiz } = route.params;

    return (
        <View style={styles.container}>
            <PathfinderQuiz quiz = {quiz} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default PathfinderQuizScreen;