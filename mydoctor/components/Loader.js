import { ActivityIndicator, Text ,View} from 'react-native';
import Styles from '../styles/loaderStyle';


const Loader = (props)=> {

    if(!props.loading){
        return null
    }

    return(
        <View style={Styles.container}>
            <ActivityIndicator size={75} color="#20c997" />
            {props.title && <Text style={Styles.text}>{props.title}</Text>}
        </View>
    )
};
export default Loader;