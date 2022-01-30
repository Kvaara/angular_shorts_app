interface IShort {
    uid: string;
    displayName?: string | null;
    title: string;
    fileName: string;
    url: string;
}

export class Short implements IShort {
    uid: string;
    displayName?: string | null;
    title: string;
    fileName: string;
    url: string;

    constructor(
        uid: string,
        displayName: string | null,
        title: string,
        fileName: string,
        url: string,
    ) {
        this.uid = uid;
        this.displayName = displayName;
        this.title = title;
        this.fileName = fileName;
        this.url = url;
    }

}
