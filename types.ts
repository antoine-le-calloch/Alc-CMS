// structure of the items used in lists
interface Item {
    id: number;
    title: string;
    info: string;
}

// structure of the blocks object
interface Block {
    name: string;
    data: any;
}

// structure of the page object
interface Page {
    title: string;
    blocks: Block[];
}
