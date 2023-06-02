export interface MessageHistoryInterface {
  type: "outgoing" | "incoming";
  idMessage: string | undefined;
  timestamp: number;
  typeMessage: "textMessage" | "extendedTextMessage" | "imageMessage";
  downloadUrl?: string | undefined;
  chatId: string | undefined;
  textMessage: string | undefined;
  extendedTextMessage: MessageDataInterface | undefined;
  statusMessage: string; //maybe change to "" | ""
  sendByApi: boolean;
}

export interface MessageDataInterface {
  text: string | undefined;
  description: string | undefined;
  title: string | undefined;
  previewType: string | undefined;
  jpegThumbnail: string | undefined;
  forwardingScore: any | undefined; //?
  isForwarded: any | undefined; //?
}
