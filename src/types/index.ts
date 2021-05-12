export interface Topic {
    id: string;
    tab: string;
    title: boolean;
    author_id: string;
    author: Author;
    content?: string;
    good?: boolean;
    top?: boolean;
    visit_count?: number;
    reply_count?: number;
    last_reply_at: string;
    created_at?: string;
}

export interface Author {
    avatar_url: string;
    loginname: string;
}