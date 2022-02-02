import firebase from "firebase/compat/app";

interface IShort {
    uid: string;
    displayName?: string | null;
    title: string;
    fileName: string;
    url: string;
    timestamp: firebase.firestore.FieldValue;
}

export class Short implements IShort {
    uid: string;
    displayName?: string | null;
    title: string;
    fileName: string;
    url: string;
    timestamp: firebase.firestore.FieldValue;

    constructor(
        uid: string,
        displayName: string | null,
        title: string,
        fileName: string,
        url: string,
        timestamp: firebase.firestore.FieldValue,
    ) {
        this.uid = uid;
        this.displayName = displayName;
        this.title = title;
        this.fileName = fileName;
        this.url = url;
        this.timestamp = timestamp;
    }

}
