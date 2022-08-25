import { Company } from "src/app/model/company/company";

export type CompanyState = {
    error: any;
    isLoaded: boolean;
    isLoading: boolean;
    isLoadedById: boolean;
    isLoadingById: boolean;
    company: Company;
    selectedCompany: Company;
}