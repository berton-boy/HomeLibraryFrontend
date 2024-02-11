import { Author} from "./author";
import { Publisher } from "./publisher";

export class Book {
    id: number;
    title: string;
    isbn: number;
    releaseYear: number;
    authors: Author[];
    publishers: Publisher[];
    smallCoverUrl: string;
    bigCoverUrl: string;
    eventList: any[];
}


