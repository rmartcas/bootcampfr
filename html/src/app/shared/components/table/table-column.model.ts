import { TableColumn } from '@swimlane/ngx-datatable';

export interface AppTableColumn extends TableColumn {
    /** Additional property order for table sorting. If not defined "prop" is used instead */
    propertyOrder: string;

    /** Is the column initialy marked as not visible? When true column should not be displayed in the table. */
    hidden?: boolean;
}
