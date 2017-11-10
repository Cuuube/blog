export namespace mdl {

    export class DBArticle {
        file_name = 'string';
        title = 'string';
        author = 'string';
        keywords = 'array';
        description = 'string';
        created_time = 'Date';
        updated_time = 'Date';
        content = 'string';
    }

    export interface Article {
        file_name: string;
        title: string;
        author: string;
        keywords: string[];
        description: string;
        created_time: Date;
        updated_time: Date;
        content: string;
    }

    export class DBUser {
        user_name = 'string';
        password = 'string';
        secret_string = 'string';
        block = 'string';
    }

    export interface User {
        user_name: string;
        password: string;
        secret_string: string;
        block: string;
    }

}