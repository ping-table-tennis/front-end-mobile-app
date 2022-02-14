import * as React from 'react'
import {View, Text} from 'react-native'

class EventScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight:'bold'}}> Event Screen </Text>
            </View>
            
        );
    }
}

export default EventScreen;