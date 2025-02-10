interface BlockTemplate {
    id?: string;
    title: string;
    variables: string[];
}

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
