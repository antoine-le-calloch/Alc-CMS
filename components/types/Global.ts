// structure of the blocks object
interface Block {
    id?: string;
    name: string;
    data: any;
}

// structure of the page object
interface Page {
    id?: string;
    title: string;
    link: string;
    blocks: Block[];
}
