
import { AccountProps } from "./account";

export interface ServicesProps {
    service: string;
    service_name: string;
    service_code: string;
    accounts?:  AccountProps[];
}