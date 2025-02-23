interface Block {
    id?: string;
    title: string;
    variables: string[];
}

interface PageItem {
    blockId?: string;
    content: string[];
}

interface Page {
    id?: string;
    title: string;
    link: string;
    blocks: Block[];
}
