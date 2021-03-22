/**
 * Sample Adaptive Card
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from 'react';
 import { StyleSheet, View, Alert } from 'react-native';
 import { Registry } from 'adaptivecards-reactnative/src/components/registration/registry';
 import { RatingRenderer } from './rating-renderer';
 import { CustomActionRenderer } from './custom-action-renderer';
 import AdaptiveCard from 'adaptivecards-reactnative';
 
 const customHostConfig = {
     // spacing: {
     //     medium: 5
     // }
 }
 
 const customThemeConfig = {
     input: {
         borderColor: '#000000', backgroundColor: '#F5F5F5',
     }
 }
 
 const customActionsPayload = {
     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
     "type": "AdaptiveCard",
     "version": "1.0",
     "body": [
         {
             "type": "TextBlock",
             "text": "Publish Adaptive Card schema",
             "weight": "bolder",
             "size": "medium"
         },
         {
             "type": "RatingBlock",
             "rating": "*****",
             "weight": "bolder",
             "size": "medium"
         },
         {
             "type": "ColumnSet",
             "spacing": "medium",
             "columns": [
                 {
                     "type": "Column",
                     "width": "auto",
                     "items": [
                         {
                             "type": "Image",
                             "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                             "size": "small",
                             "style": "person"
                         }
                     ]
                 },
                 {
                     "type": "Column",
                     "width": "stretch",
                     "verticalContentAlignment": "center",
                     "spacing": "medium",
                     "items": [
                         {
                             "type": "TextBlock",
                             "text": "Matt Hidinger",
                             "weight": "bolder",
                             "wrap": true
                         },
                         {
                             "type": "TextBlock",
                             "spacing": "none",
                             "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                             "isSubtle": true,
                             "wrap": true
                         }
                     ]
                 }
             ]
         },
         {
             "type": "TextBlock",
             "text": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
             "wrap": true,
             "spacing": "default"
         },
         {
             "type": "FactSet",
             "facts": [
                 {
                     "title": "Board:",
                     "value": "Adaptive Card"
                 },
                 {
                     "title": "List:",
                     "value": "Backlog"
                 },
                 {
                     "title": "Assigned to:",
                     "value": "Matt Hidinger"
                 },
                 {
                     "title": "Due date:",
                     "value": "Not set"
                 }
             ]
         },
         {
             "type": "Action.Custom",
             "title": "Custom Action",
             "url": "https://msn.com"
         }
     ],
     "selectAction": {
         "type": "Action.Customurl",
         "url": "https://adaptivecards.io/",
         "title": "Action.Submit",
         "data": {
             "x": 13
         }
     }
 }
 
 export default class SecondScreen extends Component {
 
     constructor(props) {
         super(props);
     }
 
     /**
      * @description Handler for the payload actions.
      * @param {object} actionObject - Details and data about the action.
      */
     onExecuteAction = (actionObject) => {
         if (actionObject.type === "Action.Submit") {
             Alert.alert(
                 'Rendered Submit',
                 JSON.stringify(actionObject.data),
                 [
                     { text: "Okay", onPress: () => console.log('OK Pressed') },
                 ],
                 { cancelable: false }
             )
         } else if (actionObject.type === "Action.OpenUrl" && !Utils.isNullOrEmpty(actionObject.url)) {
             Linking.canOpenURL(actionObject.url).then(supported => {
                 if (supported) {
                     Linking.openURL(actionObject.url).catch(() => {
                         console.log("Failed to open URI: " + actionObject.url)
                         this.alertAction(actionObject);
                     });
                 } else {
                     console.log("Don't know how to open URI: " + actionObject.url);
                     this.alertAction(actionObject);
                 }
             });
         } else if (actionObject.type === "Action.Customurl") {
             this.alertAction(actionObject);
         } else {
             this.alertAction(actionObject)
         }
     }
 
     /**
      * @description Alert the action object 
      * @param {object} actionObject - Details and data about the action.
      */
 
     alertAction = (actionObject) => {
         Alert.alert(
             'Action',
             JSON.stringify(actionObject),
             [
                 { text: "Okay", onPress: () => console.log('OK Pressed') },
             ],
             { cancelable: false }
         )
     }
 
     render() {
         //Register Custom Components
         Registry.getManager().registerComponent('RatingBlock', RatingRenderer);
 
         //Register Custom Actions
         Registry.getManager().registerComponent('Action.Custom', CustomActionRenderer);
         return (
             <View style={styles.container}>
                 <AdaptiveCard
                     key='secondScreen'
                     payload={customActionsPayload}
                     hostConfig={customHostConfig}
                     themeConfig={customThemeConfig}
                     onExecuteAction={this.onExecuteAction}
                 />
             </View>
         );
     }
 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#F5FCFF'
     }
 });
 
 