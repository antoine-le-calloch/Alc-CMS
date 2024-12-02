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
