import React from 'react'
import { View, Text } from 'react-native'

export default props => (
    <React.Fragment> 
        {/* acima mesmo que <> </> */}
        <Text>{props.principal}</Text>
        <Text>{props.secundario}</Text>
    </React.Fragment>
)