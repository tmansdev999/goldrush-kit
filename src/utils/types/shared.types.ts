import { type Transaction } from "@covalenthq/client-sdk";
import { type Option } from "@/utils/option";
import {
    type ColumnDef,
    type SortingState,
    type Column,
} from "@tanstack/react-table";

export interface BalancePriceDeltaProps {
    numerator: number;
    denominator: number;
}

export interface CardDetailProps {
    heading?: React.ReactNode;
    content?: React.ReactNode;
    subtext?: React.ReactNode;
    wrapperClassName?: string;
}

export interface CopyImageProps {
    url: string;
}

export interface IconWrapperProps {
    class_name?: string;
    icon_class_name?: string;
    on_click?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    icon_size?: string;
    icon_type?: string;
}

export interface TransactionsProps {
    on_native_explorer_click?: Function;
    on_goldrush_receipt_click?: Function;
    on_transaction_click?: Function;
    maybeResult: Option<Transaction[]>;
    errorMessage: string | null;
}

export interface SkeletonTableProps {
    rows?: number;
    cols?: number;
    float?: "right" | "left";
}

export interface TableHeaderSortingProps {
    header_name: string;
    column: Column<any, unknown>;
    align: "left" | "right" | "center";
    icon?: boolean;
}

export interface TableListProps<T> {
    maybeData: Option<T[]>;
    columns: ColumnDef<T>[];
    row_selection_state?: Record<string, boolean>;
    sorting_state?: SortingState;
    errorMessage: string | null;
}

export interface HeadingProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    size: 1 | 2 | 3 | 4;
}
