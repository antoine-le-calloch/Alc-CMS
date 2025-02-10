interface BlockTemplate {
    id?: string;
    title: string;
    variables: string[];
}

interface Block {
    blockId?: string;
    variablesContent: string[];
}

interface Page {
    id?: string;
    title: string;
    link: string;
    blocks: Block[];
}
