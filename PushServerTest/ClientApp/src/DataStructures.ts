export interface ApiClientData {
    nodeId: string;
    description: string;
    isDeleted: boolean;
}

export interface UserData {
    id: string;
    apiNodeId: string;
    messagesCount: number;
    description: string;
}

export interface PushMessage {
    apiNodeId: string;
    userId: string;
    title: string;
    messageBody: string;
}


