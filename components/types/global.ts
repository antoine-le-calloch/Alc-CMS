// structure of the blocks object
interface Block {
    id: string | null;
    name: string;
    data: any;
}

// structure of the page object
interface Page {
    id: string | null;
    title: string;
    link: string;
    blocks: Block[];
}
