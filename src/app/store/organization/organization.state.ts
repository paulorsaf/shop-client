import { Company } from "src/app/model/company/company";

export type OrganizationState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    companies: Company[];
    selectedCompany: Company;
}