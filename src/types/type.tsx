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
  user_id: string;
  method: string;
  id: string;
  name: string;
  surname: string;
  date_birth: string;
  address: string;
  phone_number: string;
  gender: string;
  job: string;
  balance: number;
  created_at: string;
  updated_at: string;
  cure_id: string;
  payed_price: number;
  price: number;
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
  id?: string;
  name: string;
  surname: string;
  date_birth?: Dayjs;
  address: string;
  phone_number: string;
  gender: string;
  job: string;
  balance?: string;
  updated_at?: Date;
  created_at?: Date;
  img_url: string;
  description: string;
}
export interface PaymentDataType {
  id: string;
  method: string;
  created_at: Date;
  payment_type_id: string;
}

export interface TableProp {
  data: any;
  setData: (a: any) => void;
}
export interface SuccessProps {
  modalStatus: "403" | "404" | "500" | "error" | "info" | "success" | "warning";
  title: string;
  link: string;
}
export interface ServiceFieldType {
  isActive: boolean;
  price: number;
  product_price: number;
  service_name: string;
}
export interface Staffs {
  address: string;
  surname: string;
  phone_number: string;
  login: string;
  role: string;
  id: string;
  gender: string;
  password: string;
  name: string;
}

export interface CureDataType {
  user_id: string;
  cure_id: string;
  user_name: string;
  user_surname: string;
  cure_surname: string;
  cure_name: string;
  is_done: string;
  created_at: string;
  staff_name: string;
  staff_surname: string;
  start_time: string;
  end_time: string;
  id: string;
  payed_price: number;
  price: number;
}
export interface ServiceType {
  name: string;
  price: string;
  id: string;
  status: boolean;
}

export interface TreatmentType {
  tooth_id: string;
  service_name: string;
  price: string;
}

export interface ServiceCategoryType {
  id: string;
  name: string;
  services: ServiceType[];
}

export interface StatisticType {
  staffs: number;
  patient: number;
  services: number;
  qarz: number;
}

export interface PayloadType {
  id?: number;
  services?: string[];
}
export interface CureFieldType {
  cash_amount?: number;
  balance_amount?: number;
  payment_type: string;
}
