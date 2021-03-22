/**
 * Sample Adaptive Card
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { Component } from 'react';
 import { StyleSheet, View, Alert, Button, ScrollView } from 'react-native';
 import { Registry } from 'adaptivecards-reactnative/src/components/registration/registry';
 import { RatingRenderer } from './rating-renderer';
 import { CustomActionRenderer } from './custom-action-renderer';
 import AdaptiveCard from 'adaptivecards-reactnative';
 import * as AdaptiveCardTemplating from 'adaptivecards-templating';
 
 const customThemeConfig = {
   input: {
     borderColor: '#000000', backgroundColor: '#F5F5F5',
   }
 }
 
 let k1 = 0;
 let k2 = 0;
 
 export default class Home extends Component {
 
   constructor(props) {
     super(props);
     this.state = {
       key1: k1++,
       key2: k2++,
       hostConfig1: customHostConfig1,
       hostConfig2: customHostConfig2,
       payload: this.getTemplatePayload()
     };
 
     // Any update affecting state after some time
     setTimeout(() => {
       this.setState({ key2: k2++ });
     }, 5000);
   }
 
   getTemplatePayload = () => {
     try {
       // Add subtype property for quicklook scenario
       let templatePayload = customActionsPayload;
 
       let template = new AdaptiveCardTemplating.Template(templatePayload);
 
       templatePayload = template.expand({
         $root: data
       });
       return templatePayload;
     } catch (error) {
       console.error(error);
     }
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
       <ScrollView style={styles.container}>
         {/* <View style={styles.container1}>
           <ScrollView style={styles.scrollView}>
             <AdaptiveCard
               key={this.state.key1}
               payload={this.state.payload}
               hostConfig={this.state.hostConfig1}
               themeConfig={customThemeConfig}
               onExecuteAction={this.onExecuteAction}
             />
             <Button
               title="rerender card1"
               onPress={() => {
                 this.setState({ key1: k1++ });
               }}
             />
           </ScrollView>
         </View>
         <View
           style={{
             borderBottomColor: 'black',
             borderBottomWidth: 2,
             width: '100%'
           }}
         /> */}
         <View style={styles.container2}>
           <ScrollView style={styles.scrollView}>
             <AdaptiveCard
               key={this.state.key2}
               payload={this.state.payload}
               hostConfig={this.state.hostConfig2}
               themeConfig={customThemeConfig}
               onExecuteAction={this.onExecuteAction}
             />
             <Button
               title="rerender card2"
               onPress={() => {
                 this.setState({ key2: k2++ });
               }}
             />
           </ScrollView>
         </View>
       </ScrollView>
     );
   }
 }
 
 const customHostConfig1 = {
   containerStyles: {
     default: {
       backgroundColor: '#1a1d6e'
     },
   },
   spacing: {
     padding: 50
   }
 }
 
 const customHostConfig2 = {
   containerStyles: {
     default: {
       backgroundColor: '#32a852'
     },
   },
   spacing: {
     padding: 5
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   container1: {
     backgroundColor: '#f7f692'
   },
   container2: {
     backgroundColor: '#b7f7ba'
   }
 });
 
 const customActionsPayload = {
   "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
   "type": "AdaptiveCard",
   "version": "1.0",
   "body": [
       {
           "type": "TextBlock",
           "size": "Medium",
           "weight": "Bolder",
           "text": " ${ParticipantInfoForm.title}",
           "horizontalAlignment": "Center",
           "wrap": true
       },
       {
           "type": "TextBlock",
           "text": "Name",
           "wrap": true
       },
       {
           "type": "Input.Text",
           "style": "text",
           "id": "SimpleVal"
       },
       {
           "type": "TextBlock",
           "text": "Homepage",
           "wrap": true
       },
       {
           "type": "Input.Text",
           "style": "url",
           "id": "UrlVal"
       },
       {
           "type": "TextBlock",
           "text": "Email",
           "wrap": true
       },
       {
           "type": "Input.Text",
           "style": "email",
           "id": "EmailVal"
       },
       {
           "type": "TextBlock",
           "text": "Phone",
           "wrap": true
       },
       {
           "type": "Input.Text",
           "style": "tel",
           "id": "TelVal"
       },
       {
           "type": "TextBlock",
           "text": "Comments",
           "wrap": true
       },
       {
           "type": "Input.Text",
           "style": "text",
           "isMultiline": true,
           "id": "MultiLineVal"
       },
       {
           "type": "TextBlock",
           "text": "Quantity",
           "wrap": true
       },
       {
           "type": "Input.Number",
           "min": -5,
           "max": 5,
           "value": 1,
           "id": "NumVal"
       },
       {
           "type": "TextBlock",
           "text": "Due Date",
           "wrap": true
       },
       {
           "type": "Input.Date",
           "id": "DateVal",
           "value": "2017-09-20"
       },
       {
           "type": "TextBlock",
           "text": "Start time",
           "wrap": true
       },
       {
           "type": "Input.Time",
           "id": "TimeVal",
           "value": "16:59"
       },
       {
           "type": "TextBlock",
           "size": "Medium",
           "weight": "Bolder",
           "text": "${Survey.title} ",
           "horizontalAlignment": "Center",
           "wrap": true
       },
       {
           "type": "TextBlock",
           "text": "${Survey.questions[0].question}",
           "wrap": true
       },
       {
           "type": "Input.ChoiceSet",
           "id": "CompactSelectVal",
           "value": "1",
           "choices": [
               {
                   "$data": "${Survey.questions[0].items}",
                   "title": "${choice}",
                   "value": "${value}"
               }
           ]
       },
       {
           "type": "TextBlock",
           "text": "${Survey.questions[1].question}",
           "wrap": true
       },
       {
           "type": "Input.ChoiceSet",
           "id": "SingleSelectVal",
           "style": "expanded",
           "value": "1",
           "choices": [
               {
                   "$data": "${Survey.questions[1].items}",
                   "title": "${choice}",
                   "value": "${value}"
               }
           ]
       },
       {
           "type": "TextBlock",
           "text": "${Survey.questions[2].question}",
           "wrap": true
       },
       {
           "type": "Input.ChoiceSet",
           "id": "MultiSelectVal",
           "isMultiSelect": true,
           "value": "1,3",
           "choices": [
               {
                   "$data": "${Survey.questions[2].items}",
                   "title": "${choice}",
                   "value": "${value}"
               }
           ]
       },
       {
           "type": "TextBlock",
           "size": "Medium",
           "weight": "Bolder",
           "text": "Input.Toggle",
           "horizontalAlignment": "Center",
           "wrap": true
       },
       {
           "type": "Input.Toggle",
           "title": "${Survey.questions[3].question}",
           "id": "AcceptsTerms",
           "wrap": false,
           "value": "false"
       },
       {
           "type": "Input.Toggle",
           "title": "${Survey.questions[4].question}",
           "valueOn": "RedCars",
           "valueOff": "NotRedCars",
           "id": "ColorPreference",
           "wrap": false,
           "value": "NotRedCars"
       }
   ],
   "actions": [
       {
           "type": "Action.Submit",
           "title": "Submit",
           "data": {
               "id": "1234567890"
           }
       },
       {
           "type": "Action.ShowCard",
           "title": "Show Card",
           "card": {
               "type": "AdaptiveCard",
               "body": [
                   {
                       "type": "TextBlock",
                       "text": "Enter comment",
                       "wrap": true
                   },
                   {
                       "type": "Input.Text",
                       "style": "text",
                       "id": "CommentVal"
                   }
               ],
               "actions": [
                   {
                       "type": "Action.Submit",
                       "title": "OK"
                   }
               ],
               "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
           }
       }
   ]
 }
 
 const data = {
   "ParticipantInfoForm":{
       "title":"Input.Text elements"
   },
   "Survey": {
       "title":"Input ChoiceSet",
       "questions": [
               {
                   "question":"What color do you want? (compact)",
                   "items": [
                       {
                           "choice":"Red",
                           "value":"1"
                       },
                       {
                           "choice":"Green",
                           "value":"2"
                       },
                       {
                           "choice":"Blue",
                           "value":"3"
                       }
                   ]
               },
               {
                   "question": "What color do you want? (expanded)",
                   "items": [
                       {
                           "choice":"Red",
                           "value":"1"
                       },
                       {
                           "choice":"Green",
                           "value":"2"
                       },
                       {
                           "choice":"Blue",
                           "value":"3"
                       }
                   ]
               },
               {
                   "question": "What color do you want? (multiselect)",
                   "items": [
                       {
                           "choice":"Red",
                           "value":"1"
                       },
                       {
                           "choice":"Green",
                           "value":"2"
                       },
                       {
                           "choice":"Blue",
                           "value":"3"
                       }
                   ]
               },
               {
                   "question":"I accept the terms and conditions (True/False)"
               },
               {
                   "question":"Red cars are better than other cars"
               }
           ]
       }
 }
 
 // const customActionsPayload = {
 //   "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
 //   "type": "AdaptiveCard",
 //   "version": "1.2",
 //   "body": [
 //     {
 //       "type": "Container",
 //       "$data": "${holidayListItems}",
 //       "selectAction": {
 //         "type": "Action.Submit",
 //         "data": {
 //           "selectedHolidayIndex": "${$index}",
 //           "page": 1
 //         }
 //       },
 //       "separator": true,
 //       "items": [
 //         {
 //           "type": "TextBlock",
 //           "text": "${Title}",
 //           "color": "dark",
 //           "weight": "Bolder",
 //           "size": "large",
 //           "wrap": true,
 //           "maxLines": 1,
 //           "spacing": "None"
 //         },
 //         {
 //           "type": "TextBlock",
 //           "text": "${ DisplayDateLong }",
 //           "color": "dark",
 //           "wrap": true,
 //           "size": "medium",
 //           "maxLines": 1,
 //           "spacing": "None"
 //         }
 //       ]
 //     }
 //   ]
 // }
 
 // const data = {
 //   "holidayListItems": [
 //     {
 //       "odata.type": "SP.Data.India_x0020_Holiday_x0020_ListListItem",
 //       "odata.id": "f5286505-4d3d-4bbe-8a75-e3268de2138c",
 //       "odata.etag": "\"3\"",
 //       "odata.editLink": "Web/Lists(guid'303c2f4c-f43f-4f17-9b7d-13b9972dcbc3')/Items(1)",
 //       "FileSystemObjectType": 0,
 //       "Id": 1,
 //       "ServerRedirectedEmbedUri": null,
 //       "ServerRedirectedEmbedUrl": "",
 //       "ID": 1,
 //       "ContentTypeId": "0x010003BB5DBFA2857B40BD66E599E948099B0098FDDACD4E65FD41BCA617EA91A8AD12",
 //       "Title": "New Year's Day",
 //       "Modified": "2021-01-18T04:42:54Z",
 //       "Created": "2021-01-18T04:36:23Z",
 //       "AuthorId": 10,
 //       "EditorId": 10,
 //       "OData__UIVersionString": "1.0",
 //       "Attachments": false,
 //       "GUID": "c77c7814-5ef8-49f7-ac3f-ebce0794af44",
 //       "ComplianceAssetId": null,
 //       "StartDate": "2021-01-01T08:00:00Z",
 //       "EndDate": "2021-01-01T08:00:00Z",
 //       "DisplayDateShort": "Jan 1 - Jan 1",
 //       "DisplayDateLong": "January 1, 2021 - January 1, 2021"
 //     },
 //     {
 //       "odata.type": "SP.Data.India_x0020_Holiday_x0020_ListListItem",
 //       "odata.id": "03fb321c-7dfb-4a3e-8687-c0f2a9599a60",
 //       "odata.etag": "\"2\"",
 //       "odata.editLink": "Web/Lists(guid'303c2f4c-f43f-4f17-9b7d-13b9972dcbc3')/Items(2)",
 //       "FileSystemObjectType": 0,
 //       "Id": 2,
 //       "ServerRedirectedEmbedUri": null,
 //       "ServerRedirectedEmbedUrl": "",
 //       "ID": 2,
 //       "ContentTypeId": "0x010003BB5DBFA2857B40BD66E599E948099B0098FDDACD4E65FD41BCA617EA91A8AD12",
 //       "Title": "Republic Day",
 //       "Modified": "2021-01-18T04:42:43Z",
 //       "Created": "2021-01-18T04:36:44Z",
 //       "AuthorId": 10,
 //       "EditorId": 10,
 //       "OData__UIVersionString": "1.0",
 //       "Attachments": false,
 //       "GUID": "58747318-fd14-4cfc-ac69-655a40c8ef2c",
 //       "ComplianceAssetId": null,
 //       "StartDate": "2021-01-26T08:00:00Z",
 //       "EndDate": null,
 //       "DisplayDateShort": "Jan 26",
 //       "DisplayDateLong": "January 26, 2021"
 //     },
 //     {
 //       "odata.type": "SP.Data.India_x0020_Holiday_x0020_ListListItem",
 //       "odata.id": "beeadf48-0808-4313-a36d-0ab6f1e182a0",
 //       "odata.etag": "\"2\"",
 //       "odata.editLink": "Web/Lists(guid'303c2f4c-f43f-4f17-9b7d-13b9972dcbc3')/Items(3)",
 //       "FileSystemObjectType": 0,
 //       "Id": 3,
 //       "ServerRedirectedEmbedUri": null,
 //       "ServerRedirectedEmbedUrl": "",
 //       "ID": 3,
 //       "ContentTypeId": "0x010003BB5DBFA2857B40BD66E599E948099B0098FDDACD4E65FD41BCA617EA91A8AD12",
 //       "Title": "Independence Day",
 //       "Modified": "2021-01-18T04:42:46Z",
 //       "Created": "2021-01-18T04:37:14Z",
 //       "AuthorId": 10,
 //       "EditorId": 10,
 //       "OData__UIVersionString": "1.0",
 //       "Attachments": false,
 //       "GUID": "a26cf2b3-4232-443d-b9e6-47fcab717e8e",
 //       "ComplianceAssetId": null,
 //       "StartDate": "2021-08-15T07:00:00Z",
 //       "EndDate": null,
 //       "DisplayDateShort": "Aug 15",
 //       "DisplayDateLong": "August 15, 2021"
 //     }
 //   ]
 // }
 