import { GetProp, TableProps } from "antd";
import { Dayjs } from "dayjs";

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
    id: string
    name: string
    surname: string
    date_birth: string
    address: string
    phone_number: string
    gender: string
    job: string
    balance: number
    created_at: string
    updated_at: string

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
    id?: string
    name: string
    surname: string
    date_birth?: Dayjs
    address: string
    phone_number: string
    gender: string
    job: string
    balance?: number
    updated_at?: Date
    created_at?: Date
}
export interface PaymentDataType {
    name: string;
    created_at: Date;
}

export interface TableProp {
    data?: any;
    setData: (a: any) => void;
}