import firebase from "firebase/compat/app";

interface IShort {
    docID?: string;
    uid: string;
    byUsername?: string | null;
    title: string;
    fileName: string;
    shortURL: string;
    screenshotURL: string;
    timestamp: firebase.firestore.FieldValue;
}

export class Short implements IShort {
    docID?: string;
    uid: string;
    byUsername?: string | null;
    title: string;
    fileName: string;
    shortURL: string;
    screenshotURL: string;
    timestamp: firebase.firestore.FieldValue;

    constructor(
        docID: string,
        uid: string,
        displayName: string | null,
        title: string,
        fileName: string,
        shortURL: string,
        screenshotURL: string,
        timestamp: firebase.firestore.FieldValue,
    ) {
        this.docID = docID;
        this.uid = uid;
        this.byUsername = displayName;
        this.title = title;
        this.fileName = fileName;
        this.shortURL = shortURL;
        this.screenshotURL = screenshotURL;
        this.timestamp = timestamp;
    }

}
