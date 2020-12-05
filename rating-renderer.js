/**
 * TextBlock Element.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#schema-textblock
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export class RatingRenderer extends React.Component {

	render() {
		let payload = this.props.json;

		if (payload.isVisible === false) {
			return null;
		}

		return (
			<View style={styles.textContainer}>
                <Text>{payload.rating}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textContainer: {
		width: "100%",
		alignItems: "center",
		backgroundColor: 'transparent',
	},
	text: {
		width: "100%"
	}
});

