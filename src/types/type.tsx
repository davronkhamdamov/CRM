import { GetProp, TableProps } from "antd";

export type ColumnsType<T> = TableProps<T>["columns"];
export type TablePaginationConfig = Exclude<
    GetProp<TableProps, "pagination">,
    boolean
>;

export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
export interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}
export type themeMode = "light" | "dark" | "system";

export interface EditModal {
    id: string;
    isOpen: boolean;
    setOpenEditModal?: (arg: boolean) => void;
}

export interface EditModalProps {
    data: EditModal;
    setOpen: (arg: EditModal) => void;
}
export interface UserData {
    name: {
        first?: string;
        last?: string;
    };
    location: {
        state?: string;
    };
    phone?: string;
    gender?: string;
    dob: {
        date?: string;
    };
}
