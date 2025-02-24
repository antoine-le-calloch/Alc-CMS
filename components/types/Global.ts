interface Block {
    id?: string;
    title: string;
    variables: string[];
}

interface PageItem {
    id?: string;
    blockId?: string;
    content: string[];
}

interface Page {
    id?: string;
    title: string;
    link: string;
    items: PageItem[];
}
