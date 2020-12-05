/**
* Custom Action Element.
* 
*/

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import {
    InputContext,
    InputContextConsumer
} from 'adaptivecards-reactnative/src/utils/context';

export class CustomActionRenderer extends React.Component {

    static contextType = InputContext;

    constructor(props) {
        super(props);
        this.onExecuteAction = undefined;
    }

    buttonContent = (title) => {
        return (
            <View
                style={styles.button}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
        );
    };

    /**
     * @description Invoked for the any action button selected
     */
	onActionButtonTapped = (url) => {
        //We can construct any object values and we can handle it in the renderer.js file
		let actionObject = { "type": "Custom Action", "url": url };
		this.onExecuteAction(actionObject);
	}

    render() {
        let payload = this.props.json;

        if (payload.isVisible === false) {
            return null;
        }
        const ButtonComponent = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
        return (
            <InputContextConsumer>
                {({ onExecuteAction }) => {
                    this.onExecuteAction = onExecuteAction;

                    return <View style={styles.textContainer}>
                        <ButtonComponent
                            style={{ flexGrow: 1 }}
                            onPress={() => this.onActionButtonTapped(payload.url)}>
                            {this.buttonContent(payload.title)}
                        </ButtonComponent>
                        <Text>{payload.rating}</Text>
                    </View>
                }}
            </InputContextConsumer>);
    }
}

const styles = StyleSheet.create({
    textContainer: {
        width: "100%",
        alignItems: "center",
        backgroundColor: 'transparent',
        height: 50
    },
    text: {
        width: "100%",
        color: "#24A0ED",
        fontWeight: "bold",
        fontSize: 16
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginBottom: 10,
        flexGrow: 1,
        marginHorizontal: 5
    }
});

