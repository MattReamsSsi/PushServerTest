export interface ApiClientData {
    id: string;
    description: string;
    isDeleted: boolean;
}

export interface UserData {
    id: string;
    apiClientId: string;
    messagesCount: number;
}

export interface PushMessage {
    apiClientId: string;
    userId: string;
    title: string;
    messageBody: string;
}


