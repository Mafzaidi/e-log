export interface AccountProps {
    id: string;
    service_name: string;
    username: string;
    host: string;
    notes?: string;
}

export interface AccountWithPasswordProps {
    id: string;
    service_name: string;
    username: string;
    host: string;
    notes?: string;
    account_password: string
}

