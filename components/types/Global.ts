// structure of the blocks object
interface Block {
    id?: string;
    title: string;
    variables?: string[];
}

// structure of the page object
interface Page {
    id?: string;
    title: string;
    link: string;
    blocks: Block[];
}
