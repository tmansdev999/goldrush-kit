import { type Option } from "@/utils/option";
import type {
    NftApprovalsItem,
    Pagination,
    TokensApprovalItem,
    Transaction,
} from "@covalenthq/client-sdk";
import type {
    Column,
    ColumnDef,
    Row,
    SortingState,
} from "@tanstack/react-table";
import type { ComponentType } from "react";

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

export interface CopyDataProps {
    data: string;
}

export interface IconWrapperProps {
    class_name?: string;
    icon_class_name?: string;
    on_click?: (e?: React.MouseEvent) => void;
    icon_size?: string;
    icon_type?: string;
}

export interface TransactionsProps {
    addresses?: string[] | null;
    showChain?: boolean;
    maybeResult: Option<Transaction[] | null>;
    errorMessage: string | null;
    actionable_transaction?: (tx_hash: string | null) => ActionableType;
    actionable_block?: (block_height: number | null) => ActionableType;
    actionable_address?: (address: string | null) => ActionableType;
}

export interface TokenApprovalsTableProps {
    maybeResult: Option<TokensApprovalItem[] | null>;
    errorMessage: string | null;
}

export interface NFTApprovalsTableProps {
    maybeResult: Option<NftApprovalsItem[] | null>;
    errorMessage: string | null;
}

export interface SkeletonTableProps {
    rows?: number;
    cols?: number;
    float?: "right" | "left";
}

export interface TableHeaderSortingProps<T> {
    header: string;
    column: Column<T, unknown>;
    align: "left" | "right" | "center";
    icon?: boolean;
}

export interface TableListProps<T> extends Partial<PaginationFooterProps> {
    maybeData: Option<T[] | null>;
    columns: ColumnDef<T>[];
    row_selection_state?: Record<string, boolean>;
    sorting_state?: SortingState;
    errorMessage: string | null;
    customRows?: (
        row: Row<T>[],
        defaultRow: (row: Row<T>) => React.ReactNode,
    ) => React.ReactNode[];
}

export interface PaginationFooterProps {
    disabled?: boolean;
    pagination: Pagination | null;
    onChangePaginationHandler: (updatedPagination: Pagination) => void;
}

export interface PaginationProps {
    page_size?: number;
    page_number?: number;
    on_page_change?: (updated_pagination: Pagination) => void;
}

export interface HeadingProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    > {
    size: 1 | 2 | 3 | 4;
}

export type ElementType = keyof JSX.IntrinsicElements | ComponentType<any>;

export type ActionableType<T extends ElementType = ElementType> = {
    parent: T;
    parentProps: T extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[T]
        : T extends ComponentType<infer P>
          ? P
          : never;
} | null;
