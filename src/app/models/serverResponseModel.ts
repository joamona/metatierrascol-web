import { isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StateEnum } from "../enumerations/stateEnum";
import { GlobalMessageService } from "../services/global-message.service";
import { Message } from "./message";


export class ServerResponseModel {
  serverMessages: Message[]=[];
  joinedMessages:string='';
  constructor(public messages: any, public data: any[], public globalMessageService?: GlobalMessageService, public snackBar?: MatSnackBar) {
    let i=1;
    for (const key in messages) {
      if (messages.hasOwnProperty(key)) {
        const messageContent = messages[key];
        let stateType;
        if (key === 'exito') {
          stateType = StateEnum.success;
        } else if (key === 'error_solicitud') {
          stateType = StateEnum.error; // StateEnum.error
        } else {
          continue; // Skip unknown keys
        }
        this.serverMessages.push(new Message(stateType, messageContent,i));
        if (!(this.globalMessageService === undefined)){
          this.globalMessageService.add(new Message(stateType, messageContent,i));
        }
        if (isDevMode()){
            console.log(i.toString() + '. ' + key + ": " + messageContent)
        }
        this.joinedMessages += i.toString() + '. ' + key + ": " + messageContent + '\n';
        i++;
      }
    }
    if (!(this.snackBar === undefined) && this.joinedMessages!=''){
      this.snackBar.open(this.joinedMessages, 'Cerrar', { duration: 3000, verticalPosition: 'bottom' });
    } 
    if (!(this.snackBar === undefined) && this.joinedMessages==''){
      this.snackBar.open('El servidor no devolvió ningún mensaje', 'Cerrar', { duration: 3000, verticalPosition: 'bottom' });
    } 
  }
}