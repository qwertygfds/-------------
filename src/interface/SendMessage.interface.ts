export interface SendMessageInterface {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  archiveChat?: boolean;
  linkPreview?: boolean;
}
