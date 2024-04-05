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
    method: string;
    login: any;
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
    id: string
    method: string;
    created_at: Date;
    payment_type_id: string
}

export interface TableProp {
    data?: any;
    setData: (a: any) => void;
}
export interface SuccessProps {
    modalStatus: "403" | "404" | "500" | 'error' | "info" | "success" | 'warning';
    title: string;
    link: string;
}
export interface ServiceFieldType {
    isActive: boolean;
    price: number;
    product_price: number;
    service_name: string;

}