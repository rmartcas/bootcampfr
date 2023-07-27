import { Core } from '../../../@core/common/model/core';
import { Author } from '../author/author';

export class Book extends Core<number> {
    title: string;

    authorName?: Author;
}
