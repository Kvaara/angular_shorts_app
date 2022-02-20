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
    screenshotFileName: string;
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
    screenshotFileName: string;

    constructor(
        docID: string,
        uid: string,
        displayName: string | null,
        title: string,
        fileName: string,
        shortURL: string,
        screenshotURL: string,
        timestamp: firebase.firestore.FieldValue,
        screenshotFileName: string,
    ) {
        this.docID = docID;
        this.uid = uid;
        this.byUsername = displayName;
        this.title = title;
        this.fileName = fileName;
        this.shortURL = shortURL;
        this.screenshotURL = screenshotURL;
        this.timestamp = timestamp;
        this.screenshotFileName  = screenshotFileName;
    }

}
